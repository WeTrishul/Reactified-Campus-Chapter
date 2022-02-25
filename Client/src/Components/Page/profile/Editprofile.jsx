import React from 'react';
import '../../Forms/SignupForm.css';
import { useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Editprofile() {
  const nameInputRef = useRef();
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const codeforcesInputRef = useRef();
  const codechefInputRef = useRef();
  const hackerrankInputRef = useRef();
  const spojInputRef = useRef();
  const usertypeInputRef = useRef();

  let history = useHistory();

  function submitHandler(event) {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredUsername = usernameInputRef.current.value;
    const enteredCodeforces = codeforcesInputRef.current.value;
    const enteredCodechef = codechefInputRef.current.value;
    const enteredHackerrank = hackerrankInputRef.current.value;
    const enteredSpoj = spojInputRef.current.value;
    const enteredUsertype = usertypeInputRef.current.value;

    const userDetails = {
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
      username: enteredUsername,
      codeforces: enteredCodeforces,
      codechef: enteredCodechef,
      hackerrank: enteredHackerrank,
      spoj: enteredSpoj,
      UserType: enteredUsertype,
    };

    console.log(userDetails);

    axios
      .post('http://localhost:3000/signup/createuser', userDetails, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((res) => {
        console.log('Backend se aaya hoon bro signup wala hoon', res);
        history.push('/');
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

          <form action='' onSubmit={submitHandler} className='register-form'>
            <label htmlFor='Name'>Name</label>
            <br />
            <input
              ref={nameInputRef}
              type='text'
              name='name'
              className='name'
              placeholder='Name'
            />
            <br />

            <label htmlFor='Username'>Username</label>
            <br />
            <input
              ref={usernameInputRef}
              type='text'
              name='username'
              className='user'
              placeholder='Username'
            />
            <br />

            <label htmlFor='Email'>Email</label>
            <br />
            <input
              ref={emailInputRef}
              type='email'
              name='email'
              className='email'
              placeholder='Email'
            />
            <br />

            <label htmlFor='Password' name=''>
              Password
            </label>
            <br />
            <input
              ref={passwordInputRef}
              type='password'
              name='password'
              className='pass'
              placeholder='Password'
            />
            <br />

            <label htmlFor='Codeforces' name=''>
              Codeforces ID
            </label>
            <br />
            <input
              ref={codeforcesInputRef}
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
              ref={codechefInputRef}
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
              ref={hackerrankInputRef}
              type='text'
              name='hackerrank'
              className='hckrnk'
              placeholder='Hackerrank ID'
            />
            <br />

            <label htmlFor='Spoj' name=''>
              Spoj ID
            </label>
            <br />
            <input
              ref={spojInputRef}
              type='text'
              name='spoj'
              className='Spoj'
              placeholder='Spoj ID'
            />
            <br />

            <label htmlFor='Usertype' name=''>
              UserType
            </label>
            <br />
            <input
              ref={usertypeInputRef}
              type='text'
              name='usertype'
              className='usertype'
              placeholder='UserType'
            />
            <br />

            <button type='submit' className='register-btn'>
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Editprofile;
