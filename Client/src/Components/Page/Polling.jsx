import React from 'react'
import "./Polling.css"
import {Link} from "react-router-dom"

function Polling() {
    return (
        
        <div>
            <div className="createPoll">
            <Link to='/PollCreate'><button className="pollButton">Create Poll</button></Link>
            </div>
            <div className="wrapper">
                <div class="title">Select your option</div>
                <div className="box">
                    <input type="radio" name="select" id="option-1" />
                    <input type="radio" name="select" id="option-2" />
                    <input type="radio" name="select" id="option-3" />
                    <input type="radio" name="select" id="option-4" />
                    <label htmlFor="option-1" className="option-1">
                        <div className="dot"></div>
                        <div className="text">Option-A</div>
                    </label>
                    <label htmlFor="option-2" className="option-2">
                        <div className="dot"></div>
                        <div className="text">Option-B</div>
                    </label>
                    <label htmlFor="option-3" className="option-3">
                        <div className="dot"></div>
                        <div className="text">Option-C</div>
                    </label>
                    <label htmlFor="option-4" className="option-4">
                        <div className="dot"></div>
                        <div className="text">Option-D</div>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Polling
