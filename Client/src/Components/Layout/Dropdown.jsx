import React from 'react';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import './Dropdown.css';
import { useContext } from 'react';
import AuthContext from '../../Service/auth-context';
import { useHistory } from 'react-router';
import {Link} from 'react-router-dom'

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
                    <Link to="Profile">Profile</Link>
                </div>
                <div className="dropdown-item">
                    <Link to="EditProfile">Edit Profile</Link>
                </div>
                <div className="dropdown-item">
                    <Link to="Apply">Apply</Link>
                </div>
                <div onClick={logoutHandler} className="dropdown-item"> 
                    Logout
                </div>
            </div>
        </div>
    )
}

export default Dropdown
