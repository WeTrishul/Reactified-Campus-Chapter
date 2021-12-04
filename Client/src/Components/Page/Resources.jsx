import React from 'react';
import './Resources.css';
import AuthContext from '../../Service/auth-context';
import { useContext, useState } from 'react';
import Axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CircularIndeterminate from '../Layout/CircularIndeterminate';

function Resources() {
  // const [category,setCategory] = useState({})
  //   const location = useLocation();

  const { categoryname } = useParams();
  // const category = location.state;

  var cat = { categoryname };
  var category = cat.categoryname;

  const [userfiles, setUserFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // setCategory(location.state.message)

  const authCtx = useContext(AuthContext);
  let userid = authCtx.id;
  let username = authCtx.username;

  // useEffect(()=>{
  //     setCategory(location.state.message)
  // },[])

  useEffect(() => {
    // var cat = { categoryname };
    // var category = cat.categoryname;

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
        setIsLoading(false);
        setUserFiles(data.allfiles.files);
      });
  }, []);

  const DeleteFilesHandler = (e) => {
    var rid = e.target.id;
    var foldername = username + '_' + category;

    Axios({
      method: 'GET',

      withCredentials: true,
      url:
        'http://localhost:3000/deleteres' +
        rid +
        '/' +
        category +
        '/' +
        foldername,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        document.getElementById('file-' + e.target.id).remove();

        //     // console.log(data)
      });
  };

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

    form_data.append('patanhi', category);
    // form_data.append('patanhi', option);
    // form_data.append('flag',true)
    form_data.append('name', name);

    // console.log('location wala hoon', category);
    // for (var pair of form_data.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }

    Axios({
      method: 'POST',
      data: form_data,
      withCredentials: true,
      url: 'http://localhost:3000/resourses/' + userid,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);

        //     // console.log(data.data.applyreq.token)
        //     // console.log(data.data.applyreq._id)

        //     // console.log(data)
      });
  };

  const viewResourcesRendering = () => {
    if (isLoading) {
      return <CircularIndeterminate />;
    } else {
      return (
        <>
          <div className='view-question'>
            <div className='viewBlogsHeading'>
              <h2>View Files</h2>
            </div>
            <div>
              <div className='ViewblogsOuterBox'>
                <div className='ViewblogsInnerBox'>
                  {userfiles.map((data, index) => {
                    return (
                      <div
                        style={{ display: 'flex' }}
                        id={'file-' + data.ele}
                        style={{ background: 'blue' }}
                        className='ViewblogsListBox'
                        key={index}
                      >
                        <div style={{ width: '90%', paddingLeft: '30px' }}>
                          <a
                            href={'http://localhost:3000' + data.ele}
                            target='_blank'
                            style={{ color: 'white' }}
                            className='ViewallBlogsLink'
                          >
                            {data.name}
                          </a>
                        </div>
                        <div style={{ width: '10%', paddingTop: '15px' }}>
                          <button
                            style={{
                              background: 'blue',
                              borderStyle: 'none',
                              color: 'white',
                            }}
                            id={data.ele}
                            onClick={DeleteFilesHandler}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <div>
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
      {viewResourcesRendering()}
    </div>
  );
}

export default Resources;
