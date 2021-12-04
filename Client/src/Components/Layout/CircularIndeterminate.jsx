import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh-20px)',
        margin: ' 10% auto',
      }}
    >
      <Box sx={{ color: 'white', padding: '12px' }}>
        <CircularProgress />
      </Box>
    </Box>
  );
}
