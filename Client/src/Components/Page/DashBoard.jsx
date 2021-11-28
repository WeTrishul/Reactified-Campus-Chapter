
import React from 'react'
import Carousel from '../Slider/Carousel';
import './DashBoard.css';
import { CarouselData } from '../Slider/CarouselData';
import {useState, useEffect} from 'react';
import Axios from 'axios';
import AuthContext from '../../Service/auth-context';
import { useContext } from 'react';
import * as noti from "../../Service/socket";
import {useHistory} from "react-router-dom"
import {useLocation} from 'react-router-dom';

function DashBoard(props) {


    const authCtx=useContext(AuthContext)
    let userId=authCtx.id;
    let userName = authCtx.username;
    let history =useHistory();
    let location = useLocation();
    let Flag = '1'

    const [blogs,setBlogs] = useState([]);
    const [events,setEvents] = useState([]);
    const[posts,setPosts] = useState([]);

    // useEffect(() =>{
    //     console.log(Flag)

    //     if(Flag=='1')
    //     {
    //         Flag='0';
    //         window.location.reload();
    //     }

    // },[])

    useEffect(() =>{

    //    window.location.reload();
        history.push("/Dashboard")


        // axios.get('http://localhost:3000/dashboard')
        // .then(response => {
        //     return response.data
        // }).then(data =>{
        //     console.log(data)
        //     setBlogs(data.data.blogs)
        //     setEvents(data.data.events)
        //     setPosts(data.data.posts)
        // });


        Axios({
            method: "GET",
            
            withCredentials: true,
            url: "http://localhost:3000/dashboard",
          }).then((response) =>{
          
                  return response.data
                  
              })
          .then(data =>{
            console.log(data)
                setBlogs(data.data.blogs)
                setEvents(data.data.events)
                setPosts(data.data.posts)
              //     // console.log(data)
              });







    },[])


     
    // console.log(data)

    return (
        <div>
            <div className="image-slider">
                <Carousel slides={CarouselData}/>
            </div>

            
            <div className="main-work">
                <div className="events-content">
                  
                   <h3>Events</h3>
                   {events.map((data) =>{
                       return(
                           <div className="eventsData" key={data._id}>
                               {data.eventname }
                           </div>
                       )
                   })}
                   
                   
                </div>
                <div className="announce">
                    <h3>Announcement</h3>
                    {userId}
                    {userName}
                    
                   
                </div>
                <div className="blogs-section">
                    <h3>Recent Blogs</h3>
                    {blogs.map((data) =>{
                       return(
                           <div className="blogsData" key={data._id}>
                               {data.title }
                           </div>
                       )
                   })}
                </div>

                <div className="advertise">G-Ads
                </div>
                <div className="discussion">
                    <h3>Recent Discussion</h3>
                    {posts.map((data) =>{
                       return(
                           <div className="discussionData" key={data._id}>
                               {data.postBody }
                           </div>
                       )
                   })}
                    
                </div>
                <div className="empty-space"></div>
                
                
            </div>
            
        </div>

    )
}

export default DashBoard
