import { useState, useEffect } from "react";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.shivaay.upayan.dev";

interface UserStats {
  totalConversations: number;
  daysActive: number;
  totalUserMessages: number;
  memberSince: string;
  accountType: string;
  status: string;
}

export const useUserStats = () => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseURL}/api/users/stats`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch user statistics");
      }
    } catch {
      setError("Network error occurred while fetching statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, loading, error, refetch: fetchStats };
};
