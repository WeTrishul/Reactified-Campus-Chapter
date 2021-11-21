import React from 'react'
import './AddEvent.css'

function AddEvent() {
    return (
        <div>
            <div className="main-wrap">
                <div className="outer-wrap">
                    <h1>Add Event</h1>
                    <hr />
                    
                    <form  className="register-form">
                        
                        <label htmlFor="Banner">Banner</label><br />
                        <input type="file" name='user' className='user' style={{borderStyle:"none"}} /><br />

                        <label htmlFor="About Event">About Event</label><br />
                        <input type="text" name='email'  className='email' placeholder='About Event'/><br />

                        <label htmlFor="Event Name" >Event Name</label><br />
                        <input type="text" name='pass'  className='pass' placeholder='Event Name' /><br />

                        <label htmlFor="Event Date" >Event Date</label><br />
                        <input type="text" name='cdfrce'  className='Codeforces' placeholder='Event Date' /><br />

                        <label htmlFor="Start Time">Start Time</label><br />
                        <input type="text" name='cdchef'  className='Cdchef' placeholder='Start Time'/><br />

                        <label htmlFor="End Time" name=''>End Time</label><br />
                        <input type="text" name='hckrnk'  className='hckrnk' placeholder='End Time' /><br />

                        <button type='submit' className="register-btn">Add Event</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddEvent
