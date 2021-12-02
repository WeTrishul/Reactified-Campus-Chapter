import React from 'react'
import {useState, useEffect} from "react";
import Axios from "axios";
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./AllEvents.css";


function GlobalEvents() {

    const [codechefevents,setCodechef] = useState()

    const [codeForces,setCodeForces] = useState()




    const {platform} = useParams()

    useEffect(()=>{

        console.log({platform})

        const x = {platform}

        const Plat = x.platform

        Axios({
            method: "GET",
            
            withCredentials: true,
            url: "http://localhost:3000/globalevents/"+Plat,
          }).then((response) =>{
          
                  return response.data
                  
              })
          .then(data =>{
            console.log(data)
            // setBlogs(data.data.blogs)
              //     // console.log(data)
            if(data.query=='CodeForces')
            {
                setCodeForces(data.result)
            }

              });

    },[])


    return (
        <div>


{codeForces && codeForces.map((data) => {
    return (

        <div style={{width:"100%", height:"auto"}} className="outerCard">
            <div style={{width:"100%", height:"70vh", padding:"1rem"}} className="innerCard">
                <div  style={{display:"flex"}} className="cardComponent">
                    <div style={{margin:"10px"}} className="EventsCard">
                    <Card sx={{ maxWidth: 345 }}>
  <CardMedia
    component="img"
    height="140"
    image="https://cdn.dribbble.com/users/70628/screenshots/1743345/codechef.png"
    alt="green iguana"
  />
  <CardContent>
    <Typography gutterBottom variant="h5" component="div">
      Codechef
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Lizards are a widespread group of squamate reptiles, with over 6,000
      species, ranging across all continents except Antarctica
    </Typography>
  </CardContent>
  <CardActions>
    <Button size="small">Share</Button>
    <Button size="small">Learn More</Button>
  </CardActions>
</Card>
                    </div>
                    <div style={{margin:"10px"}} className="EventsCard">
                    <Card sx={{ maxWidth: 345 }}>
 
 
</Card>
                    </div>
                </div>
                
            </div>
        </div>


    
    );
  })}
        
           
    </div>
    )
}

export default GlobalEvents
