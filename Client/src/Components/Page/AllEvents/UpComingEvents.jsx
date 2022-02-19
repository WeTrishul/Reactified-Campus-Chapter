import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CreateIcon from '@mui/icons-material/Create';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import GroupsIcon from '@mui/icons-material/Groups';
import ReplyIcon from '@mui/icons-material/Reply';
import { Link } from 'react-router-dom';
import './Events.css';

const style = {
  position: 'absolute',
  top: '55%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  height: '510px',
  boxShadow: 24,
  p: 4,
};
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  borderRadius: '20px',
  color: theme.palette.text.secondary,
}));
function UpComingEvents() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const eventsRenderingOnWidth = () => {
    if (window.innerWidth <= 431) {
      return (
        <Box>
          <Box>
            <Box sx={{ width: 1 }}>
              <Box display='grid' gridTemplateColumns='repeat(12, 1fr)' gap={2}>
                <Box gridColumn='span 12'>
                  <Item sx={{ height: '70vh' }}>
                    <Box sx={{ display: 'flex' }}>
                      <Box>
                        <GroupsIcon sx={{ fontSize: '30px' }} />
                      </Box>
                      <Box sx={{ marginLeft: '2px' }}>120</Box>
                      <Box sx={{ display: 'flex', marginLeft: '60px' }}>
                        <Box>
                          <EditIcon />
                        </Box>
                        <Box sx={{ marginLeft: '20px' }}>
                          <DeleteIcon />
                        </Box>
                        <Box sx={{ marginLeft: '20px' }}>
                          <ReplyIcon />
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                      <img
                        style={{
                          width: '100%',
                          height: '200px',
                          borderRadius: '20px',
                        }}
                        src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
                        alt=''
                      />
                    </Box>
                    <Box>
                      <Typography
                        sx={{ fontWeight: '600', fontSize: '15px' }}
                        variant='h7'
                      >
                        UPCOMING EVENT HEADING
                      </Typography>
                    </Box>
                    <Box sx={{ fontSize: '10px' }}>
                      College Event |{' '}
                      <AccessTimeFilledIcon sx={{ paddingTop: '8px' }} /> 08:00
                    </Box>
                    <Box
                      sx={{
                        marginTop: '20px',
                        textAlign: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Button variant='contained' color='success'>
                        Register
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
                <Item sx={{ height: '30vh' }}>
                  <Box sx={{ display: 'flex' }}>
                    <Box sx={{ maxWidth: '30%' }}>
                      <img
                        style={{
                          width: '100%',
                          height: '140px',
                          borderRadius: '20px',
                        }}
                        src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
                        alt=''
                      />
                    </Box>
                    <Box sx={{ width: '50%' }}>
                      <Box sx={{ marginLeft: '20px' }}>
                        <Box>
                          <Typography sx={{ fontWeight: '600' }} variant='h7'>
                            UPCOMING EVENT HEADING
                          </Typography>
                        </Box>
                        <Box>
                          College Event |{' '}
                          <AccessTimeFilledIcon sx={{ paddingTop: '8px' }} />{' '}
                          08:00
                        </Box>

                        <Box sx={{ marginTop: '5px' }}>
                          <Box>Starts 19 feb </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ marginLeft: '20px' }}>
                      <Box sx={{ display: 'flex', marginLeft: '30px' }}>
                        <Box>
                          <GroupsIcon sx={{ fontSize: '30px' }} />
                        </Box>
                        <Box sx={{ marginLeft: '2px' }}>120</Box>
                      </Box>
                      <Box sx={{ marginTop: '20px' }}>
                        <Box sx={{ display: 'flex' }}>
                          <Box>
                            <EditIcon />
                          </Box>
                          <Box sx={{ marginLeft: '20px' }}>
                            <DeleteIcon />
                          </Box>
                          <Box sx={{ marginLeft: '20px' }}>
                            <ReplyIcon />
                          </Box>
                        </Box>
                      </Box>
                      <Box sx={{ marginTop: '20px' }}>
                        <Button variant='contained' color='success'>
                          Register
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
                <Item sx={{ height: '30vh' }}>
                  <Box sx={{ display: 'flex' }}>
                    <Box sx={{ maxWidth: '30%' }}>
                      <img
                        style={{
                          width: '100%',
                          height: '140px',
                          borderRadius: '20px',
                        }}
                        src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
                        alt=''
                      />
                    </Box>
                    <Box sx={{ width: '50%' }}>
                      <Box sx={{ marginLeft: '20px' }}>
                        <Box>
                          <Typography sx={{ fontWeight: '600' }} variant='h6'>
                            UPCOMING EVENT HEADING
                          </Typography>
                        </Box>
                        <Box>
                          COLLEGE EVENT |{' '}
                          <AccessTimeFilledIcon sx={{ paddingTop: '8px' }} />{' '}
                          08:00
                        </Box>

                        <Box sx={{ marginTop: '10px' }}>
                          <Box>
                            Starts 19 feb{' '}
                            <AccessTimeFilledIcon sx={{ paddingTop: '8px' }} />
                            08:00
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ marginLeft: '20px' }}>
                      <Box sx={{ display: 'flex', marginLeft: '30px' }}>
                        <Box>
                          <GroupsIcon sx={{ fontSize: '30px' }} />
                        </Box>
                        <Box sx={{ marginLeft: '2px' }}>120</Box>
                      </Box>
                      <Box sx={{ marginTop: '20px' }}>
                        <Box sx={{ display: 'flex' }}>
                          <Box>
                            <EditIcon />
                          </Box>
                          <Box sx={{ marginLeft: '20px' }}>
                            <DeleteIcon />
                          </Box>
                          <Box sx={{ marginLeft: '20px' }}>
                            <ReplyIcon />
                          </Box>
                        </Box>
                      </Box>
                      <Box sx={{ marginTop: '20px' }}>
                        <Button variant='contained' color='success'>
                          Register
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
                <Item sx={{ height: '30vh' }}>
                  <Box sx={{ display: 'flex' }}>
                    <Box sx={{ maxWidth: '20%' }}>
                      <img
                        style={{
                          width: '100%',
                          height: '165px',
                          borderRadius: '20px',
                        }}
                        src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
                        alt=''
                      />
                    </Box>
                    <Box sx={{ width: '60%' }}>
                      <Box sx={{ marginLeft: '20px' }}>
                        <Box>
                          <Typography sx={{ fontWeight: '600' }} variant='h6'>
                            UPCOMING EVENT HEADING
                          </Typography>
                        </Box>
                        <Box>
                          COLLEGE EVENT |{' '}
                          <AccessTimeFilledIcon sx={{ paddingTop: '8px' }} />{' '}
                          08:00
                        </Box>
                        <Box sx={{ marginTop: '10px' }}>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. A perferendis cupiditate vitae ex, quo nihil?
                          Ullam error magnam possimus, quos quod repudiandae
                          iste, iure, alias autem sequi unde praesentium non.
                        </Box>
                        <Box sx={{ marginTop: '5px' }}>
                          <Box>
                            Starts 19 feb{' '}
                            <AccessTimeFilledIcon sx={{ paddingTop: '8px' }} />
                            08:00
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ marginLeft: '20px' }}>
                      <Box sx={{ display: 'flex', marginLeft: '30px' }}>
                        <Box>
                          <GroupsIcon sx={{ fontSize: '30px' }} />
                        </Box>
                        <Box sx={{ marginLeft: '2px' }}>120</Box>
                      </Box>
                      <Box sx={{ marginTop: '20px' }}>
                        <Box sx={{ display: 'flex' }}>
                          <Box>
                            <EditIcon />
                          </Box>
                          <Box sx={{ marginLeft: '20px' }}>
                            <DeleteIcon />
                          </Box>
                          <Box sx={{ marginLeft: '20px' }}>
                            <ReplyIcon />
                          </Box>
                        </Box>
                      </Box>
                      <Box sx={{ marginTop: '20px' }}>
                        <Button variant='contained' color='success'>
                          Register
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
      <div className='upComingEvents-Body-Box'>
        <div className='upComingEvents-Outer-Box'>
          <div className='upComingEvents-Inner-Box'>
            <div>
              <div>{eventsRenderingOnWidth()}</div>
              {/* <Button onClick={handleOpen}>Open modal</Button> */}
              <Modal
                aria-labelledby='transition-modal-title'
                aria-describedby='transition-modal-description'
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <Box sx={style}>
                    <Box
                      sx={{
                        width: '100%',
                        textAlign: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        sx={{ width: '100%' }}
                        id='transition-modal-title'
                        variant='h5'
                        component='h2'
                      >
                        ADD EVENT FORM
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: '100%',
                        textAlign: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        id='transition-modal-description'
                        sx={{ mt: 2 }}
                      >
                        <Box sx={{ marginTop: '10px' }}>
                          <Button variant='contained' component='label'>
                            Upload File
                            <input type='file' hidden />
                          </Button>
                        </Box>
                        <Box sx={{ marginTop: '10px' }}>
                          <TextField
                            id='outlined-basic'
                            label='Event Name'
                            variant='outlined'
                          />
                        </Box>
                        <Box sx={{ marginTop: '10px' }}>
                          <TextField
                            id='outlined-basic'
                            label='About Event'
                            variant='outlined'
                          />
                        </Box>
                        <Box sx={{ marginTop: '10px' }}>
                          <TextField
                            id='outlined-basic'
                            label='Start Time'
                            variant='outlined'
                          />
                        </Box>
                        <Box sx={{ marginTop: '10px' }}>
                          <TextField
                            id='outlined-basic'
                            label='End Time'
                            variant='outlined'
                          />
                        </Box>
                        <Box sx={{ marginTop: '10px' }}>
                          <TextField
                            id='outlined-basic'
                            label='Event Date'
                            variant='outlined'
                          />
                        </Box>
                        <Box
                          sx={{
                            marginTop: '10px',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Button variant='contained'>Submit</Button>
                        </Box>
                      </Typography>
                    </Box>
                  </Box>
                </Fade>
              </Modal>
            </div>

            <button onClick={handleOpen} className='create-Events-Button'>
              <CreateIcon /> <span className='event-Create-btn'>Event</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpComingEvents;
