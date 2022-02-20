import React from 'react';
import './Userprofile.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));
function Userprofile() {
  return (
    <div>
      <div className='userProfile-body-Box'>
        <div className='userProfile-outer-Box'>
          <div className='userProfile-inner-Box'>
            <Box sx={{ width: 1, mt: 2 }}>
              <Box display='grid' gridTemplateColumns='repeat(12, 1fr)' gap={2}>
                <Box gridColumn='span 6'>
                  <Item sx={{ height: '40vh' }}>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ width: '40%', height: '30vh' }}>
                        <Box>
                          <img
                            style={{ width: '100%', height: '30vh' }}
                            src='https://png.pngtree.com/illustrations/20190327/ourmid/pngtree-cure-starry-sky-night-sky-star-png-image_38228.jpg'
                            alt=''
                          />
                        </Box>
                        <Box>ADMIN</Box>
                      </Box>
                      <Box sx={{ width: '60%' }}>
                        <Box sx={{ marginTop: '2rem', marginBottom: '10px' }}>
                          ROLE: ADMIN
                        </Box>
                        <Box sx={{ marginBottom: '10px' }}>
                          NAME: ANAND KUMAR CHOUDHARY
                        </Box>
                        <Box sx={{ marginBottom: '10px' }}>
                          INSTITUITE: UNIVERSITY OF ENGINEERING AND MANAGEMENT,
                          KOLKATA
                        </Box>
                      </Box>
                    </Box>
                  </Item>
                </Box>

                <Box gridColumn='span 6'>
                  <Item
                    sx={{
                      height: '40vh',
                    }}
                  ></Item>
                </Box>
                <Box gridColumn='span 4'>
                  <Item
                    sx={{
                      height: '20vh',
                      marginTop: '1rem',
                      borderRadius: '30px',
                      background: 'lightgreen',
                    }}
                  >
                    {' '}
                    RATING
                  </Item>
                </Box>
                <Box gridColumn='span 4'>
                  <Item
                    sx={{
                      height: '20vh',
                      marginTop: '1rem',
                      borderRadius: '30px',
                      background: 'lightblue',
                    }}
                  >
                    CONTRIBUTION
                  </Item>
                </Box>
                <Box gridColumn='span 4'>
                  <Item
                    sx={{
                      height: '20vh',
                      marginTop: '1rem',
                      borderRadius: '30px',
                      background: 'lightpink',
                    }}
                  >
                    RESOURCES
                  </Item>
                </Box>
                <Box gridColumn='span 8'>
                  <Item>xs=8</Item>
                </Box>
                <Box gridColumn='span 4'>
                  <Item>xs=4</Item>
                </Box>
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userprofile;
