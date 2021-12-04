import React from 'react';
import Carousel from '../Slider/Carousel';
import './DashBoard.css';
import { CarouselData } from '../Slider/CarouselData';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import AuthContext from '../../Service/auth-context';
import { useContext } from 'react';
import * as noti from '../../Service/socket';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Link } from 'react-router-dom';

function DashBoard(props) {
  const authCtx = useContext(AuthContext);
  let userId = authCtx.id;
  let userName = authCtx.username;
  let usertype = authCtx.usertype;
  let history = useHistory();
  let location = useLocation();
  let Flag = '1';

  const [blogs, setBlogs] = useState([]);
  const [events, setEvents] = useState([]);
  const [current, setCurrent] = useState(0);
  const [posts, setPosts] = useState([]);
  const [banner, setBanner] = useState([]);

  // useEffect(() =>{
  //     console.log(Flag)

  //     if(Flag=='1')
  //     {
  //         Flag='0';
  //         window.location.reload();
  //     }

  // },[])

  useEffect(() => {
    //    window.location.reload();
    history.push('/Dashboard');

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
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/dashboard',
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        setBlogs(data.data.blogs);
        setEvents(data.data.events);
        setCurrent(data.data.events.length);
        setBanner(data.data.events.eventbanner);
        setPosts(data.data.posts);
        //     // console.log(data)
      });
  }, []);

  const [val, setVal] = useState(0);

  const lastSlide = () => {
    setVal(val === current - 1 ? 0 : val + 1);
    console.log(val);
    console.log(current);
  };

  const nextSlide = () => {
    setVal(val === 0 ? current - 1 : val - 1);
    console.log(val);
    console.log(current);
  };

  // console.log(data)

  return (
    <div>
      <div className='image-slider'>
        <div>
          <div className='outer-slider-box'>
            <div className='slider'>
              <ChevronLeftIcon className='left-arrow' onClick={lastSlide} />
              <ChevronRightIcon className='right-arrow' onClick={nextSlide} />
              {banner &&
                banner.map((slide, index) => {
                  return (
                    <div
                      className={index === val ? 'slide-active' : 'slide'}
                      key={index}
                    >
                      {index === val && (
                        <img
                          src={'http://localhost:3000' + slide.image}
                          className='img-image'
                        />
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      <div className='main-work'>
        <div className='events-content'>
          <h2 style={{ textAlign: 'center', paddingBottom: '20px' }}>Events</h2>
          {events.map((data) => {
            return (
              <div
                style={{
                  textAlign: 'left',
                  paddingLeft: '80px',
                  paddingBottom: '3px',
                }}
                className='eventsData'
                key={data._id}
              >
                <Link
                  to='/UpcomingEvent'
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  <h4> {data.eventname}</h4>
                </Link>
              </div>
            );
          })}
        </div>
        <div className='announce'>
          <h2>Announcement</h2>
          {userId}
          {userName}
          {usertype}
          {current}
        </div>
        <div className='blogs-section'>
          <h2 style={{ textAlign: 'center', paddingBottom: '20px' }}>
            Recent Blogs
          </h2>
          {blogs.map((data) => {
            return (
              <div
                style={{
                  textAlign: 'left',
                  paddingLeft: '50px',
                  paddingBottom: '3px',
                }}
                className='blogsData'
                key={data._id}
              >
                <Link
                  style={{ textDecoration: 'none', color: 'black' }}
                  to='/blogs'
                >
                  <h4>{data.title}</h4>
                </Link>
              </div>
            );
          })}
        </div>

        <div className='advertise'>G-Ads</div>
        <div className='discussion'>
          <h2 style={{ textAlign: 'center', paddingBottom: '20px' }}>
            Recent Discussion
          </h2>
          {posts.map((data) => {
            return (
              <div
                style={{
                  textAlign: 'left',
                  paddingLeft: '80px',
                  paddingBottom: '3px',
                }}
                className='discussionData'
                key={data._id}
              >
                <Link
                  style={{ textDecoration: 'none', color: 'white' }}
                  to='/Discussion'
                >
                  <h4>{data.postBody}</h4>
                </Link>
              </div>
            );
          })}
        </div>
        <div className='empty-space'></div>
      </div>
    </div>
  );
}

export default DashBoard;
