import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import Menu from '@mui/material/Menu';
import AuthContext from '../../Service/auth-context';
import Axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItem from '@mui/material/ListItem';

export default function Appbar({ socket }) {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [notifycheck, setNotifyCheck] = useState('');
  const authCtx = useContext(AuthContext);
  let username = authCtx.username;
  let userid = authCtx.id;
  let history = useHistory();
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

  const logoutHandler = () => {
    setprofileMenu(null);
    authCtx.logout();
    history.push('/');
  };

  const NotifyDrop = (event) => {
    console.log('main click ho gya shivu');
    socket.emit('changebell', {
      userid: username,
    });
    setNotify(!notify);
    handlenotifyMenuClick(event);
  };

  const notificationChecked = () => {
    console.log('main click ho gya shivu');
    // socket.emit('changebell',{
    //     userid:userid
    // })
  };

  const notifyrendering = () => {
    console.log('hyy', notifycheck);
    if (notifycheck == 'no') {
      return (
        <Toolbar>
          <Typography
            sx={{
              marginRight: '2px',
              cursor: 'pointer',
              marginLeft: '-30px',
              color: 'red',
            }}
          >
            <NotificationsActiveIcon
              id='notify-button'
              aria-controls={openNotify ? 'notify-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={openNotify ? 'true' : undefined}
              // onClick={handlenotifyMenuClick}
              onClick={NotifyDrop}
            />
          </Typography>
        </Toolbar>
        // <li className='navbar-items'>
        //   <Link
        //     className='nav-links'
        //     style={{ color: 'red' }}
        //     onClick={closeSideBar}
        //     onClick={notificationChecked}
        //     onClick={NotifyDrop}
        //   >
        //     <NotificationsActiveIcon />{' '}
        //   </Link>
        //   {/* {notify && <NotifyDropdown notifications={notifications}/>} */}
        //   {notify && notifications && (
        //     <NotifyDropdown notifications={notifications} />
        //   )}
        // </li>
      );
    } else {
      return (
        <Toolbar>
          <Typography
            sx={{ marginRight: '2px', cursor: 'pointer', marginLeft: '-30px' }}
          >
            <NotificationsActiveIcon
              id='notify-button'
              aria-controls={openNotify ? 'notify-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={openNotify ? 'true' : undefined}
              onClick={handlenotifyMenuClick}
            />
          </Typography>
        </Toolbar>
        // <li className='navbar-items'>
        //   <Link
        //     className='nav-links'
        //     onClick={closeSideBar}
        //     onClick={NotifyDrop}
        //   >
        //     <NotificationsActiveIcon />{' '}
        //   </Link>
        //   {notify && notifications && (
        //     <NotifyDropdown notifications={notifications} />
        //   )}
        // </li>
      );
    }
  };

  const [state, setState] = React.useState(false);

  const toggleSidebar = (open) => (event) => {
    setState(open);
  };

  const [eventsMenu, seteventsMenu] = React.useState(null);
  const openEventsMenu = Boolean(eventsMenu);
  const handleEventsClick = (event) => {
    seteventsMenu(event.currentTarget);
  };
  const handleEventsMenuClose = () => {
    seteventsMenu(null);
  };

  const [resourcesMenu, setresourcesMenu] = React.useState(null);
  const openResource = Boolean(resourcesMenu);
  const handleResourcesMenuClick = (event) => {
    setresourcesMenu(event.currentTarget);
  };
  const handleResourcesClose = () => {
    setresourcesMenu(null);
  };

  const [notifyMenu, setnotifyMenu] = React.useState(null);
  const openNotify = Boolean(notifyMenu);
  const handlenotifyMenuClick = (event) => {
    setnotifyMenu(event.currentTarget);
  };
  const handleNotifyClose = () => {
    setnotifyMenu(null);
  };

  const [profileMenu, setprofileMenu] = React.useState(null);
  const openProfileMenu = Boolean(profileMenu);
  const handleProfileMenuClick = (event) => {
    setprofileMenu(event.currentTarget);
  };
  const handleProfileClose = () => {
    setprofileMenu(null);
  };

  const list = () => {
    return (
      <div onClick={toggleSidebar(false)}>
        <List sx={{ width: '13rem', background: '#1b1b1b', color: '#fff' }}>
          <Box
            sx={{
              textAlign: 'center',
              justifyContent: 'center',
              background: '#1b1b1b',
              color: '#fff',
            }}
          >
            <Typography
              sx={{
                background: '#1b1b1b',
                color: '#fff',
                marginBottom: '10px',
              }}
            >
              CAMPUS-CHAPTER
            </Typography>
          </Box>
          <ListItem
            sx={{
              background: '#1b1b1b',
              color: '#fff',
              marginBottom: '10px',
              cursor: 'pointer',
            }}
          >
            <Link
              style={{ textDecoration: 'none', color: '#fff' }}
              to='/Dashboard'
            >
              Dashboard
            </Link>
          </ListItem>
          <ListItem
            sx={{ background: '#1b1b1b', color: '#fff', marginBottom: '10px' }}
          >
            <Link
              style={{ textDecoration: 'none', color: '#fff' }}
              to='/UpcomingEvent'
            >
              College Events
            </Link>
          </ListItem>
          <ListItem
            sx={{ background: '#1b1b1b', color: '#fff', marginBottom: '10px' }}
          >
            <Link
              style={{ textDecoration: 'none', color: '#fff' }}
              to='/GlobalEvents/CodeForces'
            >
              Codeforces Events
            </Link>
          </ListItem>
          <ListItem
            sx={{ background: '#1b1b1b', color: '#fff', marginBottom: '10px' }}
          >
            <Link
              style={{ textDecoration: 'none', color: '#fff' }}
              to='/GlobalEvents/CodeChef'
            >
              Codechef Events
            </Link>
          </ListItem>
          <ListItem
            sx={{ background: '#1b1b1b', color: '#fff', marginBottom: '10px' }}
          >
            <Link
              style={{ textDecoration: 'none', color: '#fff' }}
              to='/GlobalEvents/HackerRank'
            >
              Hackerrank Events
            </Link>
          </ListItem>
          <ListItem
            sx={{ background: '#1b1b1b', color: '#fff', marginBottom: '10px' }}
          >
            <Link
              style={{ textDecoration: 'none', color: '#fff' }}
              to='/GlobalEvents/GeeksForGeeks'
            >
              GeeksforGeeks Events
            </Link>
          </ListItem>
          <ListItem
            sx={{ background: '#1b1b1b', color: '#fff', marginBottom: '10px' }}
          >
            <Link
              style={{ textDecoration: 'none', color: '#fff' }}
              to='/Discussion'
            >
              Discussion
            </Link>
          </ListItem>
          <ListItem
            sx={{ background: '#1b1b1b', color: '#fff', marginBottom: '10px' }}
          >
            <Link
              style={{ textDecoration: 'none', color: '#fff' }}
              to='/Leaderboard'
            >
              Leaderboard
            </Link>
          </ListItem>
          <ListItem
            sx={{ background: '#1b1b1b', color: '#fff', marginBottom: '10px' }}
          >
            <Link
              style={{ textDecoration: 'none', color: '#fff' }}
              to='/SetQuestions'
            >
              Set Questions
            </Link>
          </ListItem>
          <ListItem
            sx={{ background: '#1b1b1b', color: '#fff', marginBottom: '10px' }}
          >
            <Link style={{ textDecoration: 'none', color: '#fff' }} to='/Blogs'>
              Blogs
            </Link>
          </ListItem>
          <ListItem
            sx={{ background: '#1b1b1b', color: '#fff', marginBottom: '10px' }}
          >
            <Link
              style={{ textDecoration: 'none', color: '#fff' }}
              to='/UploadResources'
            >
              Upload Resources
            </Link>
          </ListItem>
          <ListItem
            sx={{ background: '#1b1b1b', color: '#fff', marginBottom: '10px' }}
          >
            <Link
              style={{ textDecoration: 'none', color: '#fff' }}
              to='/ViewResources'
            >
              Resources
            </Link>
          </ListItem>
          <ListItem
            sx={{ background: '#1b1b1b', color: '#fff', marginBottom: '10px' }}
          >
            <Link
              style={{ textDecoration: 'none', color: '#fff' }}
              to='/Profile'
            >
              Profile
            </Link>
          </ListItem>
          <ListItem
            sx={{ background: '#1b1b1b', color: '#fff', marginBottom: '10px' }}
          >
            <Link
              style={{ textDecoration: 'none', color: '#fff' }}
              to='/EditProfile'
            >
              Edit Profile
            </Link>
          </ListItem>
          <ListItem
            sx={{ background: '#1b1b1b', color: '#fff', marginBottom: '10px' }}
          >
            <Link style={{ textDecoration: 'none', color: '#fff' }} to='/Apply'>
              Apply
            </Link>
          </ListItem>
          <ListItem
            onClick={logoutHandler}
            sx={{ background: '#1b1b1b', color: '#fff', marginBottom: '10px' }}
          >
            Logout
          </ListItem>
          <ListItem
            sx={{ background: '#1b1b1b', color: '#fff', marginBottom: '10px' }}
          ></ListItem>
          <ListItem
            sx={{ background: '#1b1b1b', color: '#fff', marginBottom: '10px' }}
          ></ListItem>
          <ListItem
            sx={{ background: '#1b1b1b', color: '#fff', marginBottom: '10px' }}
          ></ListItem>
          <ListItem
            sx={{ background: '#1b1b1b', color: '#fff', marginBottom: '10px' }}
          ></ListItem>
        </List>
      </div>
    );
  };
  const displayAccountMenu = () => {
    if (window.innerWidth < 992) {
      return (
        <Toolbar>
          <Typography sx={{ display: 'none' }}>
            <AccountCircleIcon />
          </Typography>
          <Typography>
            <MenuIcon onClick={toggleSidebar(true)} />
          </Typography>
        </Toolbar>
      );
    } else {
      return (
        <Toolbar>
          <div>
            <Typography>
              <AccountCircleIcon
                sx={{ cursor: 'pointer', marginLeft: '-30px' }}
                id='Profile-button'
                aria-controls={openProfileMenu ? 'profile-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={openProfileMenu ? 'true' : undefined}
                onClick={handleProfileMenuClick}
              />
            </Typography>
          </div>
          <Typography sx={{ display: 'none' }}>
            <MenuIcon />
          </Typography>
        </Toolbar>
      );
    }
  };
  const displayNavComponent = () => {
    if (window.innerWidth < 992) {
      return (
        <Toolbar>
          <Typography sx={{ marginRight: '1rem', display: 'none' }}>
            Dashboard
          </Typography>
          <Typography sx={{ marginRight: '1rem', display: 'none' }}>
            Events
          </Typography>
          <Typography sx={{ marginRight: '1rem', display: 'none' }}>
            Discussion
          </Typography>
          <Typography sx={{ marginRight: '1rem', display: 'none' }}>
            Set Questions
          </Typography>
          <Typography sx={{ marginRight: '1rem', display: 'none' }}>
            Blogs
          </Typography>
          <Typography sx={{ marginRight: '1rem', display: 'none' }}>
            Resources
          </Typography>
        </Toolbar>
      );
    } else {
      return (
        <Toolbar>
          <Typography sx={{ marginRight: '1rem', cursor: 'pointer' }}>
            <Link
              style={{ textDecoration: 'none', color: '#fff' }}
              to='/Dashboard'
            >
              Dashboard
            </Link>
          </Typography>
          <Typography
            sx={{ marginRight: '1rem', cursor: 'pointer' }}
            id='events-button'
            aria-controls={openEventsMenu ? 'events-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={openEventsMenu ? 'true' : undefined}
            onClick={handleEventsClick}
          >
            All Events
          </Typography>
          <Typography sx={{ marginRight: '1rem', cursor: 'pointer' }}>
            <Link
              style={{ textDecoration: 'none', color: '#fff' }}
              to='/Discussion'
            >
              Discussion
            </Link>
          </Typography>
          <Typography sx={{ marginRight: '1rem', cursor: 'pointer' }}>
            <Link
              style={{ textDecoration: 'none', color: '#fff' }}
              to='/Leaderboard'
            >
              Leaderboard
            </Link>
          </Typography>
          <Typography sx={{ marginRight: '1rem', cursor: 'pointer' }}>
            <Link
              style={{ textDecoration: 'none', color: '#fff' }}
              to='/SetQuestions'
            >
              Set Questions
            </Link>
          </Typography>
          <Typography sx={{ marginRight: '1rem', cursor: 'pointer' }}>
            <Link style={{ textDecoration: 'none', color: '#fff' }} to='/Blogs'>
              Blogs
            </Link>
          </Typography>
          <Typography
            sx={{ marginRight: '2px', cursor: 'pointer' }}
            id='resource-button'
            aria-controls={openResource ? 'resource-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={openResource ? 'true' : undefined}
            onClick={handleResourcesMenuClick}
          >
            Resources
          </Typography>
        </Toolbar>
      );
    }
  };
  return (
    <div>
      <AppBar sx={{ background: '#1b1b1b', position: 'sticky' }}>
        <Toolbar>
          <Typography sx={{ flex: '1' }}>Campus-Chapter</Typography>
          {displayNavComponent()}
          {notifyrendering()}
          {/* <Typography sx={{ marginRight: '1rem', cursor: 'pointer' }}>
            <NotificationsActiveIcon
              id='notify-button'
              aria-controls={openNotify ? 'notify-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={openNotify ? 'true' : undefined}
              onClick={handlenotifyMenuClick}
            />
          </Typography> */}
          {displayAccountMenu()}
        </Toolbar>
      </AppBar>
      <div>
        <Drawer anchor={'left'} open={state} onClose={toggleSidebar(false)}>
          {list()}
        </Drawer>
      </div>
      <div>
        <Menu
          id='events-menu'
          anchorEl={eventsMenu}
          open={openEventsMenu}
          onClose={handleEventsMenuClose}
          MenuListProps={{
            'aria-labelledby': 'events-button',
          }}
        >
          <MenuItem onClick={handleEventsMenuClose}>
            <Link
              style={{ textDecoration: 'none', color: '#1b1b1b' }}
              to='/UpcomingEvent'
            >
              College Events
            </Link>
          </MenuItem>
          <MenuItem onClick={handleEventsMenuClose}>
            <Link
              style={{ textDecoration: 'none', color: '#1b1b1b' }}
              to='/GlobalEvents/CodeChef'
            >
              Codechef
            </Link>
          </MenuItem>
          <MenuItem onClick={handleEventsMenuClose}>
            <Link
              style={{ textDecoration: 'none', color: '#1b1b1b' }}
              to='/GlobalEvents/CodeForces'
            >
              Codeforces
            </Link>
          </MenuItem>
          <MenuItem onClick={handleEventsMenuClose}>
            <Link
              style={{ textDecoration: 'none', color: '#1b1b1b' }}
              to='/GlobalEvents/HackerRank'
            >
              Hackerrank Events
            </Link>
          </MenuItem>
          <MenuItem onClick={handleEventsMenuClose}>
            <Link
              style={{ textDecoration: 'none', color: '#1b1b1b' }}
              to='/GlobalEvents/GeeksForGeeks'
            >
              GeeksforGeeks Events
            </Link>
          </MenuItem>
        </Menu>
      </div>
      <div>
        <Menu
          id='resource-menu'
          anchorEl={resourcesMenu}
          open={openResource}
          onClose={handleResourcesClose}
          MenuListProps={{
            'aria-labelledby': 'resource-button',
          }}
        >
          <MenuItem onClick={handleResourcesClose}>
            <Link
              style={{ textDecoration: 'none', color: '#1b1b1b' }}
              to='/UploadResources'
            >
              Upload Resources
            </Link>
          </MenuItem>
          <MenuItem onClick={handleResourcesClose}>
            <Link
              style={{ textDecoration: 'none', color: '#1b1b1b' }}
              to='/ViewResources'
            >
              View Resources
            </Link>
          </MenuItem>
        </Menu>
      </div>
      <div>
        <Menu
          id='notify-menu'
          anchorEl={notifyMenu}
          open={openNotify}
          onClose={handleNotifyClose}
          MenuListProps={{
            'aria-labelledby': 'notify-button',
          }}
          sx={{ overflowX: 'auto' }}
        >
          {notifications.map((value, index) => {
            return (
              <MenuItem key={index}>
                <Link
                  style={{ color: 'black', textDecoration: 'none' }}
                  to={'' + value.placetogo}
                >
                  {value.msg}
                </Link>
              </MenuItem>
            );
          })}
        </Menu>
      </div>
      <div>
        <Menu
          sx={{ maxWidth: '250px' }}
          id='profile-menu'
          anchorEl={profileMenu}
          open={openProfileMenu}
          onClose={handleProfileClose}
          MenuListProps={{
            'aria-labelledby': 'Profile-button',
          }}
        >
          <MenuItem onClick={handleProfileClose}>
            <Link
              style={{ textDecoration: 'none', color: '#1b1b1b' }}
              to='/Profile'
            >
              Profile
            </Link>
          </MenuItem>
          <MenuItem onClick={handleProfileClose}>
            <Link
              style={{ textDecoration: 'none', color: '#1b1b1b' }}
              to='/EditProfile'
            >
              Edit Profile
            </Link>
          </MenuItem>
          <MenuItem onClick={handleProfileClose}>
            <Link
              style={{ textDecoration: 'none', color: '#1b1b1b' }}
              to='Apply'
            >
              Apply
            </Link>
          </MenuItem>
          <MenuItem onClick={logoutHandler}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
