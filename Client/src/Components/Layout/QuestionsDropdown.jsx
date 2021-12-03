import React from 'react';
import './Dropdown.css';
import { Link } from 'react-router-dom';

function QuestionsDropdown(props) {
  return (
    <div className='dropdown' style={{ float: 'right' }}>
      {/* <div className="dropdown-btn"><AccountCircleRoundedIcon/></div> */}
      <div className='Questiondropdown-content'>
        <div className='Questiondropdown-item'>
          <Link
            onClick={() => props.data()}
            className='DropEditProfile'
            to='/SetQuestions'
          >
            Upload Question
          </Link>
        </div>
        <div className='Questiondropdown-item'>
          <Link
            onClick={() => props.data()}
            className='DropProfile'
            to='/ViewQuestions'
          >
            View Question
          </Link>
        </div>
      </div>
    </div>
  );
}

export default QuestionsDropdown;
