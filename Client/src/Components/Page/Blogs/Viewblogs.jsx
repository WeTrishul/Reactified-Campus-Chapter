import { Card } from '@mui/material';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import AuthContext from '../../../Service/auth-context';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import './Viewblogs.css';

function Viewblogs() {
  let history = useHistory();

  const authCtx = useContext(AuthContext);
  let userId = authCtx.id;
  let username = authCtx.username;

  const [blogs, setBlogs] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    Axios({
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/allblogs',
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        setLoading(false);
        setBlogs(data.data.blogs);
      });
  }, []);

  const blogsDeleteHandler = (blog) => {
    const blogData = {
      userid: userId,
      blogid: blog.target.id,
    };

    Axios({
      method: 'POST',
      data: {
        userid: userId,
        blogid: blog.target.id,
      },

      withCredentials: true,
      url: 'http://localhost:3000/deleteblog/',
    })
      .then((res) => {
        console.log(res);
        document.getElementById('blog-' + blog.target.id).remove();
      })
      .catch((err) => {
        console.log(err);
        console.log('main nhi chal rha hoon bhai');
      });
  };

  return (
    <div>
      <div className='body-blogs-Box'>
        <div className='blogs-Outer-Box'>
          <div className='blogs-Inner-Box'>
            <div className='blogs-Heading'>
              <h2>Latest Blogs</h2>
              <hr className='blogs-HorizontalLine' />
            </div>
            {blogs.map((data) => {
              return (
                <div
                  className='blogs-Container-Box'
                  id={'blog-' + data._id}
                  key={data._id}
                >
                  {/* <div onClick={blogsDisplay} className='blogs-content-Box'> */}
                  <div className='blogs-content-Box'>
                    <Link
                      className='blogsTitleLink'
                      to={{ pathname: '/DisplayBlogs', state: data._id }}
                    >
                      <Card
                        style={{
                          height: 'auto',
                          borderRadius: '20px',
                        }}
                      >
                        <div className='blogs-userImage-Name-Time'>
                          <div className='blogs-userImg-Container'>
                            <img
                              className='blogs-User-Image'
                              src={data.userid.dp}
                              alt=''
                            />
                          </div>
                          <div className='blogs-userName'>
                            {data.userid.username}
                          </div>
                          <div className='blogs-postTime'>
                            <span>
                              <AccessTimeFilledIcon />
                            </span>
                            <span>1hr ago</span>
                          </div>
                        </div>
                        <div className='blogs-Post-Heading-Content'>
                          {data.title}
                        </div>
                        <div className='blogs-Post-Content'>
                          {data.description}
                        </div>
                      </Card>
                    </Link>
                  </div>
                  <div className='blogs-Delete-Edit-Box'>
                    <div>
                      <Link to={{ pathname: '/EditBlog', state: data._id }}>
                        <button className='blogs-EditBtn'>EDIT</button>
                      </Link>
                    </div>
                    <div>
                      <button
                        className='blogs-DeleteBtn'
                        onClick={blogsDeleteHandler}
                        id={data._id}
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            <div>
              <hr className='blogs-end-Line' />
            </div>
          </div>
        </div>
      </div>
      <Link to='/WriteBlogs'>
        <button className='writeBlogsButton'>
          <CreateIcon /> <span>Write blogs</span>
        </button>
      </Link>
    </div>
  );
}

export default Viewblogs;
