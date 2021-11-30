import React from 'react'
import "./Blogs.css";
import {Link} from "react-router-dom"

function UploadResources(props) {



    






    return (
    <div>
        <div className="viewBlogsHeading">
            <h2>Polling Lists</h2>
        </div>
        <div>
            <div className="ViewblogsOuterBox">
                <div className="ViewblogsInnerBox">
     
                    <div className="ViewblogsListBox" >
                        
                    <Link to={{pathname: "/Resources",state: {message: "CP"}}} className="ViewallBlogsLink">CP</Link>
                    </div>
                    <div className="ViewblogsListBox" >
                        
                    <Link to={{pathname: "/Resources",state: {message: "DSA"}}} className="ViewallBlogsLink">DSA</Link>
                    </div>
                    <div className="ViewblogsListBox" >
                        
                    <Link to={{pathname: "/Resources",state: {message: "APTI"}}} className="ViewallBlogsLink">Aptitude</Link>
                    </div>
                    <div className="ViewblogsListBox" >
                        
                    <Link to={{pathname: "/Resources",state: {message: "CORE"}}} className="ViewallBlogsLink">Core Subjects (CS)</Link>
                    </div>
                    <div className="ViewblogsListBox" >
                        
                    <Link to={{pathname: "/Resources",state: {message: "DEV"}}} className="ViewallBlogsLink">Development</Link>
                    </div>
                    <div className="ViewblogsListBox" >
                        
                    <Link to={{pathname: "/Resources",state: {message: "GATE"}}} className="ViewallBlogsLink">Gate</Link>
                    </div>
                    <div className="ViewblogsListBox" >
                        
                    <Link to={{pathname: "/Resources",state: {message: "PLACEMENTS"}}} className="ViewallBlogsLink">Placement</Link>
                    </div>
           
                </div>

            </div>
        </div>
    </div>
    )
}

export default UploadResources
