import React from 'react';
import './Globalevents.css';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function Globalevents() {
  return (
    <div>
      <div className='Globalevents-body-Box'>
        <div className='Globalevents-outer-Box'>
          <div className='Globalevents-Inner-Box'>
            <Typography>
              <Grid sx={{ marginTop: '1rem' }} container>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Card
                    sx={{
                      margin: '10px',
                      textAlign: 'center',
                      justifyContent: 'center',
                      height: 'auto',
                      borderRadius: '20px',
                    }}
                  >
                    <Box sx={{ width: '100%', height: '20%' }}>
                      <img
                        style={{ width: '100%', height: '10vh' }}
                        src=''
                        alt=''
                      />
                    </Box>
                    <Box sx={{ marginTop: '1rem' }}>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Nemo, eos?
                    </Box>
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

export default Globalevents;
