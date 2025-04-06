import React, { useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box, useTheme, Tooltip, IconButton, Paper } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

interface SentimentChartProps {
  data: Array<{
    date: string;
    sentiment: number;
  }>;
  isDarkMode?: boolean;
}

export default function SentimentChart({ 
  data, 
  isDarkMode = false,
}: SentimentChartProps) {
  const theme = useTheme();
  const [zoomLevel, setZoomLevel] = useState(1);

  const xAxisData = data.map(item => item.date);
  const yAxisData = data.map(item => item.sentiment);

  // Calculate zoomed y-axis range
  const yMin = -1 * zoomLevel;
  const yMax = 1 * zoomLevel;

  // Handle zoom in
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  };

  // Handle zoom out
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
  };

  // Reset zoom
  const handleReset = () => {
    setZoomLevel(1);
  };
  // Handle mouse wheel for zooming
  const handleWheel = (event: React.WheelEvent) => {
    if (event.deltaY < 0) {
      // Zoom in
      handleZoomIn();
    } else {
      // Zoom out
      handleZoomOut();
    }
  };

  return (
    <Box 
      sx={{ width: '100%', height: '100%', position: 'relative' }}
      onWheel={handleWheel}
    >
      <Paper 
        elevation={3}
        sx={{ 
          position: 'absolute', 
          top: 0, 
          right: 10, 
          display: 'flex', 
          gap: 1,
          borderRadius: 1,
          p: 0.5,
          zIndex: 10,
          border: `1px solid ${isDarkMode ? theme.palette.primary.light : theme.palette.primary.main}`
        }}
      >
        <Tooltip title="Zoom In">
          <IconButton 
            size="small" 
            onClick={handleZoomIn}
            sx={{ color: theme.palette.primary.main }}
          >
            <ZoomInIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Zoom Out">
          <IconButton 
            size="small" 
            onClick={handleZoomOut}
            sx={{ color: theme.palette.primary.main }}
          >
            <ZoomOutIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Reset View">
          <IconButton 
            size="small" 
            onClick={handleReset}
            sx={{ color: theme.palette.primary.main }}
          >
            <RestartAltIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Paper>

      <LineChart
        xAxis={[{
          data: xAxisData,
          scaleType: 'point',
          tickLabelStyle: {
            angle: -45,
            textAnchor: 'end',
            fill: isDarkMode ? theme.palette.text.primary : theme.palette.text.primary,
            fontSize: 12,
            fontWeight: 'bold'
          },
        }]}
        yAxis={[{
          min: yMin,
          max: yMax,
          tickLabelStyle: {
            textAnchor: 'end',
            fill: isDarkMode ? theme.palette.text.primary : theme.palette.text.primary,
            fontSize: 12,
            fontWeight: 'bold'
          },
        }]}
        series={[{
          data: yAxisData,
          area: true,
          color: isDarkMode ? theme.palette.primary.light : theme.palette.primary.dark,
          showMark: true,
          curve: 'monotoneX',
        }]}
        height={400}
        margin={{ top: 20, right: 20, bottom: 60, left: 40 }}
        slotProps={{
          legend: {
            hidden: true,
          },
        }}
        sx={{
          '.MuiLineElement-root': {
            strokeWidth: 3,
          },
          '.MuiMarkElement-root': {
            stroke: isDarkMode ? theme.palette.primary.light : theme.palette.primary.dark,
            fill: isDarkMode ? theme.palette.background.paper : theme.palette.background.paper,
            strokeWidth: 2,
            r: 5,
          },
        }}
      />

    </Box>
  );
} 