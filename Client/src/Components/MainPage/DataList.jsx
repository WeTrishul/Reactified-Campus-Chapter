import React from 'react'
import DashBoard from '../Page/DashBoard'

function DataList(props) {
    return (

        <ul>
            {props.e.map((e) =>
            <DashBoard 
            key={e.id}
            id={e.id}
            name={e.firstName}
            />
            
            )}
        </ul>





    //    <ul>
    //        {props.event.map((e) =>
    //        <DashBoard 
    //        key={e.id}
    //        id={e.id}
    //        codechef={e.codechefid}
    //        codeforces={e.codeforcesid}
    //        email={e.email}
    //        hackerrank={e.hackerrankid}
    //        name={e.name}
    //        spoj={e.spojid}
    //        username={e.username}
    //        usertype={e.usertype}
           
    //        />)}
    //    </ul>
    )
}

export default DataList
