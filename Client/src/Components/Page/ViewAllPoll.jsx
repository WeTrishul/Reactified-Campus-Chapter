import React from 'react'
import GroupIcon from '@material-ui/icons/Group';
import HelpIcon from '@material-ui/icons/Help';
import {useEffect,useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import "./Blogs.css"

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
                   <div className="viewBlogsHeading">
                       <h2>Polling Lists</h2>
                   </div>
               <div>
               <div className="ViewblogsOuterBox">
    <div className="ViewblogsInnerBox">
                
               {allpolls.map((data) =>{
                       return(

                       
                       
                       

                        
        <div className="ViewblogsListBox" key={data._id}>
        <Link className="ViewallBlogsLink" to={{pathname: `/viewPagePoll/${data._id}`}}>{data.pollName}</Link>
        </div>
    


                       )
                   })}
                   
</div>

            </div>
        </div>
        </div>
    )
}



{/* <div className="ViewblogsOuterBox">
    <div className="ViewblogsInnerBox">
        <div className="ViewblogsListBox" key={data._id}>
        <Link to={{pathname: `/viewPagePoll/${data._id}`}}><i className="add-icon">{data.pollName}</i></Link>
        </div>
    </div>
</div> */}
export default ViewAllPoll
