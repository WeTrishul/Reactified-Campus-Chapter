import React from 'react';
import './Dropdown.css';
import { Link } from 'react-router-dom';

function NotifyDropdown({ notifications }) {
  return (
    <div className='dropdown' style={{ float: 'right' }}>
      {/* <div className="dropdown-btn"><AccountCircleRoundedIcon/></div> */}
      <div className='notifydropdown-content'>
        <div className='notifydropdown-item'>
          {notifications.map((value, index) => {
            return (
              <div className='notify-content' key={index}>
                <Link to={'' + value.placetogo}>{value.msg}</Link>
                <hr className='notify-border' />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default NotifyDropdown;
