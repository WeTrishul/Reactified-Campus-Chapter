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
import AuthContext from '../../../Service/auth-context';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import Axios from 'axios';

function Userprofile() {
  const [userProfile, setUserProfile] = useState();

  const authCtx = useContext(AuthContext);
  let userId = authCtx.id;
  let userName = authCtx.username;

  useEffect(() => {
    Axios({
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/profilepage/' + userName,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);

        setUserProfile(data.searchuser);
      });
  }, []);

  const uploadHandler = () => {
    var form_data = new FormData();

    const inpfiles = document.getElementById('multiFiles');
    form_data.append('dp', inpfiles.files[0]);

    Axios({
      method: 'POST',

      data: form_data,
      headers: { 'Content-Type': 'multipart/form-data' },

      withCredentials: true,
      url: 'http://localhost:3000/profilepage/setdp/' + userId,
    })
      .then((res) => {
        console.log(res.data.photu);
        document.getElementById('userkadp').src =
          'http://localhost:3000' + res.data.photu;

        console.log('Hi');
      })
      .catch((err) => {
        console.log(err);
        console.log('main nhi chal rha hoon bhai');
      });
  };

  return (
    <div>
      <div className='userProfile-body-Box'>
        <div className='userProfile-outer-Box'>
          <div className='userProfile-inner-Box'>
            {userProfile && (
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
                          id='userkadp'
                          style={{
                            width: '100%',
                            height: '120px',
                            borderRadius: '10px',
                          }}
                          src={'http://localhost:3000' + userProfile.dp}
                          alt=''
                        />
                        <Box sx={{ color: 'text.secondary' }}>
                          {userProfile.UserType}
                        </Box>
                        <Box
                          sx={{
                            color: 'text.secondary',
                            textAlign: 'left',
                            fontSize: '15px',
                          }}
                        >
                          Name: {userProfile.username}
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
                                name='dp'
                                id='multiFiles'
                                hidden
                              />
                            </Button>
                          </Box>
                          <Button
                            size='small'
                            sx={{ marginTop: '10px' }}
                            variant='contained'
                            onClick={uploadHandler}
                          >
                            Upload
                          </Button>
                        </Box>
                        <Box sx={{ minWidth: 80, marginTop: '10px' }}>
                          {/* maybe write here something */}
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
                        {userProfile.CurrentRating}
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
                        {userProfile.arr.length}
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
                      {userProfile && (
                        <Chart profile={userProfile.OverallRatings} />
                      )}
                    </Card>
                  </Grid>
                </Grid>
              </Typography>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userprofile;
