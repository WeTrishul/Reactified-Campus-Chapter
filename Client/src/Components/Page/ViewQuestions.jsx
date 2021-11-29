import React from 'react'
import {useEffect, useState, useContext} from "react"
import AuthContext from '../../Service/auth-context';
import Axios from 'axios';

function ViewQuestions() {


    const authCtx = useContext(AuthContext);
    let userId=authCtx.id;


    useEffect(() =>{
        Axios({
            method: "GET",
            
            withCredentials: true,
            url: "http://localhost:3000/seeQ/"+userId,
          }).then((response) =>{
          
                  return response.data
                  
              })
          .then(data =>{
            console.log(data)
                
              //     // console.log(data)
              });
    },[])






    return (
        <div className="view-question">
            
        </div>
    )
}

export default ViewQuestions
