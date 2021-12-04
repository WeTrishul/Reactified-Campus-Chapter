import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function Animations() {
  return (
    <Box sx={{ width: '100%', margin: '8% auto' }}>
      <Skeleton />
      <Skeleton animation='wave' />
      <Skeleton animation={true} />
    </Box>
  );
}
