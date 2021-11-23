import React from 'react'
import GroupIcon from '@material-ui/icons/Group';
import HelpIcon from '@material-ui/icons/Help';
import {useEffect,useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

function ViewAllPoll() {
    const [allpolls,setAllpolls] = useState([]);


    useEffect(() =>{

        axios.get('http://localhost:3000/viewAllPolls')
        .then(response => {
            
            console.log(response.data.data.allPolls)
            setAllpolls(response.data.data.allPolls)
            return response.data
        }).then(data =>{
            
        });

    },[])

    return (
        <div>
           <div className="outerr">
               <div className="setq-box">
                   <div className="heading">
                       <h2>Hello mai idhar hun</h2>
                   </div>
               <div>
                
               {allpolls.map((data) =>{
                       return(

                       
                       
                       

                        <div key={data._id}>

<div className="fab-holder">
    <Link to={{pathname: `/viewPagePoll/${data._id}`}}><i className="add-icon">{data.pollName}</i></Link>
</div>
</div>


                       )
                   })}

            </div>
               </div>
           </div>
        </div>
    )
}

export default ViewAllPoll
