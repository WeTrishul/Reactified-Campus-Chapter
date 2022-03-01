import React from 'react';
import './Userprofile.css';
import Box from '@mui/material/Box';
import Chart from '../Chart';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import PieChart from '../PieChart';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
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
import { useParams } from 'react-router-dom';

function OtherProfile() {
  const [array, setArray] = useState([1, 2, 3, 4]);
  const { userkaname } = useParams();

  var cat = { userkaname };
  var userkausername = cat.userkaname;

  const [role, setRole] = React.useState('');

  const handleChange = (event) => {
    setRole(event.target.value);
  };
  const [userProfile, setUserProfile] = useState();

  const authCtx = useContext(AuthContext);
  let userId = authCtx.id;
  let userName = authCtx.username;

  useEffect(() => {
    Axios({
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/profilepage/' + userkausername,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);

        setUserProfile(data.searchuser);
      });
  }, []);

  const changeRolehandler = () => {
    Axios({
      method: 'GET',
      headers: { 'Content-Type': 'multipart/form-data' },
      params: {
        username: userkausername,
        role: role,
      },
      withCredentials: true,
      url: 'http://localhost:3000/userrole',
    })
      .then((res) => {
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
                { authCtx.usertype=='Admin' && <FormControl fullWidth>
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
                              <MenuItem value='QuestionSetter'>
                                Question Setter
                              </MenuItem>
                              <MenuItem value='EventsLead'>
                                Events Lead
                              </MenuItem>
                              <MenuItem value='MediaLead'>Media Lead</MenuItem>
                              <MenuItem value='Executive'>Executive</MenuItem>
                            </Select>
                          </FormControl> }
              { authCtx.usertype=='Admin' &&  <Box sx={{ marginLeft: '10px' }}>
                     <Button
                       size='small'
                       sx={{ fontSize: '10px' }}
                       variant='contained'
                       onClick={changeRolehandler}
                     >
                       Promote
                     </Button> 
                   </Box> }
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

export default OtherProfile;
