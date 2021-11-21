import React from 'react'
import './SetQuestions.css';

function SetQuestions() {


    const hiddenFileInput = React.useRef(null);


    const handleClick = () =>{

        hiddenFileInput.current.click();

    }


    return (
        
           <div class="wrapper">
    <header>File Uploader JavaScript</header>
    <form action="#">
      <input class="file-input" ref={hiddenFileInput} type="file" name="file" hidden/>
      <i class="fas fa-cloud-upload-alt"></i>
      <p onClick={handleClick}>Browse File to Upload</p>
    </form>
    <section class="progress-area"></section>
    <section class="uploaded-area"></section>
  </div>
    )
}

export default SetQuestions
