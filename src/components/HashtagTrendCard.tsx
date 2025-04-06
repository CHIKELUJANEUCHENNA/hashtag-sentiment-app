import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import dynamic from 'next/dynamic';

const SentimentChart = dynamic(() => import('./SentimentChart'), {
  ssr: false,
  loading: () => <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading chart...</Box>
});

export interface TrendData {
  hashtag: string;
  range: string;
  trend: Array<{
    date: string;
    sentiment: number;
  }>;
}

interface HashtagTrendCardProps {
  data: TrendData;
  isDarkMode?: boolean;
}

export function HashtagTrendCard({ data, isDarkMode = false }: HashtagTrendCardProps) {
  const trendDirection = data.trend[data.trend.length - 1].sentiment > data.trend[0].sentiment;
  
  // Find min and max sentiment values
  const sentimentValues = data.trend.map(item => item.sentiment);
  const minSentiment = Math.min(...sentimentValues);
  const maxSentiment = Math.max(...sentimentValues);
  
  // Find dates for min and max sentiment
  const minDate = data.trend.find(item => item.sentiment === minSentiment)?.date;
  const maxDate = data.trend.find(item => item.sentiment === maxSentiment)?.date;

  return (
    <Card sx={{ 
      bgcolor: isDarkMode ? 'background.paper' : 'background.paper',
      boxShadow: isDarkMode ? 3 : 1,
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1" sx={{ mr: 1 }}>
            {data.hashtag}
          </Typography>
          {trendDirection ? (
            <TrendingUpIcon color="success" sx={{ fontSize: 32 }} />
          ) : (
            <TrendingDownIcon color="error" sx={{ fontSize: 32 }} />
          )}
        </Box>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {data.range}
        </Typography>

        <Box sx={{ height: 400, mb: 4 }}>
          <SentimentChart 
            data={data.trend} 
            isDarkMode={isDarkMode}
          />
        </Box>

        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip
            label={`Overall Sentiment: ${trendDirection ? 'Positive' : 'Negative'}`}
            color={trendDirection ? 'success' : 'error'}
          />
          <Chip
            label={`Change: ${Math.abs(
              data.trend[data.trend.length - 1].sentiment - data.trend[0].sentiment
            ).toFixed(2)}`}
            variant="outlined"
          />
        </Stack>
        
        <Stack direction="row" spacing={1}>
          <Chip
            label={`Min: ${minSentiment.toFixed(2)} (${minDate})`}
            color="error"
            variant="outlined"
          />
          <Chip
            label={`Max: ${maxSentiment.toFixed(2)} (${maxDate})`}
            color="success"
            variant="outlined"
          />
        </Stack>
      </CardContent>
    </Card>
  );
} 