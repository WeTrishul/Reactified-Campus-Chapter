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
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRef } from 'react';
import './PollList.css';

const style = {
  position: 'absolute',
  top: '55%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  height: '550px',
  boxShadow: 24,
  p: 4,
};
function PollList() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [allpolls, setPolls] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [value, setValue] = React.useState('Question');

  const handleMultilineChange = (event) => {
    setValue(event.target.value);
  };

  const pollnameInputRef = useRef();
  const questionInputRef = useRef();
  const optionAInputRef = useRef();
  const optionBInputRef = useRef();
  const optionCInputRef = useRef();
  const optionDInputRef = useRef();

  let history = useHistory();

  useEffect(() => {
    Axios({
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/viewAllPolls',
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        setPolls(data.data.allPolls);
        //     // console.log(data)
      });
  }, []);
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredpollName = pollnameInputRef.current.value;
    const enteredQuestion = questionInputRef.current.value;
    const enteredOptionA = optionAInputRef.current.value;
    const enteredOptionB = optionBInputRef.current.value;
    const enteredOptionC = optionCInputRef.current.value;
    const enteredOptionD = optionDInputRef.current.value;

    // const pollName = pollnameInputRef.current.value;

    const pollData = {
      pollName: enteredpollName,
      Question: enteredQuestion,
      optionA: enteredOptionA,
      optionB: enteredOptionB,
      optionC: enteredOptionC,
      optionD: enteredOptionD,
    };

    // axios.post('http://localhost:3000/poll/createpoll',pollData,

    // ).then((response) =>{

    //     console.log(response)

    //     return response.data

    // })
    // .then(data =>{

    //     history.push("/Polling")

    // })
    // .catch(err =>{
    //     console.log("error")
    //     alert("Poll Failed!!");
    // })

    Axios({
      method: 'POST',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      Vary: 'Origin',
      data: {
        pollName: enteredpollName,
        question: enteredQuestion,
        optionA: enteredOptionA,
        optionB: enteredOptionB,
        optionC: enteredOptionC,
        optionD: enteredOptionD,
      },

      withCredentials: true,
      url: 'http://localhost:3000/poll/createpoll',
    })
      .then((response) => {
        console.log(response);

        return response.data;
      })
      .then((data) => {
        history.push('/Polling');
      })
      .catch((err) => {
        console.log('error');
        alert('Poll Failed!!');
      });
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
            {allpolls.map((data) => {
              return (
                <Box
                  id={'poll-' + data._id}
                  sx={{ width: '100%' }}
                  key={data._id}
                  className='polling-List-Display'
                >
                  <Card
                    sx={{ marginTop: '1rem', width: '100%', height: 'auto' }}
                  >
                    <Box sx={{ display: 'flex' }}>
                      <Box
                        sx={{
                          width: '70%',
                          padding: '15px',
                          fontWeight: '700',
                        }}
                      >
                        <Link
                          style={{ textDecoration: 'none', color: 'black' }}
                          className='blogsTitleLink'
                          to={'/DisplayPoll/' + data._id}
                        >
                          {data.pollName}
                        </Link>
                      </Box>
                      <Box
                        sx={{
                          width: '20%',
                          textAlign: 'right',
                          padding: '15px',
                        }}
                      >
                        <DeleteIcon sx={{ color: 'red' }} />
                      </Box>
                    </Box>
                  </Card>
                </Box>
              );
            })}
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
                            ref={questionInputRef}
                            multiline
                            maxRows={4}
                            value={value}
                            onChange={handleMultilineChange}
                          />
                        </Box>
                        <Box sx={{ marginTop: '10px' }}>
                          <TextField
                            id='outlined-basic'
                            label='Poll Name'
                            variant='outlined'
                            ref={pollnameInputRef}
                          />
                        </Box>
                        <Box sx={{ marginTop: '10px' }}>
                          <TextField
                            id='outlined-basic'
                            label='First Option'
                            variant='outlined'
                            ref={optionAInputRef}
                          />
                        </Box>
                        <Box sx={{ marginTop: '10px' }}>
                          <TextField
                            id='outlined-basic'
                            label='Second Option'
                            variant='outlined'
                            ref={optionBInputRef}
                          />
                        </Box>
                        <Box sx={{ marginTop: '10px' }}>
                          <TextField
                            id='outlined-basic'
                            label='Third Option'
                            variant='outlined'
                            ref={optionCInputRef}
                          />
                        </Box>
                        <Box sx={{ marginTop: '10px' }}>
                          <TextField
                            id='outlined-basic'
                            label='Fourth Option'
                            variant='outlined'
                            ref={optionDInputRef}
                          />
                        </Box>
                        <Box
                          sx={{
                            marginTop: '10px',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Button onClick={submitHandler} variant='contained'>
                            Submit
                          </Button>
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
