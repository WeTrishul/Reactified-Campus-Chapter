import React from 'react';
import '../../Forms/SignupForm.css';
import { useRef } from 'react';
import axios from 'axios';
import AuthContext from '../../../Service/auth-context';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

function Editprofile() {
  const [userProfile, setUserProfile] = useState();

  const nameInputRef = useRef();
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const codeforcesInputRef = useRef();
  const codechefInputRef = useRef();
  const hackerrankInputRef = useRef();
  const leetInputRef = useRef();
  const usertypeInputRef = useRef();

  let history = useHistory();

  const authCtx = useContext(AuthContext);
  let userId = authCtx.id;
  let userName = authCtx.username;

  const handleNameChange = (e) => {
    let x = userProfile;
    x.name = e.target.value;
    setUserProfile({ ...userProfile, x });
  };

  const handleEmailChange = (e) => {
    let x = userProfile;
    x.email = e.target.value;
    setUserProfile({ ...userProfile, x });
  };

  const handleCodeforces = (e) => {
    let x = userProfile;
    x.codeforces = e.target.value;
    setUserProfile({ ...userProfile, x });
  };

  const handleCodechef = (e) => {
    let x = userProfile;
    x.codechef = e.target.value;
    setUserProfile({ ...userProfile, x });
  };

  const handleHackerrank = (e) => {
    let x = userProfile;
    x.hackerrank = e.target.value;
    setUserProfile({ ...userProfile, x });
  };

  const handleLeetcode = (e) => {
    let x = userProfile;
    x.leetcode = e.target.value;
    setUserProfile({ ...userProfile, x });
  };

  useEffect(() => {
    Axios({
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/profilepage/' + userName,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);

        setUserProfile(data.searchuser);
      });
  }, []);

  function submitHandler(event) {
    event.preventDefault();

    console.log(event.target.name.value);

    // const enteredName = nameInputRef.current.value;
    // const enteredEmail = emailInputRef.current.value;
    // const enteredCodeforces = codeforcesInputRef.current.value;
    // const enteredCodechef = codechefInputRef.current.value;
    // const enteredHackerrank = hackerrankInputRef.current.value;
    // const enteredleet = leetInputRef.current.value;

    const enteredName = event.target.name.value;
    const enteredEmail = event.target.email.value;
    const enteredCodeforces = event.target.codeforces.value;
    const enteredCodechef = event.target.codechef.value;
    const enteredHackerrank = event.target.hackerrank.value;
    const enteredleet = event.target.leetcode.value;

    const userDetails = {
      name: enteredName,
      email: enteredEmail,
      codeforces: enteredCodeforces,
      codechef: enteredCodechef,
      hackerrank: enteredHackerrank,
      leetcode: enteredleet,
    };

    console.log(userDetails);

    axios
      .post('http://localhost:3000/update/coderhandles', userDetails, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log('Backend se aaya hoon bro signup wala hoon', res);
        history.push('/Profile');
      })
      .catch((err) => {
        console.log(err);
        console.log('main nhi chal rha hoon bhai');
      });
  }

  return (
    <div>
      <div className='main-wrap'>
        <div className='outer-wrap'>
          <h1>Edit Profile</h1>
          <hr className='horizontal-line' />

          {userProfile && (
            <form action='' onSubmit={submitHandler} className='register-form'>
              <label htmlFor='Name'>Name</label>
              <br />
              <input
                inputRef={nameInputRef}
                value={userProfile.name}
                onChange={handleNameChange}
                type='text'
                name='name'
                className='name'
                placeholder='Name'
              />
              <br />
              <br />

              <label htmlFor='Email'>Email</label>
              <br />
              <input
                inputRef={emailInputRef}
                value={userProfile.email}
                onChange={handleEmailChange}
                type='email'
                name='email'
                className='email'
                placeholder='Email'
              />
              <br />

              {/* <label htmlFor='Password' name=''>
              Password
            </label>
            <br />
            <input
              ref={passwordInputRef}
              value={userProfile.password}
              type='password'
              name='password'
              className='pass'
              placeholder='Password'
            /> */}
              <br />

              <label htmlFor='Codeforces' name=''>
                Codeforces ID
              </label>
              <br />
              <input
                inputRef={codeforcesInputRef}
                value={userProfile.codeforces}
                onChange={handleCodeforces}
                type='text'
                name='codeforces'
                className='Codeforces'
                placeholder='Codeforces ID'
              />
              <br />

              <label htmlFor='Codechef' name=''>
                Codechef ID
              </label>
              <br />
              <input
                inputRef={codechefInputRef}
                value={userProfile.codechef}
                onChange={handleCodechef}
                type='text'
                name='codechef'
                className='Cdchef'
                placeholder='Codechef ID'
              />
              <br />

              <label htmlFor='Hackerrank' name=''>
                Hackerrank ID
              </label>
              <br />
              <input
                inputRef={hackerrankInputRef}
                value={userProfile.hackerrank}
                onChange={handleHackerrank}
                type='text'
                name='hackerrank'
                className='hckrnk'
                placeholder='Hackerrank ID'
              />
              <br />

              <label htmlFor='Spoj' name=''>
                LeetCode ID
              </label>
              <br />
              <input
                inputRef={leetInputRef}
                value={userProfile.leetcode}
                onChange={handleLeetcode}
                type='text'
                name='leetcode'
                className='Spoj'
                placeholder='Leet ID'
              />
              <br />

              {/* <label htmlFor='Usertype' name=''>
              UserType
            </label>
            <br />
            <input
              ref={usertypeInputRef}
              type='text'
              name='usertype'
              className='usertype'
              placeholder='UserType'
            /> */}
              <br />

              <button type='submit' className='register-btn'>
                Update
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Editprofile;
