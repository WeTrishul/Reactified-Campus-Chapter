import React from 'react'
import {useLocation} from 'react-router-dom';
import {useEffect} from "react";
import {useState} from "react";
import axios from "axios"

function DisplayBlogs() {

    const location = useLocation();
    const [displayBlogs, setDisplayBlogs] = useState({});

    useEffect(() =>{

        console.log("main id ",location.state)

        axios.get('http://localhost:3000/showblog/'+location.state)
        .then(response => {
            return response.data
        }).then(data =>{
            console.log(data)
            setDisplayBlogs(data.blogs)
            let main = document.querySelector("main")
            let str = data.blogs.content
            let strhtml = str;
            main.innerHTML=strhtml;
        });

    },[])



    
    return (
        <div >
            <main></main>
        </div>
    )
}

export default DisplayBlogs
