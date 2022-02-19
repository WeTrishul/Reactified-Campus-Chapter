import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './ResourceDisplay.css';

function ResourceDisplay() {
  return (
    <div>
      <div className='resourceDisplay-body-Box'>
        <div className='resourceDisplay-Outer-Box'>
          <div className='resourceDisplay-Inner-Box'>
            <div
              style={{ width: '100%' }}
              className='resourceDisplay-Upload-Form'
            >
              <Card
                sx={{
                  margin: '2% auto',
                  width: '70%',
                  height: '300px',
                  background: '#5595fd',
                  textAlign: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ marginTop: '7rem' }}>
                  <Button
                    sx={{
                      background: '#fff',
                      color: 'rgb(54, 53, 53)',
                      fontSize: '30px',
                    }}
                    variant='contained'
                    component='label'
                  >
                    Upload File
                    <input type='file' hidden />
                  </Button>
                </Box>
              </Card>
              <Box sx={{ marginTop: '1rem', textAlign: 'center' }}>
                <Button variant='contained' color='success'>
                  SUBMIT
                </Button>
              </Box>
              <div
                style={{ marginTop: '2rem' }}
                className='resource-Resources-List'
              >
                <div
                  style={{
                    fontSize: '25px',
                    marginTop: '1rem',
                  }}
                  className='resourceDisplay-Resource-Heading'
                >
                  <h2>
                    <u> RESOURCES FILE</u>
                  </h2>
                </div>
                <div
                  style={{ marginTop: '1rem' }}
                  className='resourceDisplay-Resource-List'
                >
                  <Card sx={{ width: '100%', height: 'auto' }}>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ width: '30%' }}>
                        <img
                          style={{
                            width: '50px',
                            height: '50px',
                            padding: '2px',
                          }}
                          src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png'
                          alt=''
                        />
                      </Box>
                      <Box
                        sx={{
                          marginLeft: '1rem',
                          width: '50%',
                          marginTop: '15px',
                          fontWeight: '600',
                        }}
                      >
                        {' '}
                        PDF
                      </Box>
                      <Box
                        sx={{
                          marginLeft: '1rem',
                          width: '20%',
                          marginTop: '15px',
                          fontWeight: '600',
                        }}
                      >
                        19/02/22
                      </Box>
                    </Box>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResourceDisplay;
