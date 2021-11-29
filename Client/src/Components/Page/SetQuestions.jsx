import React from 'react'
import './SetQuestions.css';
import {useState, useContext} from 'react';
import AuthContext from '../../Service/auth-context';
import Axios from "axios"
import { useHistory } from 'react-router';

function SetQuestions(props) {

    const authCtx = useContext(AuthContext)
    let userid=authCtx.id;

    let history= useHistory();


  // const [file,setFile] = useState([])
  //   const hiddenFileInput = React.useRef(null);
    
    
  const submitHandler = (e) =>{

    e.preventDefault();

    var form_data = new FormData();

        const inpfiles = document.getElementById('multiFiles')
        


        for(var f of inpfiles.files)
            {
                form_data.append('questions',f)
            }

    Axios({
        method: "POST",
         
        data:form_data,
        headers: { "Content-Type": "multipart/form-data" },
        
        withCredentials: true,
        url: "http://localhost:3000/fileupload/setquestions/"+userid,
      }).then(res => {
        console.log(res);
        history.push("/ViewQuestions")
        
        
    }).catch(err => {
        console.log(err);
        console.log("main nhi chal rha hoon bhai")
    });
    
  }

  //   const handleClick = () =>{

  //       hiddenFileInput.current.click();

  //   }

  //   const handleChange = event => {
  //     const fileUploaded = event.target.files[0];
  //     console.log(fileUploaded)
  //     setFile(fileUploaded)
     
  //     // props.handleFileInput(fileUploaded);
  //   };




    return (
        
  //          <div class="wrapper">
  //   <header>File Uploader JavaScript</header>
  //   <form action="#">
  //     <input class="file-input" ref={hiddenFileInput} type="file" name="file" onChange={handleChange} hidden/>
  //     <i class="fas fa-cloud-upload-alt"></i>
  //     <p onClick={handleClick}>Browse File to Upload</p>
  //   </form>
    
  //   <section class="uploaded-area">
  //     <div className="nameFileUpload">

  //     </div>
  //     <div className="SubmitButton">Submit</div>
  //   </section>
  // </div>


  <div>
            <div className="main-wrap">
                <div className="outer-wrap">
                    <h1>Add Event</h1>
                    <hr />
                    
                    <form onSubmit={submitHandler} className="register-form" enctype="multipart/form-data">
                        
                        <label htmlFor="Banner">Banner</label><br />
                        <input type="file" name="questions" className='user' style={{borderStyle:"none"}} id="multiFiles" multiple/><br />

                        
                        <button type='submit' className="register-btn">Add Event</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default SetQuestions
