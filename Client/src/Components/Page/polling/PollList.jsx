import React from 'react';
import Card from '@mui/material/Card';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import './PollList.css';

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
function PollList() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = React.useState('Question');

  const handleMultilineChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <div className='polling-Body-Box'>
        <div className='polling-Outer-Box'>
          <div className='polling-Inner-Box'>
            <div
              style={{
                fontSize: '25px',
                marginTop: '1rem',
              }}
            >
              <h2>
                <u> POLLING LIST</u>
              </h2>
            </div>
            <Box sx={{ width: '100%' }} className='polling-List-Display'>
              <Card sx={{ marginTop: '1rem', width: '100%', height: 'auto' }}>
                <Box sx={{ display: 'flex' }}>
                  <Box
                    sx={{ width: '70%', padding: '15px', fontWeight: '700' }}
                  >
                    Anand
                  </Box>
                  <Box
                    sx={{ width: '20%', textAlign: 'right', padding: '15px' }}
                  >
                    <DeleteIcon sx={{ color: 'red' }} />
                  </Box>
                </Box>
              </Card>
            </Box>
            <div className='polling-List-Modal'>
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
                        Create Your POLL
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
                          <TextField
                            id='outlined-multiline-flexible'
                            label='Write your Question'
                            multiline
                            maxRows={4}
                            value={value}
                            onChange={handleMultilineChange}
                          />
                        </Box>
                        <Box sx={{ marginTop: '10px' }}>
                          <TextField
                            id='outlined-basic'
                            label='First Option'
                            variant='outlined'
                          />
                        </Box>
                        <Box sx={{ marginTop: '10px' }}>
                          <TextField
                            id='outlined-basic'
                            label='Second Option'
                            variant='outlined'
                          />
                        </Box>
                        <Box sx={{ marginTop: '10px' }}>
                          <TextField
                            id='outlined-basic'
                            label='Third Option'
                            variant='outlined'
                          />
                        </Box>
                        <Box sx={{ marginTop: '10px' }}>
                          <TextField
                            id='outlined-basic'
                            label='Fourth Option'
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
            <div>
              <button onClick={handleOpen} className='create-Pollong-Button'>
                <CreateIcon />{' '}
                <span className='pollong-Create-btn'>POLLING</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PollList;
