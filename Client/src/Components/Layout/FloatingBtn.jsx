import React from 'react'
import AddIcon from '@material-ui/icons/Add';
import ChatIcon from '@material-ui/icons/Chat';
import GroupIcon from '@material-ui/icons/Group';
import HelpIcon from '@material-ui/icons/Help';
import { Link } from 'react-router-dom';
import './FloatingBtn.css';


function FloatingBtn() {

    
    return (
        <div>
            <div className="fab-container">
                <div className="fab fab-holder">
                    <i className="add-icon"><AddIcon/></i>
                </div>

                <ul className="icon-option">
                    <li>
                    <span className='myname'>All User</span>
                        <div className="fab-holder">
                           <Link to='/AllUsers'><i  className="add-icon"><GroupIcon/></i></Link> 
                        </div>
                    </li>
                    <li>
                    <span className='myname'>Core Chat</span>
                        <div className="fab-holder">
                            <Link to='/CoreChat'><i className="add-icon"><ChatIcon/></i></Link>
                        </div>
                    </li>
                    <li>
                    <span className='myname'>Executive Chat</span>
                        <div className="fab-holder">
                            <Link to='/ExecutiveChat'><i className="add-icon"><ChatIcon/></i></Link>
                        </div>
                    </li>
                    <li>
                    <span className='myname'>Set Question</span>
                        <div className="fab-holder">
                            <Link to='/SetQuestions'><i className="add-icon"><HelpIcon/></i></Link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default FloatingBtn
