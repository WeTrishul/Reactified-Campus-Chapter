import {Link} from 'react-router-dom';
import './HomeNavigation.css';
function HomeNavigation()
{
    return(
        <div>
            <nav className='navbar'>
        <ul className='navbar-ul'>
            <li className='navbar-ul-li'>
                <Link className='navbar-ul-li-a' to='/'>DashBoard</Link>
            </li>
            <li className='navbar-ul-li'>
                <Link className='navbar-ul-li-a' to='/UpcomingEvent'>Upcoming Event</Link>
            </li>
            <li className='navbar-ul-li' >
                <Link className='navbar-ul-li-a' to='/Profile'>Profile</Link>
            </li>
            <li className='navbar-ul-li'>
                <Link className='navbar-ul-li-a' to='/AllUsers'>All Users</Link>
            </li>
            <li className='navbar-ul-li'>
                <Link className='navbar-ul-li-a' to='/TeamChat'>Team Chat</Link>
            </li>
            <li className='navbar-ul-li'>
                <Link className='navbar-ul-li-a' to='/SetQuestions'>Set Questions</Link>
            </li>
            <li className='navbar-ul-li'>
                <Link className='navbar-ul-li-a' to='/Discussion'>Discussion</Link>
            </li>
            <li className='navbar-ul-li'>
                <Link className='navbar-ul-li-a' to='/SignupForm'>Leaderboards</Link>
            </li>
            <li className='navbar-ul-li'>
                <Link className='navbar-ul-li-a' to='/LoginForm'>LogOut</Link>
            </li>
            
        </ul>
        </nav>
        <div className="bck"></div>
        </div>

    );
}

export default HomeNavigation;