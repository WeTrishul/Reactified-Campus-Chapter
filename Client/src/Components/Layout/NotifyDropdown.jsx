import React from 'react'
import "./Dropdown.css"



function NotifyDropdown({notifications}) {
    return (
        <div className='dropdown' style={{float:"right"}}>
            {/* <div className="dropdown-btn"><AccountCircleRoundedIcon/></div> */}
            <div className="notifydropdown-content">
                <div className="notifydropdown-item">
                {notifications.map((data,index) =>{
                       return(
                        <div className="notify-content" key={index}>
                        {data.msg}
                        <hr className="notify-border" />
                        
                    </div>
                       )
                   })}
                
                </div>
                
            </div>
        </div>
    )
}

export default NotifyDropdown
