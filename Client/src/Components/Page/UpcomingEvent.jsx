import './UpcomingEvent.css';
import FormTable from '../Images/FormTable.svg'
import axios from 'axios'
import {useContext, useEffect} from 'react'
import {useState} from 'react'
import {Link} from "react-router-dom"
import AuthContext from '../../Service/auth-context';

function UpcomingEvent()
{

    const authCtx=useContext(AuthContext)
    let userId = authCtx.id;

    const [eve,setEve]=useState([]);

    useEffect(() =>{

        axios.get('http://localhost:3000/UpcomingEvents')
        .then(response => {
            return response.data
        }).then(data =>{
            console.log(data)
            setEve(data.data.events)
            
        });

    },[])

    const eventHandler = (apiId) =>{
        
        apiId.preventDefault();
        

        axios.get('http://localhost:3000/RegisterForEvent/?id='+apiId.target.id+'&userid='+userId)
        .then(response =>{
            return response.data
        }).then(data =>{
            console.log(data)
            alert('Registration Successfull')
        })
    }

    const renderButton = (data) =>{

        if(data.Registeredusers.includes(userId)){
            return(<button style={{background:'green'}} id={data._id} className='event-btn btn-event'>Register</button>)
            }else{
                
            return(<button onClick={eventHandler} id={data._id} className='event-btn btn-event'>Register</button>)
        }

    }

    return (
        <div>
            <div className='divEventButton'>
            <Link to='/AddEvent'><button className='eventAddButton'>Add Event</button></Link>
            </div>
            {eve.map((data) =>{
                
                       return(
                        <div className="event-box">
                        <div className="event-banner" key={data._id}>
                            
                            <div className="events-imagebox">
                            <img className='image-img' src={'http://localhost:3000/'+data.eventbanner}/>
                            </div>
                            <div className="events-contentBox">
                            <h2>{data.eventname}</h2>
                            <p>{data.eventDate}
                            {data.eventStartTime}
                            {data.eventEndTime}
                            <div>
                            Registered Users : {data.Registeredusers.length}
                            </div>
                            </p>
                            {
                                renderButton(data)
                            }
                            </div>
                        
                        </div>
                    </div>
                    )
                       
                   })}
        </div> 
    )
}

export default UpcomingEvent;
