import React from 'react'
import "./Polling.css"
import {Link} from "react-router-dom"
import {useEffect} from "react"
import Axios from 'axios'

import {useState} from "react"
import AllEvents from './AllEvents'




function Polling() {
    const [allpolls,setPolls] = useState([])



    useEffect(() =>{


        Axios({
            method: "GET",
            
            withCredentials: true,
            url: "http://localhost:3000/viewAllPolls",
          }).then((response) =>{
          
                  return response.data
                  
              })
          .then(data =>{
            console.log(data)
            setPolls(data.data.allPolls)
              //     // console.log(data)
              });
              
    },[])






    return (
        
        <div>
            <div className="createPoll">
            <Link to='/PollCreate'><button className="pollButton">Create Poll</button></Link>
            </div>

            {allpolls.map((data) =>{
                       return(
                        // <div id={'blog-'+data._id} className="blogsList" key={data._id}>
                        // <Link to={{pathname: "/DisplayBlogs",state:data._id}}>{data.title}</Link>
                        // <span><button onClick={blogsDeleteHandler} id={data._id}>Delete</button></span>
                        // <span><Link to={{pathname: "/EditBlog",state:data._id}}>Edit</Link></span>
                        // </div>

                        <div id={'poll-'+data._id} className="blogsListBox" key={data._id}>
                        <div className="blogsTitleBox">
                            <Link className="blogsTitleLink" to={"/DisplayPoll/"+data._id}>{data.pollName}</Link>
                        </div>
{/* 
                        <div className="blogsEditBox">
                            <Link to={{pathname: "/EditBlog",state:data._id}}><button className="blogsEditButton">Edit</button></Link>
                        </div>
                        <div className="blogsDeleteBox">
                            <button className="blogsDeleteButton" onClick={blogsDeleteHandler} id={data._id}>Delete</button>
                        </div>
                         */}
                        </div>
                    
                          
                       )
            })}

            {/* <div className="wrapper">
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
            </div> */}
        </div>
    )
}

export default Polling
