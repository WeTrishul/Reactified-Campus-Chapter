import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import './ResourceUpload.css';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));
function ResourceUpload() {
  const resourceUploadRendering = () => {
    if (window.innerWidth <= 600) {
      return (
        <Box sx={{ height: 'auto' }}>
          <Box sx={{ width: 1, marginTop: '1rem' }}>
            <Box display='grid' gridTemplateColumns='repeat(12, 1fr)' gap={2}>
              <Box gridColumn='span 6'>
                <Item sx={{ height: 'auto' }}>
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
                  <Box sx={{ marginTop: '1rem' }}>COMPETITIVE PROGRAMMING</Box>
                </Item>
              </Box>
              <Box gridColumn='span 6'>
                <Item sx={{ height: 'auto' }}>
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
                  <Box sx={{ marginTop: '1rem' }}>
                    DATA STRUCTURES & ALGORITHMS
                  </Box>
                </Item>
              </Box>
              <Box gridColumn='span 6'>
                <Item sx={{ height: 'auto' }}>
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
                  <Box sx={{ marginTop: '1rem' }}>CORE SUBJECTS</Box>
                </Item>
              </Box>
              <Box gridColumn='span 6'>
                <Item sx={{ height: 'auto' }}>
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
                  <Box sx={{ marginTop: '1rem' }}>APTITUDE</Box>
                </Item>
              </Box>
              <Box gridColumn='span 6'>
                <Item sx={{ height: 'auto' }}>
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
                  <Box sx={{ marginTop: '1rem' }}>DEVELOPMENT</Box>
                </Item>
              </Box>
              <Box gridColumn='span 6'>
                <Item sx={{ height: 'auto' }}>
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
                  <Box sx={{ marginTop: '1rem' }}>GATE</Box>
                </Item>
              </Box>
              <Box gridColumn='span 6'>
                <Item sx={{ height: 'auto' }}>
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
                  <Box sx={{ marginTop: '1rem' }}>PLACEMENTS</Box>
                </Item>
              </Box>
            </Box>
          </Box>
        </Box>
      );
    } else if (window.innerWidth > 600 && window.innerWidth <= 800) {
      return (
        <Box sx={{ height: 'auto' }}>
          <Box sx={{ width: 1, marginTop: '1rem' }}>
            <Box display='grid' gridTemplateColumns='repeat(12, 1fr)' gap={2}>
              <Box gridColumn='span 4'>
                <Item sx={{ height: 'auto' }}>
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
                  <Box sx={{ marginTop: '1rem' }}>COMPETITIVE PROGRAMMING</Box>
                </Item>
              </Box>
              <Box gridColumn='span 4'>
                <Item sx={{ height: 'auto' }}>
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
                  <Box sx={{ marginTop: '1rem' }}>
                    DATA STRUCTURES & ALGORITHMS
                  </Box>
                </Item>
              </Box>
              <Box gridColumn='span 4'>
                <Item sx={{ height: 'auto' }}>
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
                  <Box sx={{ marginTop: '1rem' }}>CORE SUBJECTS</Box>
                </Item>
              </Box>
              <Box gridColumn='span 4'>
                <Item sx={{ height: 'auto' }}>
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
                  <Box sx={{ marginTop: '1rem' }}>APTITUDE</Box>
                </Item>
              </Box>
              <Box gridColumn='span 4'>
                <Item sx={{ height: 'auto' }}>
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
                  <Box sx={{ marginTop: '1rem' }}>DEVELOPMENT</Box>
                </Item>
              </Box>
              <Box gridColumn='span 4'>
                <Item sx={{ height: 'auto' }}>
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
                  <Box sx={{ marginTop: '1rem' }}>GATE</Box>
                </Item>
              </Box>
              <Box gridColumn='span 4'>
                <Item sx={{ height: 'auto' }}>
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
                  <Box sx={{ marginTop: '1rem' }}>PLACEMENTS</Box>
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
            height: 'auto',
            marginTop: '2rem',
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
                  <Box sx={{ marginTop: '3rem' }}>
                    <img
                      style={{
                        width: '100px',
                        height: '100px',
                      }}
                      src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Icon_pdf_file.svg/1200px-Icon_pdf_file.svg.png'
                      alt=''
                    />
                  </Box>
                  <Box sx={{ marginTop: '1rem' }}>COMPETITIVE PROGRAMMING</Box>
                </Item>
              </Box>
              <Box gridColumn='span 3'>
                <Item
                  sx={{
                    height: '40vh',
                    borderRadius: '20px',
                    border: '1px solid black',
                  }}
                >
                  <Box sx={{ marginTop: '3rem' }}>
                    <img
                      style={{
                        width: '100px',
                        height: '100px',
                      }}
                      src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Icon_pdf_file.svg/1200px-Icon_pdf_file.svg.png'
                      alt=''
                    />
                  </Box>
                  <Box sx={{ marginTop: '1rem' }}>
                    DATA STRUCTURES & ALGORITHMS
                  </Box>
                </Item>
              </Box>
              <Box gridColumn='span 3'>
                <Item
                  sx={{
                    height: '40vh',
                    borderRadius: '20px',
                    border: '1px solid black',
                  }}
                >
                  <Box sx={{ marginTop: '3rem' }}>
                    <img
                      style={{
                        width: '100px',
                        height: '100px',
                      }}
                      src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Icon_pdf_file.svg/1200px-Icon_pdf_file.svg.png'
                      alt=''
                    />
                  </Box>
                  <Box sx={{ marginTop: '1rem' }}>CORE SUBJECTS</Box>
                </Item>
              </Box>
              <Box gridColumn='span 3'>
                <Item
                  sx={{
                    height: '40vh',
                    borderRadius: '20px',
                    border: '1px solid black',
                  }}
                >
                  <Box sx={{ marginTop: '3rem' }}>
                    <img
                      style={{
                        width: '100px',
                        height: '100px',
                      }}
                      src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Icon_pdf_file.svg/1200px-Icon_pdf_file.svg.png'
                      alt=''
                    />
                  </Box>
                  <Box sx={{ marginTop: '1rem' }}>APTITUDE</Box>
                </Item>
              </Box>
              <Box gridColumn='span 3'>
                <Item
                  sx={{
                    height: '40vh',
                    borderRadius: '20px',
                    border: '1px solid black',
                  }}
                >
                  <Box sx={{ marginTop: '3rem' }}>
                    <img
                      style={{
                        width: '100px',
                        height: '100px',
                      }}
                      src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Icon_pdf_file.svg/1200px-Icon_pdf_file.svg.png'
                      alt=''
                    />
                  </Box>
                  <Box sx={{ marginTop: '1rem' }}>DEVELOPMENT</Box>
                </Item>
              </Box>
              <Box gridColumn='span 3'>
                <Item
                  sx={{
                    height: '40vh',
                    borderRadius: '20px',
                    border: '1px solid black',
                  }}
                >
                  <Box sx={{ marginTop: '3rem' }}>
                    <img
                      style={{
                        width: '100px',
                        height: '100px',
                      }}
                      src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Icon_pdf_file.svg/1200px-Icon_pdf_file.svg.png'
                      alt=''
                    />
                  </Box>
                  <Box sx={{ marginTop: '1rem' }}>GATE</Box>
                </Item>
              </Box>
              <Box gridColumn='span 3'>
                <Item
                  sx={{
                    height: '40vh',
                    borderRadius: '20px',
                    border: '1px solid black',
                  }}
                >
                  <Box sx={{ marginTop: '3rem' }}>
                    <img
                      style={{
                        width: '100px',
                        height: '100px',
                      }}
                      src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Icon_pdf_file.svg/1200px-Icon_pdf_file.svg.png'
                      alt=''
                    />
                  </Box>
                  <Box sx={{ marginTop: '1rem' }}>PLACEMENTS</Box>
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
      <div className='ResourceUpload-body-Box'>
        <div className='ResourceUpload-Outer-Box'>
          <div className='ResourceUpload-Inner-Box'>
            <div
              style={{
                fontSize: '25px',
                marginTop: '1rem',
              }}
              className='ResourceUpload-Heasding'
            >
              <h2>
                <u>UPLOAD RESOURCE</u>
              </h2>
            </div>
            <div>{resourceUploadRendering()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResourceUpload;
