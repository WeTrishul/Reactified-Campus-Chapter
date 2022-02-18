import React from 'react';
import { useState } from 'react';
import './SignupForm.css';

function SignupForm() {
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [currentpassword, setPassword] = useState('');
  const [codeforces, setCodeforces] = useState('');
  const [codechef, setCodechef] = useState('');
  const [hackerrank, setHackerrank] = useState('');
  const [spoj, setSPOJ] = useState('');
  const [usertype, setUserType] = useState('');

  function submitHandler() {
    let backendData = {
      name,
      username,
      email,
      currentpassword,
      codeforces,
      codechef,
      hackerrank,
      spoj,
      usertype,
    };

    console.log(backendData);

    // fetch("/Anandji",{
    //     method:'POST',
    //     headers:{
    //         'Accept': 'application/json',
    //         'Content-Type':'application/json'
    //     },
    //     body:JSON.stringify(backendData)
    // }).then((result) => {
    //     console.log(result);
    // })
  }

  return (
    <div>
      <div className='main-wrap'>
        <div className='outer-wrap'>
          <h1>Sign In</h1>
          <hr className='horizontal-line' />

          <form onSubmit={submitHandler} className='register-form'>
            <label htmlFor='Name'>Name</label>
            <br />
            <input
              type='text'
              name='name'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className='name'
              placeholder='Name'
            />
            <br />

            <label htmlFor='Username'>Username</label>
            <br />
            <input
              type='text'
              name='user'
              value={username}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              className='user'
              placeholder='Username'
            />
            <br />

            <label htmlFor='Email'>Email</label>
            <br />
            <input
              type='email'
              name='email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className='email'
              placeholder='Email'
            />
            <br />

            <label htmlFor='Password' name=''>
              Password
            </label>
            <br />
            <input
              type='password'
              name='pass'
              value={currentpassword}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className='pass'
              placeholder='Password'
            />
            <br />

            <label htmlFor='Codeforces' name=''>
              Codeforces ID
            </label>
            <br />
            <input
              type='text'
              name='cdfrce'
              value={codeforces}
              onChange={(e) => {
                setCodeforces(e.target.value);
              }}
              className='Codeforces'
              placeholder='Codeforces ID'
            />
            <br />

            <label htmlFor='Codechef' name=''>
              Codechef ID
            </label>
            <br />
            <input
              type='text'
              name='cdchef'
              value={codechef}
              onChange={(e) => {
                setCodechef(e.target.value);
              }}
              className='Cdchef'
              placeholder='Codechef ID'
            />
            <br />

            <label htmlFor='Hackerrank' name=''>
              Hackerrank ID
            </label>
            <br />
            <input
              type='text'
              name='hckrnk'
              value={hackerrank}
              onChange={(e) => {
                setHackerrank(e.target.value);
              }}
              className='hckrnk'
              placeholder='Hackerrank ID'
            />
            <br />

            <label htmlFor='Spoj' name=''>
              Spoj ID
            </label>
            <br />
            <input
              type='text'
              name='Spoj'
              value={spoj}
              onChange={(e) => {
                setSPOJ(e.target.value);
              }}
              className='Spoj'
              placeholder='Spoj ID'
            />
            <br />

            <label htmlFor='Usertype' name=''>
              UserType
            </label>
            <br />
            <input
              type='text'
              name='usertype'
              value={usertype}
              onChange={(e) => {
                setUserType(e.target.value);
              }}
              className='usertype'
              placeholder='UserType'
            />
            <br />

            <button type='submit' className='register-btn'>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
