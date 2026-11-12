import { useState, useEffect } from 'react';
import {
  fetchCodeforcesLive,
  FALLBACK_CODEFORCES_DATA,
  type CodeforcesUser,
  type CodeforcesContest,
  type CodeforcesSubmission,
} from '../services/codeforces';

export interface UseCodeforcesReturn {
  user: CodeforcesUser | null;
  contests: CodeforcesContest[];
  recentAccepted: CodeforcesSubmission[];
  totalSolved: number;
  totalSubmissions: number;
  topTags: { tag: string; count: number }[];
  isLoading: boolean;
  isLive: boolean;
  error: string | null;
  refetch: () => void;
}

export function useCodeforces(handle = 'vaibhav2927'): UseCodeforcesReturn {
  const [user, setUser] = useState<CodeforcesUser | null>(FALLBACK_CODEFORCES_DATA.user);
  const [contests, setContests] = useState<CodeforcesContest[]>(FALLBACK_CODEFORCES_DATA.contests);
  const [recentAccepted, setRecentAccepted] = useState<CodeforcesSubmission[]>([]);
  const [totalSolved, setTotalSolved] = useState<number>(FALLBACK_CODEFORCES_DATA.totalSolved);
  const [totalSubmissions, setTotalSubmissions] = useState<number>(FALLBACK_CODEFORCES_DATA.totalSubmissions);
  const [topTags, setTopTags] = useState<{ tag: string; count: number }[]>(FALLBACK_CODEFORCES_DATA.topTags);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchCodeforcesLive(handle);
      setUser(data.user);
      setContests(data.contests);
      setRecentAccepted(data.recentAccepted);
      setTotalSolved(data.totalSolved);
      setTotalSubmissions(data.totalSubmissions);
      setTopTags(data.topTags);
      setIsLive(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch Codeforces live data';
      setError(message);
      // Keep fallback data active
      setIsLive(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [handle]);

  return {
    user,
    contests,
    recentAccepted,
    totalSolved,
    totalSubmissions,
    topTags,
    isLoading,
    isLive,
    error,
    refetch: loadData,
  };
}

