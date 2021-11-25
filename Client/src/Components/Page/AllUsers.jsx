import React from 'react';
import './AllUsers.css';

import {useEffect,useState} from 'react'
import Axios from 'axios'
function AllUsers() {


    const [allusers,setAllUsers] = useState([]);



    useEffect(() =>{

        // axios.get('http://localhost:3000/listUsers')
        // .then(response => {
        //     return response.data
        // }).then(data =>{
        //     console.log(data)
        //     setAllUsers(data.data.users)
        // });



        Axios({
            method: "GET",
            
            withCredentials: true,
            url: "http://localhost:3000/listUsers",
          }).then((response) =>{
          
                  return response.data
                  
              })
          .then(data =>{
            console.log(data)
            setAllUsers(data.data.users)
              //     // console.log(data)
              });






    },[])


    const deleteHandler = (name) =>{
        name.preventDefault();
        console.log(name.target.id)

        // axios.get('http://localhost:3000/delete/?username='+name.target.id)
        // .then(response => {
        //     return response.data
        // }).then(data =>{
        //     console.log(data)
        //     document.getElementById('tr-'+ name.target.id).remove()
        // });



        Axios({
            method: "GET",
            
            withCredentials: true,
            url: "http://localhost:3000/delete/?username="+name.target.id,
          }).then((response) =>{
          
                  return response.data
                  
              })
          .then(data =>{
            console.log(data)
            document.getElementById('tr-'+ name.target.id).remove()
              //     // console.log(data)
              });



        









    }

    return (
        <div>
            <table className='user-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        
                        <th>Action</th>
                        
                    </tr>
                </thead>
                {allusers.map((data) =>{
                       return(
                        <tbody key={data._id}>
                    <tr id={'tr-'+data.username}>
                        <td>{data.name}</td>
                        
                        <td><button onClick={deleteHandler} id ={data.username} className='table-btn'>Delete</button></td>
                        
                    </tr>
                </tbody>

                       )
                   })}

                
                
                
            </table>
        </div>
    )
}

export default AllUsers
