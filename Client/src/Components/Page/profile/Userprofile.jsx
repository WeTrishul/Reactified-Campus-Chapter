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


  const [userProfile, setUserProfile] = useState();


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
     {userProfile && <div className='userProfile-body-Box'>
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
                      src={'http://localhost:3000' + userProfile.dp}
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
                        <input type='file' name='dp' id='multiFiles' hidden  />
                      </Button>
                    </Box>
                    <Box sx={{ marginLeft: '10px' }}>
                      <Button
                        size='small'
                        sx={{ fontSize: '10px' }}
                        variant='contained'
                        onClick={uploadHandler}
                      >
                        Upload
                      </Button>
                    </Box>
                  </Box>
                  <Box sx={{ marginTop: '8px' }}>{userProfile.UserType}</Box>
                  {/* <Box>{usertype}</Box> */}
                  <Box>{userProfile.username}</Box>
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
                    <Box sx={{ marginTop: '1rem' }}>{userProfile.CurrentRating}</Box>
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
                    <Box sx={{ marginTop: '1rem' }}>{userProfile.arr.length}</Box>
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
                    <Box sx={{ marginTop: '1rem' }}>{userProfile.arr.length}</Box>
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
                  <Chart profile={userProfile.OverallRatings} />
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
      </div> }
    </div>
  );
}

export default Userprofile;
