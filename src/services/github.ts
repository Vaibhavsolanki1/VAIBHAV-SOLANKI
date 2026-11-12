export interface GitHubRepo {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  homepage: string | null;
  stars: number;
  forks: number;
  language: string | null;
  topics: string[];
  updatedAt: string;
  pushedAt: string;
  defaultBranch: string;
}

export interface GitHubCommit {
  sha: string;
  message: string;
  repoName: string;
  repoUrl: string;
  author: string;
  date: string;
  url: string;
}

export interface GitHubProfile {
  username: string;
  name: string;
  avatarUrl: string;
  bio: string | null;
  publicRepos: number;
  followers: number;
  following: number;
  htmlUrl: string;
}

export interface GitHubLiveState {
  profile: GitHubProfile | null;
  repos: GitHubRepo[];
  commits: GitHubCommit[];
  totalStars: number;
  isLoading: boolean;
  isLive: boolean;
  error: string | null;
}

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3572A5',
  'C++': '#f34b7d',
  C: '#555555',
  Java: '#b07219',
  Rust: '#dea584',
  Go: '#00ADD8',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Solidity: '#AA6746',
  Default: '#6366f1',
};

const CACHE_KEY = 'vs_github_live_cache_v2';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes cache to stay well within 60 req/hr rate limit

export async function fetchGitHubLiveData(username = 'vaibhavsolanki1'): Promise<{
  profile: GitHubProfile;
  repos: GitHubRepo[];
  commits: GitHubCommit[];
  totalStars: number;
}> {
  // Check sessionStorage cache first
  try {
    const cached = sessionStorage.getItem(`${CACHE_KEY}_${username}`);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
        return parsed.data;
      }
    }
  } catch {
    // Ignore cache retrieval errors
  }

  // Fetch user profile
  const userRes = await fetch(`https://api.github.com/users/${username}`, {
    headers: { Accept: 'application/vnd.github.v3+json' },
  });
  if (!userRes.ok) {
    throw new Error(`GitHub API user fetch failed: ${userRes.status}`);
  }
  const userJson = await userRes.json();

  const profile: GitHubProfile = {
    username: userJson.login,
    name: userJson.name || userJson.login,
    avatarUrl: userJson.avatar_url,
    bio: userJson.bio,
    publicRepos: userJson.public_repos || 0,
    followers: userJson.followers || 0,
    following: userJson.following || 0,
    htmlUrl: userJson.html_url,
  };

  // Fetch public repositories sorted by updated date
  const reposRes = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=30&type=owner`,
    {
      headers: { Accept: 'application/vnd.github.v3+json' },
    }
  );
  let repos: GitHubRepo[] = [];
  let totalStars = 0;

  if (reposRes.ok) {
    const reposJson = await reposRes.json();
    if (Array.isArray(reposJson)) {
      repos = reposJson
        .filter((r) => !r.fork) // prioritize original work, though forks can be allowed if preferred
        .concat(reposJson.filter((r) => r.fork))
        .slice(0, 12)
        .map((r) => {
          totalStars += r.stargazers_count || 0;
          return {
            id: r.id,
            name: r.name,
            fullName: r.full_name,
            description: r.description,
            url: r.html_url,
            homepage: r.homepage,
            stars: r.stargazers_count || 0,
            forks: r.forks_count || 0,
            language: r.language,
            topics: r.topics || [],
            updatedAt: r.updated_at,
            pushedAt: r.pushed_at,
            defaultBranch: r.default_branch || 'main',
          };
        });
    }
  }

  // Fetch public activity events for real commits
  const eventsRes = await fetch(
    `https://api.github.com/users/${username}/events/public?per_page=20`,
    {
      headers: { Accept: 'application/vnd.github.v3+json' },
    }
  );
  const commits: GitHubCommit[] = [];

  if (eventsRes.ok) {
    const eventsJson = await eventsRes.json();
    if (Array.isArray(eventsJson)) {
      for (const event of eventsJson) {
        if (event.type === 'PushEvent' && event.payload?.commits) {
          const repoName = event.repo?.name || '';
          const repoUrl = `https://github.com/${repoName}`;
          for (const c of event.payload.commits) {
            commits.push({
              sha: c.sha ? c.sha.substring(0, 7) : 'head',
              message: c.message ? c.message.split('\n')[0] : 'Update repository',
              repoName: repoName.replace(`${username}/`, ''),
              repoUrl,
              author: c.author?.name || username,
              date: event.created_at,
              url: `${repoUrl}/commit/${c.sha}`,
            });
            if (commits.length >= 8) break;
          }
        }
        if (commits.length >= 8) break;
      }
    }
  }

  const result = { profile, repos, commits, totalStars };

  // Cache successful result in sessionStorage
  try {
    sessionStorage.setItem(
      `${CACHE_KEY}_${username}`,
      JSON.stringify({ timestamp: Date.now(), data: result })
    );
  } catch {
    // Ignore cache write errors
  }

  return result;
}

export const formatRelativeTime = (isoDate: string): string => {
  try {
    const diffSec = Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000);
    if (diffSec < 60) return 'just now';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `${diffDays}d ago`;
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths}mo ago`;
  } catch {
    return 'recently';
  }
};

