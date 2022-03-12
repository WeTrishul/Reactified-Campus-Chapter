import React from 'react';
import { useState, useEffect, useContext } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import LogoutIcon from '@mui/icons-material/Logout';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AuthContext from '../../Service/auth-context';
import { NavLink, Link, useHistory } from 'react-router-dom';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Axios from 'axios';
import './Navbar.css';

const Navbar = ({ socket }) => {
  const authCtx = useContext(AuthContext);
  let username = authCtx.username;
  let userid = authCtx.id;
  let history = useHistory();
  const [click, setClick] = useState(false);
  const [notify, setNotify] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notifycheck, setNotifyCheck] = useState('');
  const viewMobileResponsiveNavbar = () => setClick(!click);

  const logoutHandler = () => {
    authCtx.logout();
    history.push('/');
  };

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

  const notificationChecked = () => {
    console.log('main click ho gya shivu');
    // socket.emit('changebell',{
    //     userid:userid
    // })
  };

  return (
    <div className={click ? 'topnav responsive' : 'topnav'}>
      <div
        className='navbar-Logo'
        style={{ marginRight: '5rem', fontWeight: '700' }}
      >
        CAMPUS-CHAPTER
      </div>
      <Link
        onClick={viewMobileResponsiveNavbar}
        to='/Dashboard'
        className='active'
        style={{ fontWeight: '600' }}
      >
        Dashboard
      </Link>
      <div className='dropdown'>
        <button
          className='dropbtn'
          style={{ cursor: 'pointer', fontWeight: '600' }}
        >
          Events
          <i className='fa fa-caret-down'></i>
        </button>
        <div className='dropdown-content'>
          <Link onClick={viewMobileResponsiveNavbar} to='/UpcomingEvent'>
            College Events
          </Link>
          <Link
            onClick={viewMobileResponsiveNavbar}
            to='/GlobalEvents/CodeForces'
          >
            Codechef
          </Link>
          <Link
            onClick={viewMobileResponsiveNavbar}
            to='/GlobalEvents/CodeChef'
          >
            Codeforces
          </Link>
          <Link
            onClick={viewMobileResponsiveNavbar}
            to='/GlobalEvents/HackerRank'
          >
            Hackerrank
          </Link>
          <Link
            onClick={viewMobileResponsiveNavbar}
            to='/GlobalEvents/GeeksForGeeks'
          >
            GeeksforGeeks
          </Link>
        </div>
      </div>
      <Link
        style={{ fontWeight: '600' }}
        onClick={viewMobileResponsiveNavbar}
        to='/Discussion'
      >
        Discussion
      </Link>
      <Link
        style={{ fontWeight: '600' }}
        onClick={viewMobileResponsiveNavbar}
        to='/Blogs'
      >
        Blogs
      </Link>
      <div className='dropdown'>
        <button
          className='dropbtn'
          style={{ cursor: 'pointer', fontWeight: '600' }}
        >
          Resources
          <i className='fa fa-caret-down'></i>
        </button>
        <div className='dropdown-content'>
          <Link onClick={viewMobileResponsiveNavbar} to='/UploadResources'>
            Upload Resources
          </Link>
          <Link onClick={viewMobileResponsiveNavbar} to='/ViewResources'>
            View Resources
          </Link>
        </div>
      </div>
      <Link
        style={{ fontWeight: '600' }}
        onClick={viewMobileResponsiveNavbar}
        to='/Leaderboard'
      >
        Leaderboards
      </Link>
      <Link
        style={{ fontWeight: '600' }}
        onClick={viewMobileResponsiveNavbar}
        to='/SetQuestions'
      >
        Set Questions
      </Link>
      <div className='dropdown'>
        <button
          className='dropbtn'
          style={{ cursor: 'pointer', fontWeight: '600' }}
        >
          <NotificationsActiveIcon
          // style={{
          //   marginRight: '1.5rem',
          // }}
          />
          <i className='fa fa-caret-down'></i>
        </button>
        <div
          style={{ paddingRight: '2px', maxHeight: '50vh', overflowY: 'auto' }}
          className='dropdown-content'
        >
          {notifications.map((value, index) => {
            return (
              <Link
                key={index}
                style={{ color: 'black', textDecoration: 'none' }}
                to={'' + value.placetogo}
              >
                {value.msg}
              </Link>
            );
          })}
        </div>
      </div>
      <div className='dropdown'>
        <button
          className='dropbtn'
          style={{ cursor: 'pointer', fontWeight: '600' }}
        >
          <AccountCircleIcon />
          <i className='fa fa-caret-down'></i>
        </button>
        <div className='dropdown-content'>
          <Link onClick={viewMobileResponsiveNavbar} to='/Profile'>
            <PersonIcon style={{ marginRight: '5px' }} />
            Profile
          </Link>
          <Link onClick={viewMobileResponsiveNavbar} to='/EditProfile'>
            <AppRegistrationIcon style={{ marginRight: '5px' }} />
            Edit Profile
          </Link>
          <Link onClick={viewMobileResponsiveNavbar}>
            <WorkIcon style={{ marginRight: '5px' }} />
            Apply
          </Link>
          <Link onClick={logoutHandler}>
            <LogoutIcon style={{ marginRight: '5px' }} />
            Logout
          </Link>
        </div>
      </div>
      <Link
        href='javascript:void(0);'
        style={{ fontSize: '15px', color: '#fff' }}
        className='icon'
        onClick={viewMobileResponsiveNavbar}
      >
        &#9776;
      </Link>
    </div>
  );
};

export default Navbar;
