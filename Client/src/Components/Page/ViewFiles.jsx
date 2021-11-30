import React from 'react'
import "./Blogs.css"
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {useEffect, useState} from 'react'
import Axios from "axios"

function ViewFiles() {


    const[files,setfiles] = useState([])
    const { foldername } = useParams();
    // var cat = {foldername};
    // var fname = cat.foldername;



    useEffect(()=>{


        var cat = {foldername};
        var fname = cat.foldername;

        Axios({
            method: "GET",
            
            withCredentials: true,
            url: "http://localhost:3000/fileresources/"+fname,
          }).then((response) =>{
          
                  return response.data
                  
              })
          .then(data =>{
            console.log(data)
                setfiles(files => [ ...files, data.arr.files])
              //     // console.log(data)
              });
    },[])

    



    


    return (
        <div className="view-question">
          
            <div className="viewBlogsHeading">
                <h2>View Category</h2>
            </div>
            <div>
            <div className="ViewblogsOuterBox">
            <div className="ViewblogsInnerBox">
            {files.map((data,index) =>{
                       return(
                        <div style={{background:"blue"}} className="ViewblogsListBox" key={index}  >
                        
                        <Link style={{color:"white"}}  className="ViewallBlogsLink">{data.name}</Link>
                    </div>
                       )
                   })}
            
                        
                      
                  
            
            

            </div>
            </div>

            </div>
        </div>
    )
}

export default ViewFiles
