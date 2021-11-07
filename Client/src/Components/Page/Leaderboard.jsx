import React from 'react'
import './Leaderboard.css'
import axios from 'axios';
import {useEffect,useState} from 'react'

function Leaderboard() {


    const [board,setBoard] = useState([]);

    useEffect(() =>{

        axios.get('http://localhost:3000/Leaderboards')
        .then(response => {
            return response.data
        }).then(data =>{
            console.log(data)
            
            
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
