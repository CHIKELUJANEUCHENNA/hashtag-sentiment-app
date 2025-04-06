import { useRouter } from "next/router";
import { Container, Box, Select, MenuItem, FormControl, InputLabel, Typography, SelectChangeEvent, useTheme } from "@mui/material";
import { HashtagTrendCard } from "../../components/HashtagTrendCard";
import { useHashtagTrend } from "../../hooks/useHashtagTrend";
import { mockTrendData } from "../../mocks/trendData";
import { useState, useEffect } from "react";

export default function HashtagInsights() {
  const router = useRouter();
  const { hashtag } = router.query;
  const { data, isError, isLoading } = useHashtagTrend(hashtag as string);
  const [selectedHashtag, setSelectedHashtag] = useState<string>("");
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  
  // Update selected hashtag when route changes
  useEffect(() => {
    if (hashtag) {
      setSelectedHashtag(hashtag as string);
    }
  }, [hashtag]);
  
  // Handle hashtag change
  const handleHashtagChange = (event: SelectChangeEvent<string>) => {
    const newHashtag = event.target.value;
    setSelectedHashtag(newHashtag);
    router.push(`/insights/${newHashtag}`);
  };

  if (isError) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Error loading hashtag insights
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Failed to load data
          </Typography>
        </Box>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Loading...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 4 }}>
        <FormControl fullWidth>
          <InputLabel id="hashtag-select-label">Select Hashtag</InputLabel>
          <Select
            labelId="hashtag-select-label"
            id="hashtag-select"
            value={selectedHashtag}
            label="Select Hashtag"
            onChange={handleHashtagChange}
          >
            {Object.keys(mockTrendData).map((tag) => (
              <MenuItem key={tag} value={tag}>
                #{tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      
      <HashtagTrendCard 
        data={data} 
        isDarkMode={isDarkMode}
      />
    </Container>
  );
}
