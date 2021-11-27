import React from 'react'
import './SetQuestions.css';
import {useState} from 'react';

function SetQuestions(props) {



  const [file,setFile] = useState([])
    const hiddenFileInput = React.useRef(null);
    

    const handleClick = () =>{

        hiddenFileInput.current.click();

    }

    const handleChange = event => {
      const fileUploaded = event.target.files[0];
      console.log(fileUploaded)
      setFile(fileUploaded)
     
      // props.handleFileInput(fileUploaded);
    };

    const upload = () =>{
      if(file.length==0)
      {
        return(
          <p>Loading.....</p>
        )
      }
      else{
        {file.map((data,index) =>{
          return(
              <div key={index}>
                  {data.name}
              </div>
          )
      })}
      }
    }


    return (
        
           <div class="wrapper">
    <header>File Uploader JavaScript</header>
    <form action="#">
      <input class="file-input" ref={hiddenFileInput} type="file" name="file" onChange={handleChange} hidden/>
      <i class="fas fa-cloud-upload-alt"></i>
      <p onClick={handleClick}>Browse File to Upload</p>
    </form>
    <section class="progress-area"></section>
    <section class="uploaded-area">
  
  {upload()}
    </section>
  </div>
    )
}

export default SetQuestions
