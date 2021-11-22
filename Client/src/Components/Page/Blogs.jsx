import React from 'react'
import {useState, useEffect} from "react"
import axios from "axios"
import "./Blogs.css"
import { Link } from 'react-router-dom';
import AuthContext from '../../Service/auth-context';
import {useContext} from "react"

function Blogs() {


    const authCtx = useContext(AuthContext)
    let userId = authCtx.id;

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


    // const blogsDeleteHandler = (blog) =>{
    //     blog.preventDefault();

    //     axios.post('http://localhost:3000/deleteblog/'+blog.target.id){
    //         headers: {
    //             "Access-Control-Allow-Origin": "*",
    //         }
    //     })
    //     .then(res => {
    //         console.log(res);
    //         document.getElementById('blog-'+ blog.target.id).remove()
    //     }).catch(err => {
    //         console.log(err);
            
    //         console.log("main nhi chal rha hoon bhai")
    //     });


        // const blogsDeleteHandler = (blog) =>{
        //     blog.preventDefault();
        //     console.log(blog.target.id)
    
        //     axios.get('http://localhost:3000/deleteblog/?id='+blog.target.id)
        //     .then(response => {
        //         return response.data
        //     }).then(data =>{
        //         console.log(data)
        //         document.getElementById('blog-'+ blog.target.id).remove()
        //     });
    
        // }


        const blogsDeleteHandler = (blog) =>{
            

            const blogData ={
                userid:userId,
                blogid:blog.target.id
            }

            axios.post('http://localhost:3000/deleteblog/',blogData,{
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        })
        .then(res => {
            console.log(res);
            document.getElementById('blog-'+ blog.target.id).remove()
            
        }).catch(err => {
            console.log(err);
            console.log("main nhi chal rha hoon bhai")
        });
        }

        
        
    
    



    return (
        <div>
            <div className="blogsButton">
                <button>Blogs</button>
            </div>
            <div className="blogsOuter">
            {blogs.map((data) =>{
                       return(
                        <div id={'blog-'+data._id} className="blogsList" key={data._id}>
                        <Link to={{pathname: "/DisplayBlogs",state:data._id}}>{data.title}</Link>
                        <span><button onClick={blogsDeleteHandler} id={data._id}>Delete</button></span>
                        <span><Link to={{pathname: "/EditBlog",state:data._id}}>Edit</Link></span>
                          </div>
                          
                       )
            })}
                
            </div>

            <Link to="/WriteBlogs"><button>Write a blog</button></Link>
        </div>
    )
        }

export default Blogs
