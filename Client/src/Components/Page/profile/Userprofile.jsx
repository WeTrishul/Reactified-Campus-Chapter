import React from 'react';
import './Userprofile.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chart from '../Chart';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import Typography from '@mui/material/Typography';

function Userprofile() {
  return (
    <div>
      <div className='userProfile-body-Box'>
        <div className='userProfile-outer-Box'>
          <div className='userProfile-inner-Box'>
            <Typography>
              <Grid sx={{ marginTop: '1rem' }} container>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Card
                    sx={{
                      margin: '10px',
                      textAlign: 'center',
                      width: 'auto',
                      display: 'flex',
                      height: 'auto',
                    }}
                  >
                    <Box
                      sx={{ width: '40%', height: '200px', padding: '10px' }}
                    >
                      <img
                        style={{
                          width: '100%',
                          height: '120px',
                          borderRadius: '10px',
                        }}
                        src='https://wallpaperaccess.com/full/359168.jpg'
                        alt=''
                      />
                      <Box sx={{ color: 'text.secondary' }}>ADMIN</Box>
                    </Box>
                    <Box
                      sx={{
                        textAlign: 'center',
                        justifyContent: 'center',
                        width: '60%',
                        marginTop: '2rem',
                      }}
                    >
                      <Box
                        sx={{
                          color: 'text.secondary',
                          fontSize: '12px',
                          width: '100%',
                          marginTop: '5px',
                        }}
                      >
                        ROLE: ADMIN
                      </Box>
                      <Box
                        sx={{
                          color: 'text.secondary',
                          width: '100%',
                          fontSize: '12px',
                          marginTop: '5px',
                        }}
                      >
                        NAME:ANAND CHOUDHARY
                      </Box>
                      <Box
                        sx={{
                          color: 'text.secondary',
                          fontSize: '12px',
                          width: '100%',
                          marginTop: '5px',
                        }}
                      >
                        INSTITUTE:UNIVERSITY OF ENGINEERING & MANAGEMENT,
                        KOLKATA
                      </Box>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Card
                    sx={{
                      margin: '10px',
                      textAlign: 'center',
                      height: '17vh',
                      marginTop: '3rem',
                      borderRadius: '20px',
                      background: 'lightgreen',
                      fontWeight: '600',
                    }}
                  >
                    <Box sx={{ color: 'text.secondary' }}>
                      <StarRoundedIcon />
                      RATINGS <StarRoundedIcon />
                    </Box>
                    <Box sx={{ color: 'text.secondary', marginTop: '1rem' }}>
                      1200
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Card
                    sx={{
                      margin: '10px',
                      textAlign: 'center',
                      height: '17vh',
                      marginTop: '3rem',
                      borderRadius: '20px',
                      background: 'lightpink',
                      fontWeight: '600',
                    }}
                  >
                    <Box sx={{ color: 'text.secondary' }}>
                      <VolunteerActivismIcon />
                      CONTRIBUTION <VolunteerActivismIcon />
                    </Box>
                    <Box sx={{ color: 'text.secondary', marginTop: '1rem' }}>
                      120
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={12} lg={12}>
                  <Card
                    sx={{
                      width: '100%',
                      height: 'auto',
                      textAlign: 'center',
                      justifyContent: 'center',
                      marginBottom: '2rem',
                    }}
                  >
                    <Chart />
                  </Card>
                </Grid>
              </Grid>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userprofile;
