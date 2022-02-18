import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CreateIcon from '@mui/icons-material/Create';
import TextField from '@mui/material/TextField';
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
function UpComingEvents() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <div className='upComingEvents-Body-Box'>
        <div className='upComingEvents-Outer-Box'>
          <div className='upComingEvents-Inner-Box'>
            <div>
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
