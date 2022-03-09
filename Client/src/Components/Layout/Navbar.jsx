import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import './Navbar.css';
import Axios from 'axios';
import AuthContext from '../../Service/auth-context';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import LogoutIcon from '@mui/icons-material/Logout';

function Navbar({ socket }) {
  let history = useHistory();
  const authCtx = useContext(AuthContext);
  let username = authCtx.username;
  const [notifications, setNotifications] = useState([]);
  const [notifycheck, setNotifyCheck] = useState('');
  const [notify, setNotify] = useState(false);

  useEffect(() => {
    socket.on('notification', (data) => {
      console.log(data);
      setNotifications((prev) => [...prev, data]);
      setNotifyCheck('no');
    });

    socket.on('yesyoumaynotify', (data) => {
      console.log(data);
      setNotifications((prev) => [...prev, data]);
      setNotifyCheck('no');
    });

    socket.on('changedbell', () => {
      console.log('PERMISSION GRANTED');
      setNotifyCheck('yes');
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    Axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:3000/profilepage/' + username,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log('Notification wala hoon main');
        console.log(data);
        // if (data.searchuser.Notifications.length > 0) {
        //   setNotifications((prev) => [...prev, data.searchuser.Notifications]);
        // }

        setNotifications(data.searchuser.Notifications);
        setNotifyCheck(data.searchuser.seenAllNotifications);
        console.log(notifycheck);
      });
  }, []);

  const NotifyDrop = (event) => {
    console.log('main click ho gya shivu');
    socket.emit('changebell', {
      userid: username,
    });
    setNotify(!notify);
  };

  const logoutHandler = () => {
    authCtx.logout();
    history.push('/');
  };
  return (
    <div>
      <header>
        <div className='container'>
          <input type='checkbox' name='' id='check' />

          <div className='logo-container'>
            <h3 className='logo'>Campus-Chapter</h3>
          </div>

          <div className='nav-btn'>
            <div className='nav-links'>
              <ul>
                <li className='nav-link' style={{ '--i': '.6s' }}>
                  <Link to='/Dashboard'>Dashboard</Link>
                </li>
                <li className='nav-link' style={{ '--i': '.85s' }}>
                  <Link>
                    Events<i className='fas fa-caret-down'></i>
                  </Link>
                  <div className='dropdown'>
                    <ul>
                      <li className='dropdown-link'>
                        <Link to='/UpcomingEvent'>College Events</Link>
                      </li>
                      <li className='dropdown-link'>
                        <Link to='/GlobalEvents/CodeForces'>Codeforces</Link>
                      </li>
                      <li className='dropdown-link'>
                        <Link to='/GlobalEvents/CodeChef'>Codechef</Link>
                      </li>
                      <li className='dropdown-link'>
                        <Link to='/GlobalEvents/HackerRank'>Hackerrank</Link>
                      </li>
                      <li className='dropdown-link'>
                        <Link to='/GlobalEvents/GeeksForGeeks'>
                          Geeksforgeeks
                        </Link>
                      </li>
                      <div className='arrow'></div>
                    </ul>
                  </div>
                </li>
                <li className='nav-link' style={{ '--i': '.6s' }}>
                  <Link to='/Discussion'>Discussion</Link>
                </li>
                <li className='nav-link' style={{ '--i': '.6s' }}>
                  <Link to='/Leaderboard'>Leaderboard</Link>
                </li>
                <li className='nav-link' style={{ '--i': '1.35s' }}>
                  <Link to='/SetQuestions'>Set Questions</Link>
                </li>
                <li className='nav-link' style={{ '--i': '1.35s' }}>
                  <Link to='/Blogs'>Blogs</Link>
                </li>
                <li className='nav-link' style={{ '--i': '.85s' }}>
                  <Link>
                    Resources<i className='fas fa-caret-down'></i>
                  </Link>
                  <div className='dropdown'>
                    <ul>
                      <li className='dropdown-link'>
                        <Link to='/UploadResources'>Upload Resources</Link>
                      </li>
                      <li className='dropdown-link'>
                        <Link to='/ViewResources'>View Resources</Link>
                      </li>
                      <div className='arrow'></div>
                    </ul>
                  </div>
                </li>
                <li className='nav-link' style={{ '--i': '1.1s' }}>
                  <Link>
                    <NotificationsActiveIcon />
                    <i className='fas fa-caret-down'></i>
                  </Link>
                  <div className='dropdown'>
                    <ul>
                      <li className='dropdown-link'>
                        {notifications.map((value, index) => {
                          return (
                            <div
                              style={{
                                background: '#fff',
                                width: '13rem',
                                padding: '5px',
                              }}
                              key={index}
                            >
                              <Link
                                style={{
                                  color: 'black',
                                  textDecoration: 'none',
                                }}
                                to={'' + value.placetogo}
                              >
                                {value.msg}
                              </Link>
                            </div>
                          );
                        })}
                      </li>
                      <div className='arrow'></div>
                    </ul>
                  </div>
                </li>
                <li className='nav-link' style={{ '--i': '1.1s' }}>
                  <Link>
                    <AccountCircleRoundedIcon />
                    <i className='fas fa-caret-down'></i>
                  </Link>
                  <div className='dropdown'>
                    <ul>
                      <li className='dropdown-link'>
                        <Link to='/Profile'>
                          <span>
                            <PersonIcon /> Profile
                          </span>
                        </Link>
                      </li>
                      <li className='dropdown-link'>
                        <Link to='/EditProfile'>
                          <span>
                            <AppRegistrationIcon /> Edit Profile
                          </span>
                        </Link>
                      </li>
                      <li className='dropdown-link'>
                        <Link to='/Apply'>
                          <span>
                            <WorkIcon /> Apply
                          </span>
                        </Link>
                      </li>
                      <li className='dropdown-link'>
                        <Link onClick={logoutHandler}>
                          <span>
                            <LogoutIcon /> Logout
                          </span>
                        </Link>
                      </li>
                      <div className='arrow'></div>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className='hamburger-menu-container'>
            <div className='hamburger-menu'>
              <div></div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
