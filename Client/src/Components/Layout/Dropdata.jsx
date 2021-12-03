import React from 'react';
import './Dropdown.css';
import { Link } from 'react-router-dom';

function Dropdata(props) {
  return (
    <div className='dropdown' style={{ float: 'right' }}>
      {/* <div className="dropdown-btn"><AccountCircleRoundedIcon/></div> */}
      <div className='Resourcesdropdown-content'>
        <div className='Resourcesdropdown-item'>
          <Link
            onClick={() => {
              props.data();
            }}
            className='DropEditProfile'
            to='/UploadResources'
          >
            Upload Resources
          </Link>
        </div>
        <div className='Resourcesdropdown-item'>
          <Link
            onClick={() => {
              props.data();
            }}
            className='DropProfile'
            to='/ViewResources'
          >
            View Resources
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dropdata;
