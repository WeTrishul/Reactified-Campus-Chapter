import React from 'react'
import {Link, useHistory} from 'react-router-dom';
import {useState,useEffect ,useContext} from 'react';
import './MainNavigation.css'
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import Dropdown from './Dropdown';
import AuthContext from '../../Service/auth-context';
import EventsDropdown from './EventsDropdown';
import QuestionsDropdown from './QuestionsDropdown';
import NotifyDropdown from './NotifyDropdown';
import Axios from "axios";
import Dropdata from './Dropdata';


function MainNavigation({ socket}) {
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);
    const [notifycheck,setNotifyCheck] = useState('');
    const authCtx = useContext(AuthContext)
    let username = authCtx.username;
    let userid = authCtx.id;
    let history = useHistory();
  
    useEffect(() => {
       
      socket.on('notification', (data) => {
          console.log(data)
        setNotifications((prev) => [...prev, data]);
        setNotifyCheck("no")
      });


    //   socket.on('bolna',(data)=>{
    //       console.log('Ha bhai bolna')
    //       setNotifications((prev) => [...prev, data]);
    //   })

    socket.on('yesyoumaynotify',(data)=>{

        console.log(data)
        setNotifications((prev) => [...prev, data]);
        setNotifyCheck("no")
    })

    socket.on("changedbell",()=>{
        console.log("PERMISSION GRANTED")
        setNotifyCheck("yes")
    })

  
      return () => {
                
        
        socket.disconnect()}

    }, [socket]);



    useEffect(()=>{

        // const welcome = {
        //     msg:"Welcome to campus-chapter",
        //     placetogo : ""
        // }

        // setNotifications({
        //     msg:"Welcome to campus-chapter",
        //     placetogo : ""
        // })
        // setNotifications(oldArray => [...notifications, welcome]);

        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:3000/profilepage/"+username,
          }).then((response) =>{
            return response.data
            })
          .then(data =>{
            console.log("Notification wala hoon main")
            console.log(data)
            if(data.searchuser.Notifications.length>0)
            {
                setNotifications((prev) => [...prev, data.searchuser.Notifications])
            }
            
            setNotifyCheck(data.searchuser.seenAllNotifications)
            console.log(notifycheck)
        });
    },[])

    

    

    const logoutHandler = () =>{
        authCtx.logout();
        history.push('/');
    }

    const [click,setClick] = useState(false);
    const[dropdown,setDropdown] = useState(false);
    const [modal,setModal] = useState(false)
    const [EventsDrop,setEventsDrop] = useState(false)
    const [questiondrop,setQuestionDrop] = useState(false)
    const [notify,setNotify] = useState(false)
    const [resourcesdrop,setResourcesDrop]= useState(false);

    const handleNavbar = () => setClick(!click);
    const closeSideBar = () => setClick(false);

    const DropActive = () => setDropdown(!dropdown)

    const resourcesActive=() =>setResourcesDrop(!resourcesdrop)

    const EventsActive = () => setEventsDrop(!EventsDrop)

    const NotifyDrop = () => {
        console.log("main click ho gya shivu")
        socket.emit('changebell',{
            userid:username
        })
        setNotify(!notify)
    }

    const QuestionActive = () => setQuestionDrop(!questiondrop)

    

    const notificationChecked = () =>{
        console.log("main click ho gya shivu")
        // socket.emit('changebell',{
        //     userid:userid
        // })
    }

    const notifyrendering = () =>{
        console.log("hyy",notifycheck)
        if(notifycheck == "no")
        {
            return(
                <li className= 'navbar-items'>
                <Link className='nav-links' style={{color:"red"}} onClick={closeSideBar}  onClick={notificationChecked} onClick={NotifyDrop}><NotificationsActiveIcon/> </Link>
                {/* {notify && <NotifyDropdown notifications={notifications}/>} */}
                {notify && notifications && <NotifyDropdown notifications={notifications} />}
            </li>
            )
        }
        else{
            return(
                <li className= 'navbar-items'>
                <Link className='nav-links' onClick={closeSideBar} onClick={NotifyDrop} ><NotificationsActiveIcon/> </Link>
                {notify && <NotifyDropdown/>}
            </li>
            )
        }
    }

    return (
        <div>
            <nav className='navbar'>
            <div className="logo">CAMPUS-CHAPTER</div>
            <i className='icon' onClick={handleNavbar}><MenuIcon/></i>
            <ul className= {click ? 'nav-bar active' : 'nav-bar'}>
                
                <li className= 'navbar-items'>
                    <Link to='/Dashboard'  className='nav-links' onClick={closeSideBar}>DashBoard</Link>
                </li>
                <li className= 'navbar-items'>
                    <Link  className='nav-links' onClick={closeSideBar} onClick={EventsActive} >All Events</Link>
                    {EventsDrop && <EventsDropdown/>}
                </li>
                <li className= 'navbar-items'>
                    <Link to='/Discussion' className='nav-links' onClick={closeSideBar} >Discussion</Link>
                </li>
                <li className= 'navbar-items'>
                    <Link to='/Leaderboard' className='nav-links' onClick={closeSideBar} >Leaderboard</Link>
                </li>
                <li className= 'navbar-items'>
                    <Link  className='nav-links' onClick={closeSideBar} onClick={QuestionActive} >Set Question</Link>
                    {questiondrop && <QuestionsDropdown/>}
                </li>
                <li className= 'navbar-items'>
                    <Link to='/Blogs' className='nav-links' onClick={closeSideBar}>Blogs</Link>
                </li>
                <li className= 'navbar-items'>
                    <Link className='nav-links'  onClick={closeSideBar} onClick={resourcesActive}>Resources</Link>
                    {resourcesdrop && <Dropdata/>}
                    {/* {modal && <DropActive/>} */}
                </li>

                {notifyrendering()}
                {/* <li className= 'navbar-items'>
                    <Link className='nav-links' onClick={closeSideBar} onClick={NotifyDrop} ><NotificationsActiveIcon/> </Link>
                    {notify && <NotifyDropdown/>}
                </li> */}
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
