import React from 'react';
import './Dashboard.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AuthContext from '../../../Service/auth-context';
import { useContext } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupsIcon from '@mui/icons-material/Groups';
import ReplyIcon from '@mui/icons-material/Reply';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Carousel from 'react-elastic-carousel';
import Card from '@mui/material/Card';
import ReplySharpIcon from '@mui/icons-material/ReplySharp';
import CampaignIcon from '@mui/icons-material/Campaign';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import HomeImage from '../../Images/HomeImage.jpg';
import Axios from 'axios';
import CommentBankIcon from '@mui/icons-material/CommentBank';

function Dashboard() {
  const authCtx = useContext(AuthContext);
  let userId = authCtx.id;
  let userName = authCtx.username;
  let usertype = authCtx.usertype;
  let history = useHistory();

  const [blogs, setBlogs] = useState([]);
  const [events, setEvents] = useState([]);
  const [current, setCurrent] = useState(0);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    borderRadius: '20px',
    color: theme.palette.text.secondary,
  }));

  const items = [
    {
      id: 1,
      title: 'item #1',
      desc: 'Hyy I am anand',
      like: '100',
      date: '2:30 AM | 02/01/2021',
    },
    {
      id: 2,
      title: 'item #2',
      desc: 'Hyy I am shivam',
      like: '101',
      date: '2:30 AM | 02/01/2021',
    },
    {
      id: 3,
      title: 'item #3',
      desc: 'Hyy I am harikesh',
      like: '102',
      date: '2:30 AM | 02/01/2021',
    },
    {
      id: 4,
      title: 'item #4',
      desc: 'Hyy I am rajeev',
      like: '103',
      date: '2:30 AM | 02/01/2021',
    },
    {
      id: 5,
      title: 'item #5',
      desc: 'Hyy I am darshan',
      like: '104',
      date: '2:30 AM | 02/01/2021',
    },
  ];

  const breakpoints = [
    {
      width: 500,
      itemsToShow: 1,
    },
    {
      width: 768,
      itemsToShow: 2,
    },
    {
      width: 1200,
      itemsToShow: 2,
    },
    {
      width: 1500,
      itemsToShow: 3,
    },
  ];

  useEffect(() => {
    history.push('/Dashboard');

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

        setPosts(data.data.posts);
        setIsLoading(false);
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

  const dashBoardEventsRendering = (element) => {
    if (window.innerWidth <= 431) {
      return (
        <Box>
          <Box>
            <Box sx={{ width: 1 }}>
              <Box display='grid' gridTemplateColumns='repeat(12, 1fr)' gap={2}>
                <Box gridColumn='span 12'>
                  <Item sx={{ height: 'auto' }}>
                    <Box sx={{ display: 'flex' }}>
                      <Box>
                        <GroupsIcon sx={{ fontSize: '30px' }} />
                      </Box>
                      <Box sx={{ marginLeft: '2px' }}>
                        {element.Registeredusers.length}
                      </Box>
                      {/* <Box sx={{ display: 'flex', marginLeft: '60px' }}>
                        <Box>
                          <EditIcon />
                        </Box>
                        <Box sx={{ marginLeft: '20px' }}>
                          <DeleteIcon />
                        </Box>
                        <Box sx={{ marginLeft: '20px' }}>
                          <ReplyIcon />
                        </Box>
                      </Box> */}
                    </Box>
                    <Box sx={{ width: '100%' }}>
                      <img
                        style={{
                          width: '100%',
                          height: '200px',
                          borderRadius: '20px',
                        }}
                        src={'http://localhost:3000' + element.eventbanner}
                        alt=''
                      />
                    </Box>
                    <Box>
                      <Typography
                        sx={{ fontWeight: '600', fontSize: '15px' }}
                        variant='h7'
                      >
                        {element.eventname}
                      </Typography>
                    </Box>
                    <Box sx={{ fontSize: '10px' }}>
                      College Event |{' '}
                      <AccessTimeFilledIcon sx={{ paddingTop: '8px' }} />{' '}
                      {element.eventStartTime}-{element.eventEndTime}
                    </Box>
                    <Box
                      sx={{
                        marginTop: '20px',
                        textAlign: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Button variant='contained' color='success'>
                        Events
                      </Button>
                    </Box>
                  </Item>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      );
    } else if (window.innerWidth >= 431 && window.innerWidth < 768) {
      return (
        <Box>
          <Box sx={{ width: 1, marginTop: '1rem' }}>
            <Box display='grid' gridTemplateColumns='repeat(12, 1fr)' gap={2}>
              <Box gridColumn='span 12'>
                <Item sx={{ height: 'auto' }}>
                  <Box sx={{ display: 'flex' }}>
                    <Box sx={{ maxWidth: '30%' }}>
                      <img
                        style={{
                          width: '100%',
                          height: '140px',
                          borderRadius: '20px',
                        }}
                        src={'http://localhost:3000' + element.eventbanner}
                        alt=''
                      />
                    </Box>
                    <Box sx={{ width: '50%' }}>
                      <Box sx={{ marginLeft: '20px' }}>
                        <Box>
                          <Typography sx={{ fontWeight: '600' }} variant='h7'>
                            {element.eventname}
                          </Typography>
                        </Box>
                        <Box>
                          College Event |{' '}
                          <AccessTimeFilledIcon sx={{ paddingTop: '8px' }} />{' '}
                          {element.eventStartTime}-{element.eventEndTime}
                        </Box>

                        <Box sx={{ marginTop: '5px' }}>
                          <Box>Starts {element.eventDate} </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ marginLeft: '20px' }}>
                      <Box sx={{ display: 'flex', marginLeft: '30px' }}>
                        <Box>
                          <GroupsIcon sx={{ fontSize: '30px' }} />
                        </Box>
                        <Box sx={{ marginLeft: '2px' }}>
                          {element.Registeredusers.length}
                        </Box>
                      </Box>
                      <Box sx={{ marginTop: '20px' }}>
                        {/* <Box sx={{ display: 'flex' }}>
                          <Box>
                            <EditIcon />
                          </Box>
                          <Box sx={{ marginLeft: '20px' }}>
                            <DeleteIcon />
                          </Box>
                          <Box sx={{ marginLeft: '20px' }}>
                            <ReplyIcon />
                          </Box>
                        </Box> */}
                      </Box>
                      <Box sx={{ marginTop: '20px' }}>
                        <Button variant='contained' color='success'>
                          Events
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Item>
              </Box>
            </Box>
          </Box>
        </Box>
      );
    } else if (window.innerWidth >= 768 && window.innerWidth < 1000) {
      return (
        <Box>
          <Box sx={{ width: 1, marginTop: '1rem' }}>
            <Box display='grid' gridTemplateColumns='repeat(12, 1fr)' gap={2}>
              <Box gridColumn='span 12'>
                <Item sx={{ height: 'auto' }}>
                  <Box sx={{ display: 'flex' }}>
                    <Box sx={{ maxWidth: '30%' }}>
                      <img
                        style={{
                          width: '100%',
                          height: '140px',
                          borderRadius: '20px',
                        }}
                        src={'http://localhost:3000' + element.eventbanner}
                        alt=''
                      />
                    </Box>
                    <Box sx={{ width: '50%' }}>
                      <Box sx={{ marginLeft: '20px' }}>
                        <Box>
                          <Typography sx={{ fontWeight: '600' }} variant='h6'>
                            {element.eventname}
                          </Typography>
                        </Box>
                        <Box>
                          COLLEGE EVENT |{' '}
                          <AccessTimeFilledIcon sx={{ paddingTop: '8px' }} />{' '}
                          {element.eventStartTime}-{element.eventEndTime}
                        </Box>

                        <Box sx={{ marginTop: '10px' }}>
                          <Box>
                            Starts {element.eventDate}{' '}
                            <AccessTimeFilledIcon sx={{ paddingTop: '8px' }} />
                            {element.eventStartTime}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ marginLeft: '20px' }}>
                      <Box sx={{ display: 'flex', marginLeft: '30px' }}>
                        <Box>
                          <GroupsIcon sx={{ fontSize: '30px' }} />
                        </Box>
                        <Box sx={{ marginLeft: '2px' }}>
                          {element.Registeredusers.length}
                        </Box>
                      </Box>
                      <Box sx={{ marginTop: '20px' }}>
                        {/* <Box sx={{ display: 'flex' }}>
                          <Box>
                            <EditIcon />
                          </Box>
                          <Box sx={{ marginLeft: '20px' }}>
                            <DeleteIcon />
                          </Box>
                          <Box sx={{ marginLeft: '20px' }}>
                            <ReplyIcon />
                          </Box>
                        </Box> */}
                      </Box>
                      <Box sx={{ marginTop: '20px' }}>
                        <Button variant='contained' color='success'>
                          Events
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Item>
              </Box>
            </Box>
          </Box>
        </Box>
      );
    } else if (window.innerWidth > 1000) {
      return (
        <Box>
          <Box sx={{ width: 1, marginTop: '1rem' }}>
            <Box display='grid' gridTemplateColumns='repeat(12, 1fr)' gap={2}>
              <Box gridColumn='span 12'>
                <Item sx={{ height: 'auto' }}>
                  <Box sx={{ display: 'flex' }}>
                    <Box sx={{ maxWidth: '20%' }}>
                      <img
                        style={{
                          width: '100%',
                          height: '165px',
                          borderRadius: '20px',
                        }}
                        src={'http://localhost:3000' + element.eventbanner}
                        alt=''
                      />
                    </Box>
                    <Box sx={{ width: '60%' }}>
                      <Box sx={{ marginLeft: '20px' }}>
                        <Box>
                          <Typography sx={{ fontWeight: '600' }} variant='h6'>
                            {element.eventname}
                          </Typography>
                        </Box>
                        <Box>
                          COLLEGE EVENT |{' '}
                          <AccessTimeFilledIcon sx={{ paddingTop: '8px' }} />{' '}
                          {element.eventStartTime}-{element.eventEndTime}
                        </Box>
                        <Box sx={{ marginTop: '10px' }}>
                          {element.aboutevent}
                        </Box>
                        <Box sx={{ marginTop: '5px' }}>
                          <Box>
                            Starts {element.eventDate}{' '}
                            <AccessTimeFilledIcon sx={{ paddingTop: '8px' }} />
                            {element.eventStartTime}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ marginLeft: '20px' }}>
                      <Box sx={{ display: 'flex', marginLeft: '30px' }}>
                        <Box>
                          <GroupsIcon sx={{ fontSize: '30px' }} />
                        </Box>
                        <Box sx={{ marginLeft: '2px' }}>
                          {element.Registeredusers.length}
                        </Box>
                      </Box>
                      <Box sx={{ marginTop: '20px' }}>
                        {/* <Box sx={{ display: 'flex' }}>
                          <Box>
                            <EditIcon />
                          </Box>
                          <Box sx={{ marginLeft: '20px' }}>
                            <DeleteIcon />
                          </Box>
                          <Box sx={{ marginLeft: '20px' }}>
                            <ReplyIcon />
                          </Box>
                        </Box> */}
                      </Box>
                      <Box sx={{ marginTop: '20px' }}>
                        <Button variant='contained' color='success'>
                          Events
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Item>
              </Box>
            </Box>
          </Box>
        </Box>
      );
    }
  };
  return (
    <div>
      <div className='body-outer-Box'>
        <div className='dashBoard-outer-Box'>
          <div className='dashBoard-inner-Box'>
            <div className='dashBoard-image-slider'>
              <div className='image-slider'>
                <div>
                  <div className='outer-slider-box'>
                    <div className='slider'>
                      <ChevronLeftIcon
                        className='left-arrow'
                        onClick={lastSlide}
                      />
                      <ChevronRightIcon
                        className='right-arrow'
                        onClick={nextSlide}
                      />
                      {events &&
                        events.map((slide, index) => {
                          return (
                            <div
                              className={
                                index === val ? 'slide-active' : 'slide'
                              }
                              key={index}
                            >
                              {index === val && (
                                <img
                                  src={
                                    'http://localhost:3000' + slide.eventbanner
                                  }
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
            </div>

            <div className='dashBoard-Events-section'>
              <div className='dashBoard-events-heading'>
                <h2>Upcoming Events</h2>
                <hr className='Events-horizontal-line' />
              </div>
              {events &&
                events.map((element) => {
                  return (
                    <div className='dashBoard-Events-Content'>
                      {dashBoardEventsRendering(element)}
                    </div>
                  );
                })}
            </div>
            <div className='dashBoardAnnouncementHeading'>
              <h2>
                <u>ANNOUNCEMENTS :</u>
              </h2>
            </div>
            <div className='dashboardAnnouncementCarousel'>
              <Carousel breakPoints={breakpoints}>
                {items.map((item) => {
                  return (
                    <Card
                      sx={{
                        width: '100%',
                        height: 'auto',
                        display: 'flex',
                        marginLeft: '10px',

                        marginRight: '10px',
                        borderRadius: '20px',
                      }}
                      className='dashboard-Cards'
                      key={item.id}
                    >
                      <div className='AnnouncementCarouselDesign'>
                        <div className='announcementHeading'>
                          <span>
                            <CampaignIcon />
                          </span>
                          <span
                            className='dashBoardAnncouncement-Heading'
                            style={{ textAlign: 'center' }}
                          >
                            <h2>
                              <u>{item.title}</u>
                            </h2>
                          </span>
                        </div>
                        <div className='announcementDescription'>
                          {item.desc}
                        </div>
                        <div className='announcementDateandTime'>
                          {item.date}
                        </div>
                        <div className='announcementLikeandShare'>
                          <span>
                            <FavoriteBorderIcon />
                          </span>
                          <span>{item.like}</span>
                          <span style={{ float: 'right' }}>
                            <ReplySharpIcon />
                          </span>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </Carousel>
            </div>
            <div className='recentBlogsHeading'>
              <h2>
                <u>RECENT BLOGS :</u>
              </h2>
            </div>
            <div className='dashBoardBlogsCarousel'>
              <Carousel breakPoints={breakpoints}>
                {blogs &&
                  blogs.map((item) => {
                    return (
                      <Card
                        sx={{ width: '100%', height: 'auto' }}
                        className='dashBoard-cards-second'
                        key={item.id}
                      >
                        <div className='recentBlogsCarouselDesign'>
                          <div
                            className='blogsHeading'
                            style={{
                              marginTop: '2rem',
                            }}
                          >
                            <span style={{ fontWeight: '800' }}>
                              <u>{item.title}</u>
                            </span>
                            <span style={{ float: 'right', fontWeight: '700' }}>
                              <AccessTimeFilledIcon />1 hr ago
                            </span>
                          </div>
                          <div className='blogsDescription'>{item.desc}</div>
                          <div className='blogsLines'>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Illum, facere!
                          </div>
                          <div className='blogsUserName'>
                            <div style={{ marginLeft: '1rem' }}>
                              <span>
                                <AccountCircleSharpIcon />
                              </span>
                              <span>By Anand </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
              </Carousel>
            </div>
            <div className='recentDiscussionHeading'>
              <h2>
                <u>RECENT DISCUSSION :</u>
              </h2>
            </div>
            <div className='dashBoardDiscussionCarousel'>
              <Carousel breakPoints={breakpoints}>
                {posts &&
                  posts.map((item) => {
                    return (
                      <Card
                        sx={{ width: '100%', height: 'auto' }}
                        className='dashBoard-cards-second'
                        key={item.id}
                      >
                        <div className='recentDiscussionCarouselDesign'>
                          <div
                            className='dashboardDiscussionHeading'
                            style={{
                              marginTop: '2rem',
                              textAlign: 'center',
                            }}
                          >
                            <h2>{item.title}</h2>
                          </div>
                          <div
                            style={{ display: 'flex' }}
                            className='dashBoardDiscussionUserDetails'
                          >
                            <div
                              style={{ width: '50px' }}
                              className='dashBoard-Discussion-Image-Container'
                            >
                              <img
                                style={{
                                  width: '100%',
                                  height: '50px',
                                  borderRadius: '50%',
                                }}
                                src={HomeImage}
                                alt=''
                              />
                            </div>
                            <div
                              style={{
                                fontWeight: '700',
                                paddingTop: '10px',
                                marginLeft: '1rem',
                              }}
                              className='dashBoard-Discussion-UserName'
                            >
                              {item.userid.name}
                            </div>
                          </div>
                          <div className='discussionContent'>
                            {item.postBody}{' '}
                          </div>
                          <div className='discussionCommentCount'>
                            <div style={{ float: 'right' }}>
                              <CommentBankIcon />
                              {item.comments.length}
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
