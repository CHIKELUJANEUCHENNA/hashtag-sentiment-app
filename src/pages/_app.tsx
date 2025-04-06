import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useState, useEffect, useMemo } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isHome = router.pathname === '/';
  
  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);
  
  // Check system preference on mount
  useEffect(() => {
    // Set default to light mode instead of following system preference
    setDarkMode(false);
  }, []);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  // Create theme based on dark mode preference
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#dc004e',
          },
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="static">
          <Toolbar>
            <TrendingUpIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Hashtag Sentiment
            </Typography>
            <IconButton 
              color="inherit" 
              onClick={toggleDarkMode}
              sx={{ mr: 2 }}
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            {!isHome && (
              <Button 
                color="inherit" 
                onClick={() => router.push('/')}
              >
                Home
              </Button>
            )}
          </Toolbar>
        </AppBar>
        
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Component {...pageProps} />
        </Box>
        
        <Box component="footer" sx={{ py: 3, bgcolor: 'background.paper' }}>
          <Container maxWidth="lg">
            <Typography variant="body2" color="text.secondary" align="center">
              © {new Date().getFullYear()} Hashtag Sentiment Analyzer
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
} 