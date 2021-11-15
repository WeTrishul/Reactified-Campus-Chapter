import React from 'react';
import { useEffect } from 'react';
import DataList from './DataList';

function UserData() {

    const [loading,setLoading] = useState(true);
    const [loadedData,setLoadedData] = useState([]);



    useEffect( () =>{
        fetch('/Anand')
          .then(function(response) {

            var data = response.text().then((data)=>{
                if(data.error)
                {
                    console.log('Node chutiya hai')
                }
                else{
                    const justarray =[];
                    var c = JSON.parse(data);
                    justarray.push(c);
                    setLoading(false);
                    setLoadedData(justarray);
                     console.log(c.firstName)
                }
                
            })
           
          });
    },[])
    
    // useEffect( () =>{
    //     setLoading(true);
    //     fetch('/Anand'
    //     ).then(response => {
    //         return response.json();
    //     }).then(data =>{
    //         const userdata =[];
    //         for(const key in data)
    //         {
    //             const userinform={
    //                 id:key,
    //                ...data[key]
    //             };

    //             userdata.push(userinform);
    //         }
    //         setLoading(false);
    //         setLoadedData(userdata);
    //     });
    // },[]);


    if(loading)
    {
        <section>
            <p>Loading...</p>
        </section>
    }

    

    return (
        <div>
            <DataList e={loadedData}/>
        </div>
    )
}

export default UserData
