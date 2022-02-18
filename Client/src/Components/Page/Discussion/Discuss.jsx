import React from 'react';
import './Discuss.css';
import { useState } from 'react';
import Card from '@mui/material/Card';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ReportIcon from '@mui/icons-material/Report';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

function Discuss() {
  const [comment, setComment] = useState(false);

  const [like, setLike] = useState(false);
  const likeHandler = {
    color: 'blue',
  };
  const viewComment = () => setComment(!comment);
  return (
    <div>
      <div className='body-Discussion-Box'>
        <div className='discussion-Outer-Box'>
          <div className='discuss-Inner-Box'>
            <div className='discuss-Container-Box'>
              <div className='Discuss-post-comment-Box'>
                <Card
                  className='discussion-Card-Box'
                  style={{
                    borderRadius: '20px',
                    border: '1px solid black',
                    background: '#fff',
                    height: 'auto',
                    paddingTop: '10px',
                    paddingBottom: '1rem',
                  }}
                >
                  <div className='discussion-UserImg-Name-Time'>
                    <div className='discussion-Image-Container'>
                      <img
                        className='discussion-User-Image'
                        src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
                        alt=''
                      />
                    </div>
                    <div className='discussion-User-Name'>ANAND CHOUDHARY</div>
                    <div className='discussion-Post-Time'>
                      <span>
                        <AccessTimeFilledIcon />
                      </span>
                      <span>1hr ago</span>
                    </div>
                  </div>
                  <div className='discussion-Post-Content'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Fuga, nostrum.
                  </div>
                  <div className='discussion-Like-Comment-Share'>
                    <div className='discussion-Like-Button'>
                      <ThumbUpIcon sx={likeHandler} /> <span>650</span>
                    </div>
                    <div className='discussion-Comment-Button'>
                      <AddCommentIcon onClick={viewComment} />
                      <span>123</span>
                    </div>
                    <dv className='discussion-Report-Button'>
                      <ReportIcon style={{ color: 'red' }} />
                      <span style={{ color: 'red' }}>Report</span>
                    </dv>
                    <div className='discussion-Delete-Button'>
                      <DeleteIcon style={{ color: 'red' }} />
                    </div>
                  </div>
                </Card>
              </div>
              {comment && (
                <div>
                  <div className='discussion-Posted-Comment-Container-Section'>
                    <div className='discussion-Posted-Comment-Section'>
                      <div className='discuss-Comment-Design'>
                        <div className='discuss-person-Logo'>
                          <PersonIcon />
                        </div>
                        <div className='discuss-Comment-Box'>
                          <Card
                            style={{
                              width: '80%',
                              height: 'auto',
                              background: '#fff',
                            }}
                          >
                            <div className='discuss-Comment-Username'>
                              Anand Choudhary
                            </div>
                            <div className='discuss-Comment-of-user'>
                              Lorem ipsum dolor, sit amet consectetur
                              adipisicing elit. Molestiae, nisi.
                            </div>
                            <div className='discuss-Comment-Like-and-Report'>
                              <div className='comment-Box-Like-and-Count'>
                                <ThumbUpIcon /> 123
                              </div>
                              <div className='comment-Box-Report-and-Count'>
                                <ReportIcon /> 0
                              </div>
                            </div>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='write-Comment-for-Post'>
                    <div style={{ width: '75%' }}>
                      <TextField
                        style={{ width: '100%' }}
                        label='Comment here'
                      />
                    </div>
                    <div
                      style={{
                        width: '25%',
                        marginLeft: '20px',
                        paddingTop: '8px',
                      }}
                    >
                      <SendIcon />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className='write-Discuss-Post-Box'>
              <div style={{ width: '90%', borderRadius: '20%' }}>
                <TextField
                  style={{ width: '100%', borderRadius: '50%' }}
                  label='Write your Post'
                />
              </div>
              <div
                style={{ width: '10%', marginLeft: '10px', paddingTop: '8px' }}
              >
                <SendIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Discuss;
