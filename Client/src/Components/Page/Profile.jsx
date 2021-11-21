import React from 'react'
import Chart from './Chart';
import './Profile.css';


function Profile() {
    return (
        <div>
           <div className="profile-page">
               <div className="side-img-display">
                   <div className="profile-img">
                       IMAGE
                   </div>
                   
                   <div className="profile-details">
                       Father of frontend
                   </div>
               </div>
               <div className="achievements">
                    <div className="achievement-box">
                        <div className="rating">
                            <div>
                                Rating
                            </div>
                            <div>
                                800
                            </div>
                        </div>
                        <div className="contribution">
                            <div>
                                Contribution
                            </div>
                            <div>
                                376
                            </div>
                        </div>
                    </div>
               </div>
               
               <div className="personal-details">
                   <div className="personalDetails">
                       <div>
                       Name: Anand kumar Choudhary
                       </div>
                       <div>
                       College: University of Engineering and Management, kolkata
                       </div>
                       <div>
                       Year: 3rd
                       </div>
                   </div>
                   <div className="graphProfile">
                       <Chart/>
                   </div>
               </div>

               <div className="only-space">
               </div>
               
           </div>
        </div>
    )
}

export default Profile
