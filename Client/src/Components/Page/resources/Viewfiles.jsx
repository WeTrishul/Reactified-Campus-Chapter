import React from 'react';
import './Viewfiles.css';
import Box from '@mui/material/Box';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Typography from '@mui/material/Typography';

function Viewfiles() {
  const [files, setfiles] = useState([]);
  const { foldername } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    var cat = { foldername };
    var fname = cat.foldername;

    Axios({
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/fileresources/' + fname,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        // setfiles(files => [ ...files, data.arr.files])
        setIsLoading(false);
        setfiles(data.arr.files);
        console.log(files);
        //     // console.log(data)
      });
  }, []);

  return (
    <div>
      <div className='viewFiles-body-Box'>
        <div className='viewfiles-outer-Box'>
          <div className='viewfiles-inner-Box'>
            <Typography>
              <Grid sx={{ marginTop: '1rem' }} container>
                {files.map((data, index) => {
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
                          <a
                            style={{
                              textDecoration: 'none',
                              color: 'text.secondary',
                            }}
                            href={'http://localhost:3000' + data.ele}
                            target='_blank'
                          >
                            {data.name}
                          </a>
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

export default Viewfiles;
