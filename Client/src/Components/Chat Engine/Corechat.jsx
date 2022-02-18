import React from 'react';
import './Chat.css';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';

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
                  <div className='chat-Messages'>
                    <div className='chat-First-User-Div'>
                      <div className='first-User-image-container'>
                        <img
                          className='chat-first-User-image'
                          src='https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'
                          alt=''
                        />
                      </div>
                      <div className='first-User-Message'>
                        <span style={{ fontWeight: '700' }}>
                          Anand kumar Choudhary
                        </span>
                        <div>
                          <span>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Veniam, libero?
                          </span>
                        </div>
                        <div className='first-User-Message-Time'>09:45</div>
                      </div>
                    </div>
                    <div className='chat-Second-User-Div'>
                      <div className='second-User-Message'>
                        <span style={{ fontWeight: '700' }}>
                          Anand kumar Choudhary
                        </span>
                        <div>
                          <span>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Veniam, libero?
                          </span>
                        </div>
                        <div className='second-User-Message-Time'>09:45</div>
                      </div>
                      <div className='Second-User-image-container'>
                        <img
                          className='chat-second-User-image'
                          src='https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'
                          alt=''
                        />
                      </div>
                    </div>
                    <div className='chat-Second-User-Div'>
                      <div className='second-User-Message'>
                        <span style={{ fontWeight: '700' }}>
                          Anand kumar Choudhary
                        </span>
                        <div>
                          <span>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Veniam, libero?
                          </span>
                        </div>
                        <div className='second-User-Message-Time'>09:45</div>
                      </div>
                      <div className='Second-User-image-container'>
                        <img
                          className='chat-second-User-image'
                          src='https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'
                          alt=''
                        />
                      </div>
                    </div>
                    <div className='chat-Second-User-Div'>
                      <div className='second-User-Message'>
                        <span style={{ fontWeight: '700' }}>
                          Anand kumar Choudhary
                        </span>
                        <div>
                          <span>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Veniam, libero?
                          </span>
                        </div>
                        <div className='second-User-Message-Time'>09:45</div>
                      </div>
                      <div className='Second-User-image-container'>
                        <img
                          className='chat-second-User-image'
                          src='https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'
                          alt=''
                        />
                      </div>
                    </div>
                    <div className='chat-Second-User-Div'>
                      <div className='second-User-Message'>
                        <span style={{ fontWeight: '700' }}>
                          Anand kumar Choudhary
                        </span>
                        <div>
                          <span>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Veniam, libero?
                          </span>
                        </div>
                        <div className='second-User-Message-Time'>09:45</div>
                      </div>
                      <div className='Second-User-image-container'>
                        <img
                          className='chat-second-User-image'
                          src='https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'
                          alt=''
                        />
                      </div>
                    </div>
                  </div>
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
