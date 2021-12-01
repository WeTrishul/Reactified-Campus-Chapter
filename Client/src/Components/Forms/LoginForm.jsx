import React from 'react';
import './LoginForm.css';
import LoginPage from '../Images/LoginPage.svg';
import { Link } from 'react-router-dom';
import { useRef, useContext } from 'react';
import Axios from 'axios';
import AuthContext from '../../Service/auth-context';
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router-dom';

function LoginForm() {
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  let history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const loginDetails = {
      username: enteredUsername,
      password: enteredPassword,
    };

    // console.log(loginDetails);

    // axios.post('http://localhost:3000/login/createsession/',loginDetails
    //     // headers: {
    //     //     "Access-Control-Allow-Origin": "*",
    //     //     'Content-Type' : 'application/json'
    //     // }
    // ).then((response) =>{

    //     return response.data

    // })
    // .then(data =>{
    //     // console.log(data)
    //     // console.log(data.data.applyreq.token)
    //     // console.log(data.data.applyreq._id)

    //     authCtx.userId(data.data.applyreq._id)
    //     authCtx.userName(data.data.applyreq.username)

    //     authCtx.login(data.data.applyreq.token)
    //     history.push("/Dashboard")
    //     // console.log(data)
    // })
    // .catch(err =>{
    //     console.log("error")
    //     alert("Authentication Failed!!");
    // })

    // const login = () => {
    Axios({
      method: 'POST',
      data: {
        username: enteredUsername,
        password: enteredPassword,
      },
      withCredentials: true,
      url: 'http://localhost:3000/login/createsession',
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        //     // console.log(data)
        //     // console.log(data.data.applyreq.token)
        //     // console.log(data.data.applyreq._id)
        authCtx.userId(data.data.applyreq._id);
        authCtx.userName(data.data.applyreq.username);
        authCtx.login(data.data.applyreq.token);
        authCtx.userrole(data.data.applyreq.UserType);
        history.push('/Dashboard');
        //     // console.log(data)
      });
    //   };

    // .then(res => {
    //     // console.log(loginDetails);
    //     // authCtx.login(res.token);
    //     // authCtx.username(res.username);
    //     // console.log("kuch dikkat hai bhai");
    //     console.log(res);
    // }).catch(err => {
    //     console.log("gaand mara");
    //     console.log(err);
    // });

    // fetch('http://localhost:4000/login/createsession',
    // {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         username:enteredUsername,
    //         password: enteredPassword
    //     }),
    //     headers:{
    //         'Content-Type' : 'application/json'
    //     }
    // }).then((res) =>{
    //     if(res.ok){
    //         return res.json();
    //     }
    //     else{
    //         return res.json().then(data =>{

    //             let errorMessage = 'Authentication Failed!';

    //             throw new Error(errorMessage);
    //         });
    //     }
    // }).then(data =>{

    // }).catch(err =>{
    //     alert(err.Message);
    // });
  };

  const responseSuccessGoogle = (response) => {
    // console.log(response);
    // console.log(response.tokenId)
    console.log(response);
    console.log(response.tokenId);
    // const userToken= {
    //     token:response.tokenId
    // }

    // axios.post("http://localhost:3000/login/createsession/",userToken
    // ).then (response =>{
    //     console.log(response);
    // })
  };

  const responseFailGoogle = (response) => {
    console.log(response);
  };

  return (
    <div>
      <section>
        <div className='imgbox'>
          <img src={LoginPage} alt='LoginPage' />
        </div>
        <div className='contentBox'>
          <div className='formBox'>
            <h2>Login</h2>
            <form>
              <div className='inputBox'>
                <span>Username</span>
                <input type='text' required ref={usernameInputRef} />
              </div>
              <div className='inputBox'>
                <span>Password</span>
                <input type='password' required ref={passwordInputRef} />
              </div>
              <div className='remember'>
                <label htmlFor=''>
                  <input type='checkbox' />
                  Remember me
                </label>
              </div>
              <div className='inputBox'>
                <input type='submit' onClick={submitHandler} value='Sign In' />
              </div>
              <div className='inputBox'>
                <p>
                  Dont have an account? <Link to='/SignupData'>Sign Up</Link>
                </p>
              </div>
            </form>
            <GoogleLogin
              clientId='538926290930-la7j10mp0gjt8c3uq9h0bbrt4lutgn0g.apps.googleusercontent.com'
              buttonText='Login with google Account'
              onSuccess={responseSuccessGoogle}
              onFailure={responseFailGoogle}
              cookiePolicy={'single_host_origin'}
            />
            {/* <h3>Login With Google Account</h3> */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginForm;
