import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import './Setquestions.css';
import { useEffect, useRef } from 'react';
import { useState, useContext } from 'react';
import AuthContext from '../../../Service/auth-context';
import Axios from 'axios';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));
function Setquestions() {
  const authCtx = useContext(AuthContext);
  let userid = authCtx.id;

  const [allques, setAllQues] = useState([]);

  let history = useHistory();

  useEffect(() => {
    console.log(userid);
    Axios({
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/seeQ/' + userid,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);

        //     // console.log(data)
        // setLoading(false);

        setAllQues(data.arr);
      });
  }, []);

  const submitHandler = () => {
    // e.preventDefault();

    var form_data = new FormData();

    const inpfiles = document.getElementById('multiFiles');

    for (var f of inpfiles.files) {
      form_data.append('questions', f);
    }

    Axios({
      method: 'POST',

      data: form_data,
      headers: { 'Content-Type': 'multipart/form-data' },

      withCredentials: true,
      url: 'http://localhost:3000/fileupload/setquestions/' + userid,
    })
      .then((res) => {
        console.log(res);
        console.log('upload hogya');
        setAllQues((c) => [...c, res.data.ele]);
        history.push('/SetQuestions');
      })
      .catch((err) => {
        console.log(err);
        console.log('main nhi chal rha hoon bhai');
      });
  };

  const questionsCardRendering = (data, index) => {
    if (window.innerWidth <= 600) {
      return (
        <Box sx={{ height: '70vh', overflowY: 'auto' }}>
          <Box sx={{ width: 1, marginTop: '1rem' }}>
            <Box display='grid' gridTemplateColumns='repeat(12, 1fr)' gap={2}>
              <Box gridColumn='span 6'>
                <Item sx={{ height: '30vh' }}>
                  <Box sx={{ border: '1px solid black' }}>
                    <img
                      style={{
                        width: '100px',
                        height: '100px',
                      }}
                      src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Icon_pdf_file.svg/1200px-Icon_pdf_file.svg.png'
                      alt=''
                    />
                  </Box>

                  <Box sx={{ marginTop: '1rem' }}>Question {index}</Box>
                </Item>
              </Box>
            </Box>
          </Box>
        </Box>
      );
    } else if (window.innerWidth > 600 && window.innerWidth <= 800) {
      return (
        <Box sx={{ height: '70vh', overflowY: 'auto' }}>
          <Box sx={{ width: 1, marginTop: '1rem' }}>
            <Box display='grid' gridTemplateColumns='repeat(12, 1fr)' gap={2}>
              <Box gridColumn='span 4'>
                <Item sx={{ height: '30vh' }}>
                  <Box sx={{ border: '1px solid black' }}>
                    <img
                      style={{
                        width: '100px',
                        height: '100px',
                      }}
                      src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Icon_pdf_file.svg/1200px-Icon_pdf_file.svg.png'
                      alt=''
                    />
                  </Box>
                  <Box sx={{ marginTop: '1rem' }}>Question {index}</Box>
                </Item>
              </Box>
            </Box>
          </Box>
        </Box>
      );
    } else if (window.innerWidth >= 800) {
      return (
        <Box
          sx={{
            maxHeight: '70vh',
            marginTop: '2rem',
            overflowY: 'auto',
          }}
        >
          <Box sx={{ width: 1, marginTop: '1rem' }}>
            <Box display='grid' gridTemplateColumns='repeat(12, 1fr)' gap={2}>
              <Box gridColumn='span 3'>
                <Item
                  sx={{
                    height: '40vh',
                    borderRadius: '20px',
                    border: '1px solid black',
                  }}
                >
                  <Box>
                    <img
                      style={{
                        width: '100px',
                        height: '100px',
                      }}
                      src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Icon_pdf_file.svg/1200px-Icon_pdf_file.svg.png'
                      alt=''
                    />
                  </Box>
                  <Box sx={{ marginTop: '1rem' }}>Question {index}</Box>
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
      <div className='setquestions-body-Box'>
        <div className='setquestions-Outer-Box'>
          <div className='setquestions-Inner-Box'>
            <div className='setquestions-Card-Container'>
              <div
                style={{
                  fontSize: '25px',
                  marginTop: '1rem',
                }}
                className='setquestions-Heasding'
              >
                <h2>
                  <u>SET QUESTIONS</u>
                </h2>
              </div>
              {allques &&
                allques.map((data, index) => {
                  return <div>{questionsCardRendering(data, index)}</div>;
                })}
            </div>
            <div
              style={{ textAlign: 'center', justifyContent: 'center' }}
              className='question-Submit-Btn'
            >
              {/* <Button variant='contained' size='large'>
                Add More Questions <AddIcon />
              </Button> */}
              <Box sx={{ marginTop: '2rem' }}>
                <Box>
                  <Button variant='contained' size='large' component='label'>
                    Add more Files <AddIcon />
                    <input
                      type='file'
                      type='file'
                      name='questions'
                      id='multiFiles'
                      multiple
                      hidden
                    />
                  </Button>
                </Box>
                <Box sx={{ marginTop: '1rem' }}>
                  <Button
                    onClick={submitHandler}
                    variant='contained'
                    size='large'
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setquestions;
