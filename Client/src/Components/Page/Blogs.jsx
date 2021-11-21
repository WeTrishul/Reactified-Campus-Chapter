import React from 'react'
import {useState, useEffect} from "react"
import axios from "axios"
import "./Blogs.css"
import { Link } from 'react-router-dom';

function Blogs() {

    const [blogs,setBlogs] = useState([]);


    useEffect(() =>{

        axios.get('http://localhost:3000/allblogs')
        .then(response => {
            return response.data
        }).then(data =>{
            console.log(data)
            setBlogs(data.data.blogs)
        });

    },[])


    



    return (
        <div>
            <div className="blogsButton">
                <button>Blogs</button>
            </div>
            <div className="blogsOuter">
            {blogs.map((data) =>{
                       return(
                        <div className="blogsList" key={data._id}>
                        <Link to={{pathname: "/DisplayBlogs",state:data._id}}>{data.title}</Link>
                          </div>
                       )
            })}
                
            </div>

            <Link to="/WriteBlogs"><button>Write a blog</button></Link>
        </div>
    )
}

export default Blogs
