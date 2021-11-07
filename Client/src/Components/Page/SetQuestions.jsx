import React from 'react'
import './SetQuestions.css';

function SetQuestions() {
    return (
        <div>
           <div className="outerr">
               <div className="setq-box">
                   <div className="heading">
                       <h2>Hello, Submit your PDF</h2>
                   </div>
               <div>
                <form className='question-form' >
                    <input type="file" />
                </form>
            </div>
               </div>
           </div>
        </div>
    )
}

export default SetQuestions
