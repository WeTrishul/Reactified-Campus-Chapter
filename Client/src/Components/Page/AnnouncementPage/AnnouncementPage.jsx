import React from 'react';
import './AnnouncementPage.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useRef } from 'react';
import AuthContext from '../../../Service/auth-context';
import { useContext} from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CreateIcon from '@mui/icons-material/Create';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import io from 'socket.io-client';

const style = {
  position: 'absolute',
  top: '55%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  height: '250px',
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

function AnnouncementPage({socket}) {
  
  const [announcements, setAnnouncements] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const SubjectRef = useRef();
  const BodyRef = useRef();


  const authCtx = useContext(AuthContext);
  let userId = authCtx.id;
  let userName = authCtx.username;
  let UserType=authCtx.usertype;


  let history = useHistory();

  const delhandler=(annId)=>{

    Axios({
      method: 'POST',
      withCredentials: true,
      url: 'http://localhost:3000/delAnnounce/'+annId,
    })
      .then((res) => {
        console.log(res.data.data);
        if(annId)
        {
        document.getElementById("ann-"+annId).remove()
        }
      })
      .catch((err) => {
        console.log(err);
        console.log('main nhi chal rha hoon bhai');
      });

  }

  function submitHandler(e) {
    e.preventDefault();

   
    const eneteredtitle = SubjectRef.current.value;
    const enteredbody = BodyRef.current.value;

 

    
    Axios({
      method: 'POST',
      data: {
        title: eneteredtitle,
        description: enteredbody
      },
      withCredentials: true,
      url: 'http://localhost:3000/Announce',
    })
      .then((res) => {
        console.log(res.data.data);
        setAnnouncements((c) => [...c, res.data.data]);
         socket.emit('notify', {
           to: undefined,
           from: userName,
           msg:
            'Announcement: ' +
             res.data.data.title +
             '!',
          placetogo: '/Dashboard/' + '#ann-' + res.data.data._id,
         });
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
        console.log('main nhi chal rha hoon bhai');
      });
  }

  useEffect(() => {
    Axios({
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/allAnnouncements',
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
    
        setAnnouncements(data.data);
       

        //     // console.log(data)
      });
  }, []);

  const announceRendering = () => {
    
      return (
        <div>
          <table className='user-table'>
            <thead>
              <tr>
                <th>Title</th>

                <th>Body</th>

                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {announcements.map((data) => {
                return (
                  <>
                    <tr key={data._id} id={"ann-"+data._id}>
                      <td>{data.title}</td>

                      <td>{data.description}</td>

                      <td>
                        
                          <button className='table-btn' onClick={() => delhandler(data._id)} >Delete</button>
                       
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>

          <form  onSubmit={submitHandler} >
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
                              id='outlined-basic'
                              label='Subject'
                              variant='outlined'
                              inputRef={SubjectRef}
                            />
                          </Box>
                          <Box sx={{ marginTop: '10px' }}>
                            <TextField
                              id='outlined-basic'
                              label='Body'
                              variant='outlined'
                              inputRef={BodyRef}
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
                             Announce
                            </Button>
                          </Box>
                        </Typography>
                      </Box>
                    </Box>
                  </Fade>
                </Modal>
              </form>
         
        

       <button onClick={handleOpen} className='create-Events-Button'>
              <CreateIcon /> <span className='event-Create-btn'>Announce</span>
            </button> 
     
        </div>
      );
    
  };

  return <>{announceRendering()}</>;
}

export default AnnouncementPage;
