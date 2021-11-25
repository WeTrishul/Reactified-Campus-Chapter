import React from 'react'
import './Leaderboard.css'
import Axios from 'axios';
import {useEffect,useState} from 'react'

function Leaderboard() {


    const [board,setBoard] = useState([]);

    useEffect(() =>{

        // axios.get('http://localhost:3000/Leaderboards')
        // .then(response => {
        //     return response.data
        // }).then(data =>{
        //     console.log(data)
            
            
        // });


        Axios({
            method: "GET",
            
            withCredentials: true,
            url: "http://localhost:3000/Leaderboards",
          }).then((response) =>{
          
                  return response.data
                  
              })
          .then(data =>{
            console.log(data)
                // setBlogs(data.data.blogs)
                // setEvents(data.data.events)
                // setPosts(data.data.posts)
              //     // console.log(data)
              });






    },[])


    return (
        <div>
            <h1>Leaderboard</h1>
            <div className="toplist">

            {board.map((data) =>{
                       return(
                        <div className="listbox">
                    <div className="list">
                        <div className="name-list">
                        <h3>Shivam Sharma</h3>
                        </div>
                        <div className="rating-list">
                        <h3>Rating: 1200</h3>
                        </div>
                        <div className="rank-list">
                        <h3>Rank : 1</h3>
                        </div>
                    </div>
                    </div>
                    )
                })}
            </div>
                
                

                
        </div>
    )
}

export default Leaderboard
