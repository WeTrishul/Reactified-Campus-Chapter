import React from 'react';
import '../Forms/SignupForm.css';
import {useRef} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom'

// const initialValues ={

//     name:" ",
//     username:" ",
//     email:" ",
//     password:" ",
//     codeforces:" ",
//     hackerrank:" ",
//     spoj: " ",
//     usertype: " "

// }


function SignupData() {



    const nameInputRef = useRef();
    const usernameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const codeforcesInputRef = useRef();
    const codechefInputRef = useRef();
    const hackerrankInputRef = useRef();
    const spojInputRef = useRef();
    const usertypeInputRef = useRef();

    // const [user,setUser] = useState(initialValues);
    // const {name, username, email, password, codeforces, codechef, hackerrank, spoj, usertype} = user;
    
    let history = useHistory();

    // const [name,setName] = useState ('');
    // const [username,setUserName] = useState('');
    // const [email,setEmail] = useState('');
    // const [password,setPassword] = useState('');
    // const [codeforces,setCodeforces] = useState("");
    // const [codechef,setCodechef] = useState("");
    // const [hackerrank,setHackerrank] = useState("");
    // const [spoj,setSPOJ] = useState("");
    // const [usertype,setUserType] = useState("");
    
    function submitHandler(event){

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


        const userDetails ={
            name: enteredName,
            email: enteredEmail,
            password: enteredPassword,
            username: enteredUsername,
            codeforces: enteredCodeforces,
            codechef: enteredCodechef,
            hackerrank: enteredHackerrank,
            spoj: enteredSpoj,
            UserType: enteredUsertype

        };

        console.log(userDetails);

        // const userData ={
        //     name : enteredNmae,
        //     username : enteredUsername,
        //     email : enteredEmail,
        //     password : enteredPassword,
        //     codeforcesid : enteredCodeforces,
        //     codechefid : enteredCodechef,
        //     hackerrankid: enteredHackerrank,
        //     spojid : enteredSpoj,
        //     usertype : enteredUsertype,

        axios.post('http://localhost:3000/signup/createuser',userDetails,{
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        })
        .then(res => {
            console.log(res);
            history.push("/")
            
        }).catch(err => {
            console.log(err);
            console.log("main nhi chal rha hoon bhai")
        });


        



    };

    

    //     // props.onAddSignup(userData);

    // }


    // const submitHandler = async () => {
        
    //     console.log(user);
    // }


    // const onValueChange = (e) =>{
    //     console.log(e.target.value);
    //     setUser({...user, [e.target.name]: e.target.value})
    // }


    return (
        <div>
            <div className="main-wrap">
                <div className="outer-wrap">
                    <h1>Sign In</h1>
                    <hr />
                    
                    <form action="" onSubmit={submitHandler} className="register-form">
                        <label htmlFor="Name">Name</label><br />
                        <input ref={nameInputRef} type="text" name= 'name'  className='name' placeholder='Name' /><br/>

                        <label htmlFor="Username">Username</label><br />
                        <input ref={usernameInputRef} type="text" name='username'  className='user' placeholder='Username' /><br />

                        <label htmlFor="Email">Email</label><br />
                        <input ref={emailInputRef} type="email" name='email'  className='email' placeholder='Email'/><br />

                        <label htmlFor="Password" name=''>Password</label><br />
                        <input ref={passwordInputRef} type="password" name='password'  className='pass' placeholder='Password' /><br />

                        <label htmlFor="Codeforces" name=''>Codeforces ID</label><br />
                        <input ref={codeforcesInputRef} type="text" name='codeforces'  className='Codeforces' placeholder='Codeforces ID' /><br />

                        <label htmlFor="Codechef" name=''>Codechef ID</label><br />
                        <input ref={codechefInputRef} type="text" name='codechef' className='Cdchef' placeholder='Codechef ID'/><br />

                        <label htmlFor="Hackerrank" name=''>Hackerrank ID</label><br />
                        <input ref={hackerrankInputRef} type="text" name='hackerrank'  className='hckrnk' placeholder='Hackerrank ID' /><br />

                        <label htmlFor="Spoj" name=''>Spoj ID</label><br />
                        <input ref={spojInputRef} type="text" name='spoj' className='Spoj' placeholder='Spoj ID' /><br />

                        <label htmlFor="Usertype" name=''>UserType</label><br />
                        <input ref={usertypeInputRef} type="text" name='usertype'  className='usertype' placeholder='UserType' /><br />

                        <button type='submit'  className="register-btn">Register</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignupData
