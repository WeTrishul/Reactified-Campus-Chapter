import React from 'react'
import {Link, useHistory} from 'react-router-dom';
import {useState,useEffect ,useContext} from 'react';

import './MainNavigation.css'
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import Dropdown from './Dropdown';
import AuthContext from '../../Service/auth-context';

function MainNavigation({ socket}) {
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);
  
    useEffect(() => {
       
      socket.on('notification', (data) => {
          console.log(data)
        setNotifications((prev) => [...prev, data]);
      });

    //   socket2.on('yesyoumaynotify',(data)=>{

    //     console.log(data)
    //     setNotifications((prev) => [...prev, data]);

    //   })

    }, [socket]);

    const authCtx = useContext(AuthContext)
    let history = useHistory();

    const logoutHandler = () =>{
        authCtx.logout();
        history.push('/');
    }

    const [click,setClick] = useState(false);
    const[dropdown,setDropdown] = useState(false);

    const handleNavbar = () => setClick(!click);
    const closeSideBar = () => setClick(false);

    const DropActive = () => setDropdown(!dropdown)


    return (
        <div>
            <nav className='navbar'>
            <div className="logo">Campus-Chapter</div>
            <i className='icon' onClick={handleNavbar}><MenuIcon/></i>
            <ul className= {click ? 'nav-bar active' : 'nav-bar'}>
                
                <li className= 'navbar-items'>
                    <Link to='/Dashboard' className='nav-links' onClick={closeSideBar}>DashBoard</Link>
                </li>
                <li className= 'navbar-items'>
                    <Link to='/UpcomingEvent' className='nav-links' onClick={closeSideBar} >Upcoming Event</Link>
                </li>
                <li className= 'navbar-items'>
                    <Link to='/Discussion' className='nav-links' onClick={closeSideBar} >Discussion</Link>
                </li>
                <li className= 'navbar-items'>
                    <Link to='/Leaderboard' className='nav-links' onClick={closeSideBar} >Leaderboard</Link>
                </li>
                <li className= 'navbar-items'>
                    <Link to='/ViewAllPoll' className='nav-links' onClick={closeSideBar} >Polling</Link>
                </li>
                <li className= 'navbar-items'>
                    <Link to='/Blogs' className='nav-links' onClick={closeSideBar}>Blogs</Link>
                </li>
                <li className= 'navbar-items'>
                    <Link className='nav-links' onClick={closeSideBar} ><NotificationsActiveIcon/> </Link>
                </li>
                {/* <li className= 'navbar-items'>
                    <Link to='/Profile' className='nav-links' onClick={closeSideBar} >Profile</Link>
                </li> */}
                <li className= 'navbar-items'>
                    <Link  className='nav-links' onClick={closeSideBar} onClick={DropActive}><AccountCircleRoundedIcon/></Link>
                    {dropdown && <Dropdown/>}
                </li>
                 {/* <li className= 'navbar-items'>
                    <Link  className='nav-links' onClick={logoutHandler} >Logout</Link>
                </li> */}
                {/* <li className= 'navbar-items'>
                    <Dropdown/>
                </li> */}
            </ul>
            </nav>
        </div>
    )
}

export default MainNavigation
