import React from 'react';
import './Viewquestions.css';
import { useEffect, useState, useContext } from 'react';
import AuthContext from '../../../Service/auth-context';
import Axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function Viewquestions() {
  const [allques, setAllQues] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const { userkaname } = useParams();

  var show = { userkaname };
  var userkanaam = show.userkaname;



  const authCtx = useContext(AuthContext);
  let userId = authCtx.id;

  useEffect(() => {

    console.log(userkanaam)
    Axios({
      method: 'GET',
      // params:{},
      withCredentials: true,
      url: 'http://localhost:3000/seeQ/' + userkanaam,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);

        // console.log(data)
        setLoading(false);

        setAllQues(data.arr);
      });
  }, []);

  return (
    <div>
      <div className='viewquestions-body-Box'>
        <div className='viewquestions-outer-Box'>
          <div className='viewquestions-inner-Box'>
            <Typography>
              <Grid container>
                {allques && userId &&
                  allques.map((data, index) => {
                    return (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card
                          sx={{
                            margin: '10px',
                            textAlign: 'center',
                            justifyContent: 'center',
                            height: 'auto',
                            borderRadius: '20px',
                            border: '1px solid black',
                          }}
                        >
                          <Box sx={{ width: '100%', marginTop: '1rem' }}>
                            <img
                              style={{ width: '40%', height: 'auto' }}
                              src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png'
                              alt=''
                            />
                          </Box>
                          <Box
                            sx={{ color: 'text.secondary', marginTop: '1rem' }}
                          >
                            {/* <a
                              style={{
                                textDecoration: 'none',
                                color: 'black',
                              }}
                              href={'http://localhost:3000' + data}
                              target='_blank'
                            >
                              Question-{index}
                            </a> */}
                            <a href={'http://localhost:3000' + data} target='_blank'>
                Question {index}
              </a>{' '}
                          </Box>
                        </Card>
                      </Grid>
                    );
                  })}
              </Grid>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Viewquestions;
