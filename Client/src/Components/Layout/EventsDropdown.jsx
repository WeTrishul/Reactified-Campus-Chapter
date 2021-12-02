import React from 'react';
import { Link } from 'react-router-dom';
import './Dropdown.css';

function EventsDropdown() {
  return (
    <div className='dropdown' style={{ float: 'right' }}>
      {/* <div className="dropdown-btn"><AccountCircleRoundedIcon/></div> */}
      <div className='Eventsdropdown-content'>
        <div className='Eventsdropdown-item'>
          <Link className='DropEditProfile' to='/UpcomingEvent'>
            CollegeEvents
          </Link>
        </div>
        <div className='dropdown-item'>
          <Link className='DropProfile' to='/GlobalEvents/CodeForces'>
            Codeforces
          </Link>
        </div>
        <div className='dropdown-item'>
          <Link className='DropEditProfile' to='/GlobalEvents/CodeChef'>
            Codechef
          </Link>
        </div>
        <div className='dropdown-item'>
          <Link className='DropApply' to='/GlobalEvents/HackerRank'>
            HackerRank
          </Link>
        </div>
        <div className='dropdown-item'>
          <Link className='DropApply' to='/GlobalEvents/GeeksForGeeks'>
            GeeksforGeeks
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventsDropdown;
