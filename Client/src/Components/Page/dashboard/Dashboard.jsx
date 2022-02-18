import React from 'react';
import './Dashboard.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
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
  let history = useHistory();

  const [blogs, setBlogs] = useState([]);
  const [events, setEvents] = useState([]);
  const [current, setCurrent] = useState(0);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(5),
    // textAlign: 'center',

    borderRadius: '30px',
    color: theme.palette.text.primary,
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
                      {events.map((slide, index) => {
                        return (
                          <div
                            className={index === val ? 'slide-active' : 'slide'}
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
              <div className='dashBoard-Events-Content'>
                <Box sx={{ flexGrow: 1, marginBottom: '2rem' }}>
                  <Grid container spacing={2}>
                    <Grid style={{ width: '100%' }}>
                      <Item>
                        <div className='v1'></div>
                        <Box>
                          STARTS ON
                          <span className='dashBoardEventsHeading'>
                            <u>UPCOMING EVENTS HEADING</u>
                          </span>
                        </Box>
                        <Box>06</Box>
                        <Box>
                          {/* <span>06,</span> */}
                          February
                          <span className='dashBoardContestDivider'></span>
                          <span className='dashBoardContestTiming'>
                            CONTEST
                          </span>
                          {/* <AccessTimeFilledIcon
                            style={{ marginLeft: '3rem' }}
                          /> */}
                          <span className='contestTimimg'>
                            <AccessTimeFilledIcon
                              style={{ paddingTop: '8px' }}
                            />
                            08:00 PM IST
                          </span>
                          <span className='dashBoardRegisterButton'>
                            REGISTER HERE
                            <ArrowForwardIcon
                              style={{
                                marginLeft: '0.5rem',
                                paddingTop: '6px',
                              }}
                            />
                          </span>
                        </Box>
                        {/* <AccessTimeFilledIcon style={{ marginLeft: '14rem' }} /> */}
                      </Item>
                    </Grid>
                  </Grid>
                </Box>
              </div>
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
                      className='dashboard-Cards'
                      style={{ borderRadius: '20px' }}
                      key={item.id}
                    >
                      <div className='AnnouncementCarouselDesign'>
                        <div className='announcementHeading'>
                          <span>
                            <CampaignIcon />
                          </span>
                          <span style={{ textAlign: 'center' }}>
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
                {items.map((item) => {
                  return (
                    <Card className='dashBoard-cards-second' key={item.id}>
                      <div className='recentBlogsCarouselDesign'>
                        <div
                          className='blogsHeading'
                          style={{ marginTop: '2rem' }}
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
                          <divs style={{ marginLeft: '1rem' }}>
                            <span>
                              <AccountCircleSharpIcon />
                            </span>
                            <span>By Anand </span>
                          </divs>
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
                {items.map((item) => {
                  return (
                    <Card className='dashBoard-cards-second' key={item.id}>
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
                        <div className='dashBoardDiscussionUserDetails'>
                          <div
                            style={{
                              width: '100px',
                              marginRight: '20px',
                            }}
                          >
                            <img
                              src={HomeImage}
                              alt=''
                              style={{
                                width: '100px',
                                borderRadius: '10%',
                              }}
                            />
                          </div>
                          <div>
                            <div
                              style={{
                                marginTop: '12px',
                                fontWeight: '800',
                                fontSize: '20px',
                              }}
                            >
                              Anand kumar Choudhary
                            </div>
                          </div>
                        </div>
                        <div className='discussionContent'>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Veritatis dicta deserunt illo, officia dolorum
                          voluptate?{' '}
                        </div>
                        <div className='discussionCommentCount'>
                          <div style={{ float: 'right' }}>
                            <CommentBankIcon />
                            450
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
