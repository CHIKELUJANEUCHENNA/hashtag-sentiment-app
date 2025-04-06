import useSWR from 'swr';
import { TrendData } from '../components/HashtagTrendCard';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useHashtagTrend(hashtag: string | undefined) {
  const { data, error, isLoading } = useSWR<TrendData>(
    hashtag ? `/api/trends/${hashtag}` : null,
    fetcher
  );

  const trendDirection = data
    ? data.trend[data.trend.length - 1].sentiment > data.trend[0].sentiment
      ? 'Positive'
      : 'Negative'
    : null;

  return {
    data,
    isLoading,
    isError: error,
    trendDirection,
  };
} 