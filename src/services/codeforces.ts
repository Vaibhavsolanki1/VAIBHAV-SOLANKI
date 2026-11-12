export interface CodeforcesUser {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  avatar: string;
  titlePhoto: string;
  organization?: string;
  city?: string;
  country?: string;
  contribution: number;
  friendOfCount: number;
}

export interface CodeforcesContest {
  contestId: number;
  contestName: string;
  handle: string;
  rank: number;
  ratingUpdateTimeSeconds: number;
  oldRating: number;
  newRating: number;
}

export interface CodeforcesSubmission {
  id: number;
  contestId: number;
  creationTimeSeconds: number;
  verdict: string;
  programmingLanguage: string;
  problem: {
    contestId: number;
    index: string;
    name: string;
    rating?: number;
    tags: string[];
  };
}

export interface CodeforcesLiveState {
  user: CodeforcesUser | null;
  contests: CodeforcesContest[];
  recentAccepted: CodeforcesSubmission[];
  totalSolved: number;
  totalSubmissions: number;
  topTags: { tag: string; count: number }[];
  isLoading: boolean;
  isLive: boolean;
  error: string | null;
}

const CACHE_KEY = 'vs_codeforces_cache_v1';
const CACHE_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export const FALLBACK_CODEFORCES_DATA: Omit<CodeforcesLiveState, 'isLoading' | 'error'> = {
  user: {
    handle: 'vaibhav2927',
    rating: 1056,
    maxRating: 1056,
    rank: 'newbie',
    maxRank: 'newbie',
    avatar: 'https://userpic.codeforces.org/5925952/avatar/358bed8eec8cc769.jpg',
    titlePhoto: 'https://userpic.codeforces.org/5925952/title/5cfc2cbb71712da3.jpg',
    organization: 'Delhi technical campus,GGSIPU',
    city: 'Delhi',
    country: 'India',
    contribution: 0,
    friendOfCount: 2,
  },
  contests: [
    {
      contestId: 2247,
      contestName: 'Codeforces Round 1111 (Div. 2)',
      handle: 'vaibhav2927',
      rank: 10612,
      ratingUpdateTimeSeconds: 1784392500,
      oldRating: 0,
      newRating: 371,
    },
    {
      contestId: 2248,
      contestName: 'Codeforces Round 1113 (Div. 2)',
      handle: 'vaibhav2927',
      rank: 11981,
      ratingUpdateTimeSeconds: 1785603900,
      oldRating: 371,
      newRating: 604,
    },
    {
      contestId: 2254,
      contestName: 'Codeforces Round 1114 (Div. 3)',
      handle: 'vaibhav2927',
      rank: 11523,
      ratingUpdateTimeSeconds: 1785862200,
      oldRating: 604,
      newRating: 820,
    },
    {
      contestId: 2256,
      contestName: 'Codeforces Round 1116 (Div. 2)',
      handle: 'vaibhav2927',
      rank: 8588,
      ratingUpdateTimeSeconds: 1786295100,
      oldRating: 820,
      newRating: 928,
    },
    {
      contestId: 2257,
      contestName: 'Codeforces Round 1117 (Div. 2)',
      handle: 'vaibhav2927',
      rank: 6049,
      ratingUpdateTimeSeconds: 1786984500,
      oldRating: 928,
      newRating: 1056,
    },
    {
      contestId: 2263,
      contestName: 'Codeforces Round 1120 (Div. 2)',
      handle: 'vaibhav2927',
      rank: 8444,
      ratingUpdateTimeSeconds: 1789234500,
      oldRating: 1056,
      newRating: 1056,
    },
  ],
  recentAccepted: [],
  totalSolved: 22,
  totalSubmissions: 57,
  topTags: [
    { tag: 'math', count: 7 },
    { tag: 'implementation', count: 6 },
    { tag: 'greedy', count: 5 },
    { tag: 'constructive algorithms', count: 4 },
    { tag: 'brute force', count: 4 },
    { tag: 'strings', count: 3 },
  ],
  isLive: false,
};

export async function fetchCodeforcesLive(handle = 'vaibhav2927'): Promise<{
  user: CodeforcesUser | null;
  contests: CodeforcesContest[];
  recentAccepted: CodeforcesSubmission[];
  totalSolved: number;
  totalSubmissions: number;
  topTags: { tag: string; count: number }[];
}> {
  // Check localStorage cache first
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION_MS) {
          return data;
        }
      }
    } catch {
      // Ignore cache parse errors
    }
  }

  // 1. Fetch user.info
  const userResp = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
  if (!userResp.ok) throw new Error('Codeforces user.info fetch failed');
  const userData = await userResp.json();
  if (userData.status !== 'OK' || !userData.result?.[0]) {
    throw new Error('Codeforces user not found');
  }
  const user: CodeforcesUser = userData.result[0];

  // 2. Fetch user.rating
  const ratingResp = await fetch(`https://codeforces.com/api/user.rating?handle=${handle}`);
  let contests: CodeforcesContest[] = [];
  if (ratingResp.ok) {
    const ratingData = await ratingResp.json();
    if (ratingData.status === 'OK') {
      contests = ratingData.result || [];
    }
  }

  // 3. Fetch user.status (submissions)
  let recentAccepted: CodeforcesSubmission[] = [];
  let totalSolved = 0;
  let totalSubmissions = 0;
  const tagCounts: Record<string, number> = {};

  const statusResp = await fetch(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=200`);
  if (statusResp.ok) {
    const statusData = await statusResp.json();
    if (statusData.status === 'OK') {
      const subs: CodeforcesSubmission[] = statusData.result || [];
      totalSubmissions = subs.length;

      const solvedKeySet = new Set<string>();
      const acceptedList: CodeforcesSubmission[] = [];

      for (const s of subs) {
        if (s.verdict === 'OK' && s.problem) {
          const key = `${s.problem.contestId}_${s.problem.index}`;
          if (!solvedKeySet.has(key)) {
            solvedKeySet.add(key);
            acceptedList.push(s);
            (s.problem.tags || []).forEach((t) => {
              tagCounts[t] = (tagCounts[t] || 0) + 1;
            });
          }
        }
      }

      totalSolved = solvedKeySet.size;
      recentAccepted = acceptedList.slice(0, 5);
    }
  }

  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([tag, count]) => ({ tag, count }));

  const payload = {
    user,
    contests,
    recentAccepted,
    totalSolved: totalSolved || FALLBACK_CODEFORCES_DATA.totalSolved,
    totalSubmissions: totalSubmissions || FALLBACK_CODEFORCES_DATA.totalSubmissions,
    topTags: topTags.length > 0 ? topTags : FALLBACK_CODEFORCES_DATA.topTags,
  };

  // Cache to localStorage
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data: payload,
          timestamp: Date.now(),
        })
      );
    } catch {
      // Ignore cache storage failure
    }
  }

  return payload;
}

