import {Route,Switch} from 'react-router-dom';
import DashBoard from './Components/Page/DashBoard';
import UpcomingEvent from './Components/Page/UpcomingEvent';
import MainNavigation from './Components/Layout/MainNavigation';
import Profile from './Components/Page/Profile';
import AllUsers from './Components/Page/AllUsers';
import TeamChat from './Components/Page/TeamChat';
import SetQuestions from './Components/Page/SetQuestions';
import Discussion from './Components/Page/Discussion'
import Leaderboard from './Components/Page/Leaderboard';
import EventForm from './Components/Forms/EventForm';
import LoginForm from './Components/Forms/LoginForm';
import SignupForm from './Components/Forms/SignupForm';
import ExecutiveChat from './Components/Chat Apps/ExecutiveChat';
import CoreChat from './Components/Chat Apps/CoreChat';
import FloatingBtn from './Components/Layout/FloatingBtn';
import SignupData from './Components/MainPage/SignupData';
import AuthContext from './Service/auth-context';
import {useContext} from 'react'
import AddEvent from './Components/Page/AddEvent';
import Polling from './Components/Page/Polling';
import PollCreate from './Components/Page/PollCreate';
import Blogs from './Components/Page/Blogs';
import WriteBlogs from './Components/Page/WriteBlogs';
import DisplayBlogs from './Components/Page/DisplayBlogs';
import EditBlog from './Components/Page/EditBlog';
import ViewAllPoll from './Components/Page/ViewAllPoll';


function App() {

  const authCtx = useContext(AuthContext)

  return (
    <div>
      {authCtx.isLoggedIn && <MainNavigation/>}
      {authCtx.isLoggedIn && <FloatingBtn/>}
      <Switch>
        {authCtx.isLoggedIn && <Route exact path='/Dashboard'>
          <DashBoard/>
        </Route>}
        {authCtx.isLoggedIn &&<Route exact path='/UpcomingEvent'>
          <UpcomingEvent/>
        </Route>}
        {authCtx.isLoggedIn &&<Route exact path='/Profile'>
          <Profile/>
        </Route>}
        {authCtx.isLoggedIn &&<Route exact path='/AddEvent'>
          <AddEvent/>
        </Route>}
        {authCtx.isLoggedIn &&<Route exact path='/WriteBlogs'>
          <WriteBlogs/>
        </Route>}
        {authCtx.isLoggedIn &&<Route exact path='/Polling'>
          <Polling/>
        </Route>}
        {authCtx.isLoggedIn &&<Route exact path='/ViewAllPoll'>
          <ViewAllPoll/>
        </Route>}
        {authCtx.isLoggedIn &&<Route exact path='/PollCreate'>
          <PollCreate/>
        </Route>}
        {authCtx.isLoggedIn && <Route exact path='/AllUsers'>
          <AllUsers/>
        </Route>}
        {authCtx.isLoggedIn && <Route exact path='/Blogs'>
          <Blogs/>
        </Route>}
        {authCtx.isLoggedIn && <Route exact path='/DisplayBlogs'>
          <DisplayBlogs/>
        </Route>}
        {authCtx.isLoggedIn && <Route exact path='/EditBlog'>
          <EditBlog/>
        </Route>}
        {!authCtx.isLoggedIn &&<Route exact path='/TeamChat'>
          <TeamChat/>
        </Route>}
        {authCtx.isLoggedIn &&<Route exact path='/SetQuestions'>
          <SetQuestions/>
        </Route>}
        {authCtx.isLoggedIn &&<Route exact path='/Discussion'>
          <Discussion/>
        </Route>}
        {authCtx.isLoggedIn &&<Route exact path='/Leaderboard'>
          <Leaderboard/>
        </Route>}
        {authCtx.isLoggedIn &&<Route exact path='/EventForm'>
          <EventForm/>
        </Route>}
         <Route exact path='/'>
          <LoginForm/>
        </Route>
        <Route exact path='/SignupData'>
          <SignupData/>
        </Route>
        {authCtx.isLoggedIn &&<Route exact path='/ExecutiveChat'>
          <ExecutiveChat/>
        </Route>}
        {authCtx.isLoggedIn &&<Route exact path='/CoreChat'>
          <CoreChat/>
        </Route>}
        <Route exact path='*'>
        <LoginForm/>
        </Route>
        
      </Switch>
    </div>
  );
}

export default App;
