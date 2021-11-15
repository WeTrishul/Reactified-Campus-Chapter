import React from 'react';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import './Dropdown.css';

function Dropdown() {

    
    return (
        <div className='dropdown' style={{float:"right"}}>
            <div className="dropdown-btn"><AccountCircleRoundedIcon/></div>
            <div className="dropdown-content">
                <div className="dropdown-item">
                    Profile
                </div>
                <div className="dropdown-item">
                    Edit Profile
                </div>
                <div className="dropdown-item">
                    Apply
                </div>
                <div className="dropdown-item">
                    Logout
                </div>
            </div>
        </div>
    )
}

export default Dropdown
