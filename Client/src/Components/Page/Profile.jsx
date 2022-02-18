import React from 'react';
import Chart from './Chart';
import { useState, useEffect, useContext } from 'react';
import './Profile.css';
import Axios from 'axios';
import Card from '@mui/material/Card';
import AuthContext from '../../Service/auth-context';

function Profile() {
  const [profile, setProfile] = useState({ user: '' });
  const [profiledp, setProfileDP] = useState({ user: '' });

  const authCtx = useContext(AuthContext);
  let userid = authCtx.id;

  useEffect(() => {
    Axios({
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/profilepage',
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        // console.log({ user: data.user });
        console.log(data);
        setProfile({ user: data.user });
        setProfileDP({ photu: data.user.dp });

        //     // console.log(data)
      });
  }, []);

  const profilePictureHandler = () => {
    const inpfiles = document.getElementById('multiFiles');
    var form_data = new FormData();
    form_data.append('dp', inpfiles.files[0]);

    Axios({
      method: 'POST',
      data: form_data,
      withCredentials: true,
      url: 'http://localhost:3000/profilepage/setdp/' + userid,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        document.getElementById('maindp').src =
          'http://localhost:3000' + data.photu;

        // setProfileDP(...profiledp, { photu: data.photu });
      });
  };

  return (
    <div>
      {profile && profiledp && (
        <div className='profile-page'>
          <div className='side-img-display'>
            <Card style={{ textAlign: 'center', justifyContent: 'center' }}>
              <div className='profile-img'>
                <input type='file' id='multiFiles' name='dp' />
                <button
                  style={{ marginBottom: '1rem' }}
                  onClick={profilePictureHandler}
                >
                  Upload
                </button>
                <div className='profile-image-Container'>
                  <img
                    id='maindp'
                    style={{ width: '200px', height: '200px' }}
                    src={'http://localhost:3000' + profiledp.photu}
                    alt=''
                  />
                </div>
              </div>

              <div className='profile-details'>{profile.user.UserType}</div>
            </Card>
          </div>
          <div className='achievements'>
            <Card style={{ height: '27.5vh' }}>
              <div className='achievement-box'>
                <div className='rating'>
                  <div>Rating</div>
                  <div>{profile.user.CurrentRating}</div>
                </div>
                <div className='contribution'>
                  <div>Contribution</div>
                  <div>376</div>
                </div>
              </div>
            </Card>
          </div>

          <div className='personal-details'>
            <Card>
              <div className='personalDetails'>
                <div>Name: {profile.user.name}</div>
                <div>
                  College: University of Engineering and Management, kolkata
                </div>
                <div>Year: 3rd</div>
              </div>
              <div className='graphProfile'>
                {profile.user.OverallRatings && (
                  <Chart profile={profile.user.OverallRatings} />
                )}
                {/* <Chart profile={profile.user.OverallRatings} /> */}
              </div>
            </Card>
          </div>

          <div className='only-space'></div>
        </div>
      )}
    </div>
  );
}

export default Profile;
