import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AuthContext from '../../../Service/auth-context';
import { useContext, useState } from 'react';
import Axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import './ResourceDisplay.css';
import { Link } from 'react-router-dom';

function ResourceDisplay() {
  // connection code

  const { categoryname } = useParams();

  var cat = { categoryname };
  var category = cat.categoryname;

  const [userfiles, setUserFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // setCategory(location.state.message)

  const authCtx = useContext(AuthContext);
  let userid = authCtx.id;
  let username = authCtx.username;

  // useEffect(()=>{
  //     setCategory(location.state.message)
  // },[])

  useEffect(() => {
    // var cat = { categoryname };
    // var category = cat.categoryname;

    // setCategory(location.state.message)

    Axios({
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/resources/upload/' + category,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        if (data.allfiles && data.allfiles.files.length) {
          setUserFiles(data.allfiles.files);
        }
      });
  }, []);

  const DeleteFilesHandler = (e) => {
    var rid = e.target.id;
    var foldername = username + '_' + category;
    console.log(rid);
    Axios({
      method: 'GET',

      withCredentials: true,
      url:
        'http://localhost:3000/deleteres' +
        rid +
        '/' +
        category +
        '/' +
        foldername,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        console.log('Delete ho gya hum maa kasam');
        document.getElementById('file-' + e.target.id).remove();

        //     // console.log(data)
      });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const inpfiles = document.getElementById('multiFiles');
    var form_data = new FormData();

    console.log(inpfiles.files);

    for (var f of inpfiles.files) {
      form_data.append('resources', f);
    }

    // var option = location.state;
    var name = document.getElementById('name').value;

    form_data.append('patanhi', category);
    // form_data.append('patanhi', option);
    // form_data.append('flag',true)
    form_data.append('name', name);

    // console.log('location wala hoon', category);
    // for (var pair of form_data.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }

    Axios({
      method: 'POST',
      data: form_data,
      withCredentials: true,
      url: 'http://localhost:3000/resourses/' + userid,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);

        // setUserFiles(data.allfiles.files);
        setUserFiles((c) => [...c, data.fd]);
        //     // console.log(data.data.applyreq.token)
        //     // console.log(data.data.applyreq._id)

        //     // console.log(data)
      });
  };

  //Connection Code

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
                    <input
                      type='file'
                      name='resources'
                      id='multiFiles'
                      multiple
                      hidden
                    />
                  </Button>
                </Box>
                <input
                  type='text'
                  name='name'
                  id='name'
                  placeholder='File Name'
                />
              </Card>
              <Box sx={{ marginTop: '1rem', textAlign: 'center' }}>
                <Button
                  onClick={submitHandler}
                  variant='contained'
                  color='success'
                >
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
                  {userfiles &&
                    userfiles.map((data, index) => {
                      return (
                        <Card sx={{ width: '100%', height: 'auto' }}>
                          <Box sx={{ display: 'flex' }} id={'file-' + data.ele}>
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
                              <a
                                href={'http://localhost:3000' + data.ele}
                                target='_blank'
                              >
                                View
                              </a>
                            </Box>
                            <button
                              style={{
                                background: 'red',
                                borderStyle: 'none',
                                color: 'white',
                              }}
                              id={data.ele}
                              onClick={DeleteFilesHandler}
                            >
                              Delete
                            </button>
                          </Box>
                        </Card>
                      );
                    })}
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
