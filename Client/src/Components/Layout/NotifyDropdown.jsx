import React from 'react';
import './Dropdown.css';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';

function NotifyDropdown({ notifications }) {
  return (
    <div className='notification-Dropdown' style={{ float: 'right' }}>
      {/* <div className="dropdown-btn"><AccountCircleRoundedIcon/></div> */}
      <div className='notifydropdown-content'>
        <div className='notifydropdown-item'>
          {notifications.map((value, index) => {
            return (
              <div className='notify-content' key={index}>
                <Card
                  sx={{
                    width: '100%',
                    minHeight: '2rem',
                    padding: '10px',
                    marginBottom: '1px',
                  }}

                   onClick={() => window.location.replace(value.placetogo)}
                >
                  {/*<Link
                    style={{ color: 'black', textDecoration: 'none' }}
                    to={'' + value.placetogo}
                  >*/}
                    {value.msg}
                  {/*</Link>*/}
                </Card>
                {/* <hr className='notify-border' /> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default NotifyDropdown;
