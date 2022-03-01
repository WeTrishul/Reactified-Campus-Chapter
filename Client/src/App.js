import {Route,Switch} from 'react-router-dom';
import DashBoard from './Components/Page/DashBoard';
import Dashboard from './Components/Page/dashboard/Dashboard';
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
import Otherprofile from './Components/Page/profile/Otherprofile';
import Editprofile from './Components/Page/profile/Editprofile';
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
import AllEvents from "./Components/Page/AllEvents";
import EditEventPage from './Components/Page/EditEventPage';
import ViewQuestions from './Components/Page/ViewQuestions';
import SocketContext, { socket } from "../src/Service/socket";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import ViewResources from './Components/Page/ViewResources';
import Resources from './Components/Page/Resources';
import UploadResources from './Components/Page/UploadResources';
import ViewCategory from './Components/Page/ViewCategory';
import ViewFiles from './Components/Page/ViewFiles';
import DisplayPoll from './Components/Page/DisplayPoll'
import GlobalEvents from './Components/Page/GlobalEvents'
import Reports from './Components/Page/Reports';
import upComingEvents from "./Components/Page/AllEvents/UpComingEvents"
import Discuss from './Components/Page/Discussion/Discuss';
import Corechat from './Components/Chat Engine/Corechat';
import Executivechat from './Components/Chat Engine/Executivechat';
import Viewblogs from './Components/Page/Blogs/Viewblogs';
import Users from './Components/Page/All Users/Users';
import Leadersboard from './Components/Page/Leaders Board/Leadersboard';
import Userprofile from './Components/Page/profile/Userprofile';
import Resource from './Components/Page/resources/Resource';
import Setquestions from './Components/Page/set questions/Setquestions';
import UpComingEvents from './Components/Page/AllEvents/UpComingEvents';
import PollList from './Components/Page/polling/PollList';
import ResourceDisplay from "./Components/Page/resources/ResourceDisplay"
import Appbar from "./Components/Layout/Appbar"
import Apply from './Components/Forms/Apply';
import ResourceUpload from './Components/Page/resources/ResourceUpload';
import Viewfiles from './Components/Page/resources/Viewfiles';
import Viewquestions from './Components/Page/set questions/Viewquestions';

import Applications from './Components/Page/Application/Applications';
function App() {

  const authCtx = useContext(AuthContext)
  const username = authCtx.username
  const userid = authCtx.id
  const UserType = authCtx.usertype
  const [socket,setSocket] = useState(null);
  // const [socket2, setSocket2] = useState(null);

  const [user, setUser] = useState("");

  useEffect(() => {
    
    setSocket(io("http://localhost:7000"));
    // const socket = io("http://localhost:7000")
    // console.log(socket)


  
   
    // setSocket2(io("http://localhost:5000"))

  }, [authCtx.username]);

  // socket?.emit("join_room",{
  //   chatroom:username
  //   });
 
 

  useEffect(() => {

  // socket?.emit("join_room",{
  //   chatroom:username
  //   });
    

  //   // socket2?.emit("join_room",{
  //   //   username:authCtx.id,
  //   //   chatroom:'corenotification',
  //   //   chatbox : ''
  //   //   });
      
  // }, [socket, user]);
    if(authCtx.username && socket){
        socket?.emit("join_room", {
          chatroom: authCtx.username
        });


        socket?.emit('join_room',{
          username:authCtx.id,
          chatroom:'corenotification',
          chatbox : ''
      })
      socket?.emit('join_room',{
        username:authCtx.id,
        chatroom:'executivenotification',
        chatbox : ''
    })
        
    }
  }, [socket,authCtx.username]);

  // useEffect(() => {
  //   if(authCtx.id && socket2){
  //       socket2?.emit('join_room',{
  //         username:authCtx.id,
  //         chatroom:'corenotification',
  //         chatbox : ''
  //     })
  //   }
  // }, [socket2, authCtx.id]);


  return (
    <div>

{/* <SocketContext.Provider value={socket}>
<Blogs/> 
   </SocketContext.Provider> */}

      {authCtx.isLoggedIn && socket && <Appbar socket={socket} />}
      {authCtx.isLoggedIn && (UserType=='Admin' || UserType=='MediaLead' || UserType=='EventsLead' 
      || UserType=='Executive' )  && <FloatingBtn/>}
      <Switch>
        {/* {authCtx.isLoggedIn && socket && <Route exact path='/DashBoard'>
          <DashBoard socket={socket}/>
        </Route>} */}
        {authCtx.isLoggedIn && socket &&  <Route exact path='/UpcomingEvent'>
          <UpComingEvents  socket={socket}/>
        </Route>}
        {authCtx.isLoggedIn && <Route exact path='/Apply'>
          <Apply/>
        </Route>}
        {/* {authCtx.isLoggedIn && <Route exact path='/UpcomingEvent'>
          <upComingEvents/>
        </Route>} */}
        {authCtx.isLoggedIn && <Route exact path='/GlobalEvents/:platform'>
          <GlobalEvents/>
        </Route>}
        {authCtx.isLoggedIn && socket && <Route exact path='/AllEvents'>
          <AllEvents socket={socket}/>
        </Route>}
        {authCtx.isLoggedIn &&<Route exact path='/Dashboard'>
          <Dashboard/>
        </Route>}
        {authCtx.isLoggedIn && (UserType=='Admin' || UserType=='MediaLead' || UserType=='EventsLead') &&<Route exact path='/Reports'>
          <Reports/>
        </Route>}
        {/* {authCtx.isLoggedIn &&<Route exact path='/Profile'>
          <Profile/>
        </Route>} */}
        {authCtx.isLoggedIn &&<Route exact path='/Profile'>
          <Userprofile/>
        </Route>}
        {authCtx.isLoggedIn && (UserType=='Admin' || UserType=='MediaLead' || UserType=='EventsLead' || UserType=='Executive' ) && socket &&<Route exact path='/AddEvent'>
          <AddEvent socket={socket}/>
        </Route>}
        {authCtx.isLoggedIn && (UserType=='Admin' || UserType=='MediaLead' || UserType=='EventsLead' || UserType=='Executive' ) &&<Route exact path='/EditEventPage'>
          <EditEventPage/>
        </Route>}
        {authCtx.isLoggedIn &&<Route exact path='/WriteBlogs'>
          <WriteBlogs/>
        </Route>}
        {/* {authCtx.isLoggedIn &&<Route exact path='/Polling'>
          <Polling/>
        </Route>} */}
        {authCtx.isLoggedIn && (UserType=='Admin' || UserType=='MediaLead' || UserType=='EventsLead' ) &&<Route exact path='/Polling'>
          <PollList/>
        </Route>}
        {authCtx.isLoggedIn && (UserType=='Admin' || UserType=='MediaLead' || UserType=='EventsLead' ) &&<Route exact path='/ViewAllPoll'>
          <ViewAllPoll/>
        </Route>}
        {authCtx.isLoggedIn &&<Route exact path='/DisplayPoll/:pollID'>
          <DisplayPoll/>
        </Route>}
        {authCtx.isLoggedIn && (UserType=='Admin' || UserType=='MediaLead' || UserType=='EventsLead' ) &&<Route exact path='/PollCreate'>
          <PollCreate/>
        </Route>}
        {/* {authCtx.isLoggedIn && <Route exact path='/AllUsers'>
          <AllUsers/>
        </Route>} */}
        {authCtx.isLoggedIn && UserType=='Admin' && <Route exact path='/AllUsers'>
          <Users/>
        </Route>}
        {/* {authCtx.isLoggedIn && <Route exact path='/Blogs'>
          <Blogs/>
        </Route>} */}
        {authCtx.isLoggedIn && <Route exact path='/DisplayBlogs'>
          <DisplayBlogs/>
        </Route>}
        {authCtx.isLoggedIn && <Route exact path='/Blogs'>
          <Viewblogs/>
        </Route>}
        {authCtx.isLoggedIn && <Route exact path='/EditBlog'>
          <EditBlog/>
        </Route>}
        {/* {authCtx.isLoggedIn && <Route exact path='/EditProfile'>
        <Editprofile/>
        </Route>} */}
        {authCtx.isLoggedIn &&<Route exact path='/Otherprofile/:userkaname'>
        <Otherprofile/>
        </Route>}
        {authCtx.isLoggedIn && <Route exact path='/EditProfile'>
          <Editprofile/>
        </Route>}
        {authCtx.isLoggedIn && UserType=='Admin' && socket && <Route exact path='/Applications'>
          <Applications socket={socket}/>
        </Route>}
        {!authCtx.isLoggedIn &&<Route exact path='/TeamChat'>
          <TeamChat/>
        </Route>}
        {/* {authCtx.isLoggedIn &&<Route exact path='/SetQuestions'>
          <SetQuestions/>
        </Route>} */}
        {authCtx.isLoggedIn && (UserType=='Admin' || UserType=='MediaLead' || UserType=='EventsLead' || UserType=='Executive' || UserType=='QuestionSetter' ) &&<Route exact path='/SetQuestions'>
          <Setquestions/>
        </Route>}
 
        {authCtx.isLoggedIn && (UserType=='Admin' || UserType=='EventsLead' ) &&<Route exact path='/ViewQuestions/:userkaname'>
          <Viewquestions/>
        </Route>}
        {/* {authCtx.isLoggedIn &&<Route exact path='/ViewResources'>
          <ViewResources/>
        </Route>} */}
        {authCtx.isLoggedIn &&<Route exact path='/ViewResources'>
          <Resource/>
        </Route>}
        {/* {authCtx.isLoggedIn &&<Route exact path='/ViewFiles/:foldername'>
          <ViewFiles/>
        </Route>} */}
        {authCtx.isLoggedIn &&<Route exact path='/ViewFiles/:foldername'>
          <Viewfiles/>
        </Route>}
        {/* {authCtx.isLoggedIn &&<Route exact path='/Resources/:categoryname'>
          <Resources/>
        </Route>} */}
        {authCtx.isLoggedIn &&<Route exact path='/Resources/:categoryname'>
          <ResourceDisplay/>
        </Route>}
        {/* {authCtx.isLoggedIn &&<Route exact path='/UploadResources'>
          <UploadResources/>
        </Route>} */}
        {authCtx.isLoggedIn &&<Route exact path='/UploadResources'>
          <ResourceUpload/>
        </Route>}
        {authCtx.isLoggedIn &&<Route exact path='/ViewCategory/:categoryname'>
          <ViewCategory/>
        </Route>}
        {/* {authCtx.isLoggedIn && socket &&<Route exact path='/Discussion'>
          <Discussion socket={socket}/>
        </Route>} */}
        {authCtx.isLoggedIn && socket &&<Route exact path='/Discussion'>
          <Discuss socket={socket} />
        </Route>}
        {/* {authCtx.isLoggedIn &&<Route exact path='/Leaderboard'>
          <Leaderboard/>
        </Route>} */}
        {authCtx.isLoggedIn &&<Route exact path='/Leaderboard'>
          <Leadersboard/>
        </Route>}
        {authCtx.isLoggedIn && (UserType=='Admin' || UserType=='MediaLead' || UserType=='EventsLead' || UserType=='Executive' ) &&<Route exact path='/EventForm'>
          <EventForm/>
        </Route>}
         <Route exact path='/'>
          <LoginForm/>
        </Route>
        <Route exact path='/SignupData'>
          <SignupData/>
        </Route>
        {authCtx.isLoggedIn && (UserType=='Admin' || UserType=='MediaLead' || UserType=='EventsLead') && socket && <Route exact path='/Corechat'>
          <Corechat socket={socket}/>
        </Route>}
        {authCtx.isLoggedIn && (UserType=='Admin' || UserType=='MediaLead' || UserType=='EventsLead' || UserType=='Executive') && socket && <Route exact path='/Executivechat'>
          <Executivechat socket={socket} /> 
        </Route>}
        {/* {authCtx.isLoggedIn && socket &&<Route exact path='/ExecutiveChati'>
          <ExecutiveChat socket={socket}/>
        </Route>} */}
        {/* {authCtx.isLoggedIn && socket &&<Route exact path='/CoreChati'>
          <CoreChat socket={socket} />
        </Route>} */}
        <Route exact path='*'>
        <LoginForm/>
        </Route>
        
      </Switch>
    </div>
  );
}

export default App;
