import { useState, useEffect } from 'react';
import {
  fetchGitHubLiveData,
  type GitHubProfile,
  type GitHubRepo,
  type GitHubCommit,
} from '../services/github';

export interface UseGitHubReturn {
  profile: GitHubProfile | null;
  repos: GitHubRepo[];
  commits: GitHubCommit[];
  totalStars: number;
  isLoading: boolean;
  isLive: boolean;
  error: string | null;
  refetch: () => void;
}

export function useGitHub(username = 'vaibhavsolanki1'): UseGitHubReturn {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [totalStars, setTotalStars] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchGitHubLiveData(username);
      setProfile(data.profile);
      setRepos(data.repos);
      setCommits(data.commits);
      setTotalStars(data.totalStars);
      setIsLive(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch GitHub live data';
      setError(message);
      setIsLive(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [username]);

  return {
    profile,
    repos,
    commits,
    totalStars,
    isLoading,
    isLive,
    error,
    refetch: loadData,
  };
}

