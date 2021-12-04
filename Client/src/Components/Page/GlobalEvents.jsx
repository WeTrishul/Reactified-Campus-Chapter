import React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './AllEvents.css';
import CircularIndeterminate from '../Layout/CircularIndeterminate';

function GlobalEvents() {
  const [codechefevents, setCodechef] = useState();
  const [isLoading, setLoading] = useState(true);

  const [codeForces, setCodeForces] = useState();

  const { platform } = useParams();

  useEffect(() => {
    console.log({ platform });

    const x = { platform };

    const Plat = x.platform;

    Axios({
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/globalevents/' + Plat,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        // setBlogs(data.data.blogs)
        //     // console.log(data)
        if (data.query == 'CodeForces') {
          setLoading(false);
          setCodeForces(data.result);
          setCodechef(undefined);
        }
        if (data.query == 'CodeChef') {
          setLoading(false);
          setCodechef(data.result);
          setCodeForces(undefined);
        }
      });
  }, []);

  const GlobalRendering = () => {
    if (isLoading) {
      return (
        <div>
          <CircularIndeterminate />
        </div>
      );
    } else {
      return (
        <div>
          <div style={{ width: '100%', height: 'auto' }} className='outerCard'>
            <div
              style={{ width: '100%', height: '70vh', padding: '1rem' }}
              className='innerCard'
            >
              <div style={{ display: 'flex' }} className='cardComponent'>
                {codeForces &&
                  codeForces.map((data) => {
                    return (
                      <div style={{ margin: '10px' }} className='EventsCard'>
                        <Card sx={{ maxWidth: 345 }}>
                          <CardMedia
                            component='img'
                            height='140'
                            image='https://news.itmo.ru/images/news/big/917925.jpg'
                            alt='green iguana'
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant='h5'
                              component='div'
                            >
                              {data.name}
                            </Typography>
                            <Typography variant='body2' color='text.secondary'>
                              {data.startTimeSeconds}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            {/* <Button size='small'>Share</Button>
                        <Button size='small'>Learn More</Button> */}
                          </CardActions>
                        </Card>
                      </div>
                    );
                  })}
                {codechefevents &&
                  codechefevents.map((data) => {
                    return (
                      <div style={{ margin: '10px' }} className='EventsCard'>
                        <Card sx={{ maxWidth: 345 }}>
                          <CardMedia
                            component='img'
                            height='140'
                            image='https://images.yourstory.com/cs/images/companies/codechef-1592821643695.jpg?fm=auto&ar=1:1&mode=fill&fill=solid&fill-color=fff'
                            alt='green iguana'
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant='h5'
                              component='div'
                            >
                              {data.name}
                            </Typography>
                            <Typography variant='body2' color='text.secondary'>
                              {data.startTimeSeconds}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            {/* <Button size='small'>Share</Button>
                        <Button size='small'>Learn More</Button> */}
                          </CardActions>
                        </Card>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return <>{GlobalRendering()}</>;
}

export default GlobalEvents;
