import React from 'react';
import './Userprofile.css';
import Box from '@mui/material/Box';
import Chart from '../Chart';
import PieChart from '../PieChart';
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
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AuthContext from '../../../Service/auth-context';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import Axios from 'axios';

function Userprofile() {
  const authCtx = useContext(AuthContext);
  let userId = authCtx.id;
  let userName = authCtx.username;
  let usertype = authCtx.usertype;

  const [array, setArray] = useState([1, 2, 3, 4]);
  return (
    <div>
      <div className='userProfile-body-Box'>
        <div className='userProfile-outer-Box'>
          <div className='userProfile-inner-Box'>
            <div className='profile-Grid-View-Container'>
              <div className='profile-Image-Sidebar'>
                <Card
                  sx={{
                    maxHeight: '100%',
                    padding: '1rem',
                    textAlign: 'center',
                    justifyContent: 'center',
                    borderRadius: '20px',
                  }}
                >
                  <Box className='profile-User-Image-Container'>
                    <img
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                      }}
                      src='https://media.istockphoto.com/photos/colored-powder-explosion-on-black-background-picture-id1140180560?k=20&m=1140180560&s=612x612&w=0&h=X_400OQDFQGqccORnKt2PHYvTZ3dBLeEnCH_hRiUQrY='
                      alt=''
                    />
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Box>
                      <Button
                        sx={{ fontSize: '10px' }}
                        size='small'
                        variant='contained'
                        component='label'
                      >
                        Edit picture
                        <input type='file' name='dp' id='multiFiles' hidden />
                      </Button>
                    </Box>
                    <Box sx={{ marginLeft: '10px' }}>
                      <Button
                        size='small'
                        sx={{ fontSize: '10px' }}
                        variant='contained'
                      >
                        Upload
                      </Button>
                    </Box>
                  </Box>
                  <Box sx={{ marginTop: '8px' }}>Role</Box>
                  <Box>{usertype}</Box>
                  <Box>Institute</Box>
                </Card>
              </div>
              <div className='profile-Rating'>
                <Card
                  className='profile-Rtaing-Card-Container'
                  sx={{
                    borderRadius: '20px',
                    background: 'lightgreen',
                  }}
                >
                  <Typography sx={{ color: 'text.secondary' }}>
                    <Box>
                      <StarRoundedIcon />
                      Rating <StarRoundedIcon />
                    </Box>
                    <Box sx={{ marginTop: '1rem' }}>1200</Box>
                  </Typography>
                </Card>
              </div>
              <div className='profile-Contribution'>
                <Card
                  className='profile-Contibution-Card-Container'
                  sx={{
                    borderRadius: '20px',
                    background: 'rgb(247, 247, 116)',
                  }}
                >
                  <Typography sx={{ color: 'text.secondary' }}>
                    <Box>
                      <VolunteerActivismIcon />
                      Contibution <VolunteerActivismIcon />
                    </Box>
                    <Box sx={{ marginTop: '1rem' }}>1200</Box>
                  </Typography>
                </Card>
              </div>
              <div className='profile-Resources'>
                <Card
                  className='profile-Resources-Card-Container'
                  sx={{
                    borderRadius: '20px',
                    background: 'lightblue',
                  }}
                >
                  <Typography sx={{ color: 'text.secondary' }}>
                    <Box>
                      <LibraryBooksIcon />
                      Resources
                    </Box>
                    <Box sx={{ marginTop: '1rem' }}>1200</Box>
                  </Typography>
                </Card>
              </div>
              <div className='profile-OnlySpace'></div>
              <div className='profile-Graph-One'>
                <Card
                  sx={{
                    width: '100%',
                    height: '100%',
                    padding: '1rem',
                    borderRadius: '20px',
                  }}
                >
                  <Chart />
                </Card>
              </div>
              <div className='profile-Graph-Two'>
                <Card
                  sx={{
                    width: '100%',
                    height: '100%',
                    padding: '1rem',
                    textAlign: 'center',
                    justifyContent: 'center',
                    borderRadius: '20px',
                  }}
                >
                  <PieChart profile={array} />
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userprofile;
