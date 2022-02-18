import React from 'react';
import './Userprofile.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
function Userprofile() {
  const profileCardRendering = () => {
    if (window.innerWidth <= 600) {
      <Box sx={{ width: 1, marginTop: '1rem' }}>
        <Box display='grid' gridTemplateColumns='repeat(12, 1fr)' gap={2}>
          <Box gridColumn='span 6'>
            <Item sx={{ height: '30vh', marginTop: '25vh' }}>xs=8</Item>
          </Box>
        </Box>
      </Box>;
    } else if (window.innerWidth <= 992) {
      <Box sx={{ width: 1, marginTop: '1rem' }}>
        <Box display='grid' gridTemplateColumns='repeat(12, 1fr)' gap={2}>
          <Box gridColumn='span 3'>
            <Item sx={{ height: '30vh', marginTop: '25vh' }}>Anand</Item>
          </Box>
        </Box>
      </Box>;
    }
  };

  return (
    <div>
      <div className='userProfile-body-Box'>
        <div className='userProfile-outer-Box'>
          <div className='userProfile-inner-Box'>{profileCardRendering()}</div>
        </div>
      </div>
    </div>
  );
}

export default Userprofile;
