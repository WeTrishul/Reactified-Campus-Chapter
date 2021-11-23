import React from 'react'
import "./PollCreate.css"
import {useHistory} from 'react-router-dom'
import {useRef, useContext} from 'react';
import axios from 'axios';
import AuthContext from '../../Service/auth-context';

function PollCreate() {

    const pollnameInputRef = useRef();
    const questionInputRef = useRef();
    const optionAInputRef = useRef();
    const optionBInputRef = useRef();
    const optionCInputRef = useRef();
    const optionDInputRef = useRef();



    const authCtx = useContext(AuthContext)
    let userId = authCtx.id;

    let history = useHistory();


    const submitHandler = (event) => {
        event.preventDefault();

        // const pollName = pollnameInputRef.current.value;
        

        const pollData = {
            pollName:pollnameInputRef.current.value,
            question:questionInputRef.current.value,
            optionA:optionAInputRef.current.value,
            optionB:optionBInputRef.current.value,
            optionC:optionCInputRef.current.value,
            optionD:optionDInputRef.current.value

        };
       

        axios.post('http://localhost:3000/poll/createpoll',pollData,
            // headers: {
            //     "Access-Control-Allow-Origin": "*",
            //     'Content-Type' : 'application/json'
            // }
        ).then((response) =>{
            
            console.log(response)

            return response.data
            
        })
        .then(data =>{
            // console.log(data)
            // console.log(data.data.applyreq.token)
            // console.log(data.data.applyreq._id)
            
            // authCtx.userId(data.data.applyreq._id)
            // authCtx.userName(data.data.applyreq.username)
            
            // authCtx.login(data.data.applyreq.token)
            history.push("/Polling")
            // console.log(data)
        })
        .catch(err =>{
            console.log("error")
            alert("Poll Failed!!");
        })





        


    }



    // const responseSuccessGoogle = (response) =>{
    //     // console.log(response);
    //     // console.log(response.tokenId)
    //     console.log(response)
    //     console.log(response.tokenId)
        // const userToken= {
        //     token:response.tokenId
        // }
        
        // axios.post("http://localhost:3000/login/createsession/",userToken
        // ).then (response =>{
        //     console.log(response);
        // })
    // }

    // const responseFailGoogle = (response) =>{
    //     console.log(response);
    // }



    return (
        <div>
            <div className="main-wrap">
                <div className="outer-wrap">
                    <h1>Create Poll</h1>
                    <hr />
                    
                    <form  className="register-form">

                        <label htmlFor="Poll Name">Poll Name</label><br />
                        <input type="text" name='email' className='email' placeholder='ex:Survey Poll'ref={pollnameInputRef}/><br />

                        <label htmlFor="Question" >Question</label><br />
                        <input type="text" name='pass'  className='pass' placeholder='ex: Which platform is good for biginners ?' ref={questionInputRef} /><br />

                        <label htmlFor="Option A" >Option A</label><br />
                        <input type="text" name='cdfrce'  className='Codeforces' placeholder='ex:Codeforces' ref={optionAInputRef} /><br />

                        <label htmlFor="Option B">Option B</label><br />
                        <input type="text" name='cdchef'  className='Cdchef' placeholder='Codechef' ref={optionBInputRef}/><br />

                        <label htmlFor="Option C" >Option C</label><br />
                        <input type="text" name='hckrnk'  className='hckrnk' placeholder='ex: Geeksforgeeks' ref={optionCInputRef} /><br />

                        <label htmlFor="Option D" >Option D</label><br />
                        <input type="text" name='hckrnk'  className='hckrnk' placeholder='ex: Hackerrank' ref={optionDInputRef}/><br />


                        <button type='submit' onClick={submitHandler} className="register-btn">Create Poll</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default PollCreate
