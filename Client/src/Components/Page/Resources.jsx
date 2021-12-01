import React from 'react';
import './Resources.css';
import { useLocation } from 'react-router-dom';
import AuthContext from '../../Service/auth-context';
import { useContext, useState } from 'react';
import Axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Resources() {
  // const [category,setCategory] = useState({})
  //   const location = useLocation();

  const { categoryname } = useParams();
  // const category = location.state;

  const [userfiles, setUserFiles] = useState([]);

  // setCategory(location.state.message)

  const authCtx = useContext(AuthContext);
  let userid = authCtx.id;

  // useEffect(()=>{
  //     setCategory(location.state.message)
  // },[])

  useEffect(() => {
    var cat = { categoryname };
    var category = cat.categoryname;

    // setCategory(location.state.message)

    Axios({
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/resources/upload/' + category,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);

        // setUserFiles([...userfiles, { value: data.allfiles.files }]);
        // setUserFiles(data.allfiles.files);
        setUserFiles((files) => [...userfiles, data.allfiles.files]);
        // setEvents(data.data.events)
        // setPosts(data.data.posts)
        //     // console.log(data)
      });
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    const inpfiles = document.getElementById('multiFiles');
    var form_data = new FormData();

    console.log(inpfiles.files);

    for (var f of inpfiles.files) {
      form_data.append('resources', f);
    }

    // var option = location.state;
    var name = document.getElementById('name').value;

    // form_data.append('patanhi', option);
    // form_data.append('flag',true)
    form_data.append('name', name);

    // console.log('location wala hoon', category);
    for (var pair of form_data.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    // Axios({
    //     method: "POST",
    //     data: form_data,
    //     withCredentials: true,
    //     url: "http://localhost:3000/resourses/"+userid,
    //   }).then((response) =>{

    //           return response.data

    //       })
    //   .then(data =>{
    //         console.log(data)
    //       //     // console.log(data.data.applyreq.token)
    //       //     // console.log(data.data.applyreq._id)

    //       //     // console.log(data)
    //       });
  };

  return (
    <div>
      <ul>
        {userfiles.map((data, index) => {
          <li key={index}>{data.name}</li>;
        })}
      </ul>
      <div className='main-wrap'>
        <div className='outer-wrap'>
          <h1>Add Event</h1>
          <hr />

          <form
            onSubmit={submitHandler}
            className='register-form'
            enctype='multipart/form-data'
          >
            <label htmlFor='resources'>Upload</label>
            <br />
            <input
              type='file'
              name='resources'
              className='user'
              style={{ borderStyle: 'none' }}
              id='multiFiles'
              multiple
            />
            <br />
            <label htmlFor='name' name=''>
              File Name
            </label>
            <br />
            <input
              type='text'
              name='name'
              className='Codeforces'
              id='name'
              placeholder='File Name'
            />
            <br />

            <button type='submit' className='register-btn'>
              Add Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Resources;
