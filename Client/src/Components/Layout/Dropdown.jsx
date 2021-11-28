import React from 'react';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import './Dropdown.css';
import { useContext } from 'react';
import AuthContext from '../../Service/auth-context';
import { useHistory } from 'react-router';
import {Link} from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import WorkIcon from '@mui/icons-material/Work';
import LogoutIcon from '@mui/icons-material/Logout';

function Dropdown() {


    const authCtx = useContext(AuthContext)


    let history = useHistory();

    const logoutHandler = () =>{
        authCtx.logout();
        history.push('/');
    }

    
    return (
        <div className='dropdown' style={{float:"right"}}>
            {/* <div className="dropdown-btn"><AccountCircleRoundedIcon/></div> */}
            <div className="dropdown-content">
                <div className="dropdown-item">
                    
                <span><PersonIcon/></span>
                    <Link className="DropProfile" to="Profile">Profile</Link>
                </div>
                <div className="dropdown-item">
                <span><AppRegistrationIcon/></span>
                    <Link className="DropEditProfile" to="EditProfile">Edit Profile</Link>
                </div>
                <div  className="dropdown-item">
                <span><WorkIcon/></span>
                    <Link className="DropApply" to="Apply">Apply</Link>
                </div>
                <div onClick={logoutHandler} style={{paddingLeft:"10px"}} className="dropdown-item"> 
                     <span style={{paddingLeft:"10px"}} ><LogoutIcon/>  </span>Logout
                </div>
                
            </div>
        </div>
    )
}

export default Dropdown
