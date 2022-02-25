import React from 'react';
import './Userprofile.css';
import Box from '@mui/material/Box';
import Chart from '../Chart';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import Typography from '@mui/material/Typography';

function Userprofile() {
  const [role, setRole] = React.useState('');

  const handleChange = (event) => {
    setRole(event.target.value);
  };
  return (
    <div>
      <div className='userProfile-body-Box'>
        <div className='userProfile-outer-Box'>
          <div className='userProfile-inner-Box'>
            <Typography>
              <Grid sx={{ marginTop: '1rem' }} container>
                <Grid item xs={12} sm={12} md={6} lg={4}>
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
                      <Box
                        sx={{
                          color: 'text.secondary',
                          textAlign: 'left',
                          fontSize: '15px',
                        }}
                      >
                        Name: Anand
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        textAlign: 'center',
                        justifyContent: 'center',
                        width: '60%',
                        marginTop: '5px',
                      }}
                    >
                      <Box sx={{ marginTop: '10px' }}>
                        <Box>
                          <Button
                            size='small'
                            variant='contained'
                            component='label'
                          >
                            Profile pic
                            <input
                              type='file'
                              name='profile pic'
                              id='multiFiles'
                              hidden
                            />
                          </Button>
                        </Box>
                        <Button
                          size='small'
                          sx={{ marginTop: '10px' }}
                          variant='contained'
                        >
                          Upload
                        </Button>
                      </Box>
                      <Box sx={{ minWidth: 80, marginTop: '10px' }}>
                        <FormControl fullWidth>
                          <InputLabel id='demo-simple-select-autowidth-label'>
                            Role
                          </InputLabel>
                          <Select
                            labelId='demo-simple-select-autowidth-label'
                            id='demo-simple-select-autowidth'
                            value={role}
                            label='Role'
                            onChange={handleChange}
                          >
                            <MenuItem value={10}>Question Setter</MenuItem>
                            <MenuItem value={20}>Events Lead</MenuItem>
                            <MenuItem value={30}>Media Lead</MenuItem>
                            <MenuItem value={40}>Executive</MenuItem>
                          </Select>
                        </FormControl>
                        <Box>
                          <Button
                            size='small'
                            sx={{ marginTop: '10px' }}
                            variant='contained'
                          >
                            Upload
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
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
                <Grid item xs={12} sm={12} md={6} lg={4}>
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
                <Grid item xs={12} sm={12} md={6} lg={12}>
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
