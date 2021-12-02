import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import './Blogs.css';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

function ViewCategory() {
  const [files, setFiles] = useState([]);

  const { categoryname } = useParams();

  // useEffect(()=>{
  //     setCategory(location.state.message);

  // },[])

  // const[category,setCategory] = useState(location.state.message)

  useEffect(() => {
    var cat = { categoryname };
    var category = cat.categoryname;

    console.log('ja gaand mara', category);

    Axios({
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/resourses/' + category,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        // console.log(categoryname);
        console.log(data.arr);
        // setFiles(data.arr.name)
        setFiles((files) => [...files, data.arr]);
        // setFiles([...files, { data: data.arr }]);
        // setFiles(data.arr)
        // setBlogs(data.data.blogs)
        // setEvents(data.data.events)
        // setPosts(data.data.posts)
        //     // console.log(data)
      });
  }, []);

  return (
    <div className='view-question'>
      <div className='viewBlogsHeading'>
        <h2>View Category</h2>
      </div>
      <div>
        <div className='ViewblogsOuterBox'>
          <div className='ViewblogsInnerBox'>
            {files &&
              files.map((data, index) => {
                return (
                  <div
                    style={{ background: 'yellow' }}
                    className='ViewblogsListBox'
                    key={index}
                  >
                    <Link
                      to={'/ViewFiles/' + data[index].name}
                      style={{ color: 'red' }}
                      className='ViewallBlogsLink'
                    >
                      {data[index].name}
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCategory;
