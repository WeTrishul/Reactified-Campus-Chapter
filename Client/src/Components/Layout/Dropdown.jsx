import React from 'react';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import './Dropdown.css';
import { useContext } from 'react';
import AuthContext from '../../Service/auth-context';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import WorkIcon from '@mui/icons-material/Work';
import LogoutIcon from '@mui/icons-material/Logout';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import TextField from '@mui/material/TextField';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  height: '400px',
  boxShadow: 24,
  p: 4,
};
function Dropdown(props) {
  const [role, setRole] = React.useState('');
  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const [value, setValue] = React.useState('');
  const handleMultilineChange = (event) => {
    setValue(event.target.value);
  };

  const [linkval, setLinkVal] = React.useState('');
  const handleLinkChange = (event) => {
    setLinkVal(event.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const authCtx = useContext(AuthContext);
  let userId = authCtx.id;

  let history = useHistory();

  const applyNowSubmit = () => {
    // /applied/:id
    Axios({
      method: 'POST',
      data: {
        appliedRole: role,
        reason: value,
        link1: linkval,
      },
      withCredentials: true,
      url: 'http://localhost:3000/applied/' + userId,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        if (data.data.done != 'yes') {
          alert('Bas hogya yaar ab baar nhi hoga');
        }
        handleClose();
      });
  };

  const logoutHandler = () => {
    authCtx.logout();
    history.push('/');
  };

  return (
    <div>
      <div>
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
                <Typography id='transition-modal-description' sx={{ mt: 2 }}>
                  <div>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id='demo-simple-select-helper-label'>
                        Role
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-helper-label'
                        id='demo-simple-select-helper'
                        value={role}
                        label='Role'
                        onChange={handleChange}
                      >
                        <MenuItem value='QuestionSetter'>
                          Question Setter
                        </MenuItem>
                        <MenuItem value='EventsLead'>Events Lead</MenuItem>
                        <MenuItem value='MediaLead'>Media Lead</MenuItem>
                        <MenuItem value='Executive'>Executive</MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                  <Box sx={{ marginTop: '10px' }}>
                    <TextField
                      id='outlined-multiline-flexible'
                      label='State your reason'
                      multiline
                      maxRows={4}
                      value={value}
                      onChange={handleMultilineChange}
                    />
                  </Box>
                  <Box sx={{ marginTop: '10px' }}>
                    <TextField
                      id='outlined-basic'
                      label='Link'
                      variant='outlined'
                      value={linkval}
                      onChange={handleLinkChange}
                    />
                  </Box>
                  <Box
                    sx={{
                      marginTop: '10px',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Button onClick={applyNowSubmit} variant='contained'>
                      Submit
                    </Button>
                  </Box>
                </Typography>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </div>
      <div className='dropdown' style={{ float: 'right' }}>
        {/* <div className="dropdown-btn"><AccountCircleRoundedIcon/></div> */}
        <div className='dropdown-content'>
          <div className='dropdown-item'>
            <span>
              <PersonIcon />
            </span>
            <Link
              onClick={() => props.data()}
              className='DropProfile'
              to='Profile'
            >
              Profile
            </Link>
          </div>
          <div className='dropdown-item'>
            <span>
              <AppRegistrationIcon />
            </span>
            <Link
              onClick={() => props.data()}
              className='DropEditProfile'
              to='EditProfile'
            >
              Edit Profile
            </Link>
          </div>
          <div className='dropdown-item'>
            <span>
              <WorkIcon />
            </span>
            <Link onClick={handleOpen} className='DropApply'>
              Apply
            </Link>
          </div>
          <div
            onClick={logoutHandler}
            style={{ paddingLeft: '10px' }}
            className='dropdown-item'
          >
            <span style={{ paddingLeft: '10px' }}>
              <LogoutIcon />{' '}
            </span>
            Logout
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
