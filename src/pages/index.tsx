import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { mockTrendData } from '../mocks/trendData';

export default function Home() {
  const router = useRouter();
  
  const handleViewInsights = (hashtag: string) => {
    router.push(`/insights/${hashtag}`);
  };

  // Split hashtags into two groups
  const hashtags = Object.keys(mockTrendData);
  const firstHalf = hashtags.slice(0, Math.ceil(hashtags.length / 2));
  const secondHalf = hashtags.slice(Math.ceil(hashtags.length / 2));

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
          Hashtag Sentiment Analyzer
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          Track sentiment trends for your favorite hashtags
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {/* First Hashtag Card */}
        <Box sx={{ flex: '1 1 50%', minWidth: '300px' }}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" component="h2" sx={{ mr: 1 }}>
                  Trending Hashtags
                </Typography>
                <TrendingUpIcon color="success" />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Analyze sentiment for these popular hashtags
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 4, flexWrap: 'wrap', gap: 1 }}>
                {firstHalf.map((hashtag) => (
                  <Chip 
                    key={hashtag}
                    label={`#${hashtag}`}
                    onClick={() => handleViewInsights(hashtag)}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Stack>
              <Button 
                variant="contained" 
                fullWidth 
                onClick={() => handleViewInsights(firstHalf[0])}
              >
                View Insights
              </Button>
            </CardContent>
          </Card>
        </Box>

        {/* Second Hashtag Card */}
        <Box sx={{ flex: '1 1 50%', minWidth: '300px' }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" component="h2" sx={{ mr: 1 }}>
                  More Hashtags
                </Typography>
                <TrendingDownIcon color="error" />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Explore sentiment for these additional hashtags
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 4, flexWrap: 'wrap', gap: 1 }}>
                {secondHalf.map((hashtag) => (
                  <Chip 
                    key={hashtag}
                    label={`#${hashtag}`}
                    onClick={() => handleViewInsights(hashtag)}
                    color="secondary"
                    variant="outlined"
                  />
                ))}
              </Stack>
              <Button 
                variant="contained" 
                color="secondary"
                fullWidth 
                onClick={() => handleViewInsights(secondHalf[0])}
              >
                View Insights
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
} 