import React from 'react';
import './Chat.css';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

function Corechat() {
  return (
    <div>
      <div className='body-corechat-box'>
        <div className='corechat-outer-box'>
          <div className='corechat-inner-box'>
            <div className='chat-Container-Box'>
              <div className='chat-Page-Design'>
                <Card
                  style={{
                    width: '100%',
                    height: '70vh',
                    marginTop: '1rem',
                    borderTopLeftRadius: '25px',
                    borderBottomLeftRadius: '25px',
                    background: 'rgb(240, 199, 206)',
                    border: '1px solid black',
                    overflowY: 'auto',
                  }}
                >
                  <Box
                    sx={{
                      padding: '10px',
                      overflowY: 'auto',
                    }}
                  >
                    <Box>
                      <Typography>
                        <Box
                          sx={{
                            marginBottom: '5px',
                            margoinTop: '5px',
                            display: 'Table',
                            clear: 'both',
                          }}
                        >
                          <Box sx={{ display: 'flex' }}>
                            <Box sx={{ color: 'text.secondary' }}>
                              <Avatar
                                alt='demo'
                                src='https://wallpaperaccess.com/full/359168.jpg'
                              />
                            </Box>
                            <Box
                              style={{
                                color: 'text.secondary',
                                marginLeft: '7px',
                              }}
                            >
                              <Card
                                sx={{
                                  padding: '5px',
                                  marginTop: '2px',
                                  marginBottom: '2px',
                                  borderRadius: '15px',
                                  background: 'lightblue',
                                }}
                              >
                                <Box sx={{ color: 'text.secondary' }}>
                                  Anand Choudhary
                                </Box>
                                <Box sx={{ color: 'text.primary' }}>
                                  Lorem ipsum dolor sit amet consectetur
                                  adipisicing elit. Saepe, ut.
                                </Box>
                                <Box
                                  sx={{
                                    float: 'right',
                                    color: 'text.secondary',
                                  }}
                                >
                                  09:45
                                </Box>
                              </Card>
                            </Box>
                          </Box>
                        </Box>
                      </Typography>
                    </Box>

                    <Box>
                      <Typography>
                        <Box
                          sx={{
                            float: 'right',
                            marginBottom: '5px',
                            margoinTop: '5px',
                            display: 'table',
                            clear: 'both',
                          }}
                        >
                          <Box sx={{ display: 'flex' }}>
                            <Box
                              style={{
                                color: 'text.secondary',
                                marginRight: '7px',
                              }}
                            >
                              <Card
                                sx={{
                                  padding: '5px',
                                  marginTop: '2px',
                                  marginBottom: '2px',
                                  borderRadius: '15px',
                                  background: 'lightgreen',
                                }}
                              >
                                <Box sx={{ color: 'text.secondary' }}>
                                  Anand Choudhary
                                </Box>
                                <Box sx={{ color: 'text.primary' }}>
                                  Lorem ipsum dolor sit amet consectetur
                                  adipisicing elit. Saepe, ut.
                                </Box>
                                <Box
                                  sx={{
                                    float: 'right',
                                    color: 'text.secondary',
                                  }}
                                >
                                  09:45
                                </Box>
                              </Card>
                            </Box>
                            <Box sx={{ color: 'text.secondary' }}>
                              <Avatar
                                alt='demo'
                                src='https://wallpaperaccess.com/full/359168.jpg'
                              />
                            </Box>
                          </Box>
                        </Box>
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </div>
              <div className='write-chat-Message'>
                <div style={{ width: '90%' }}>
                  <TextField
                    style={{ width: '100%' }}
                    label='Enter your text'
                  />
                </div>
                <div
                  style={{
                    width: '10%',
                    marginLeft: '20px',
                    paddingTop: '8px',
                  }}
                >
                  <SendIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Corechat;
