import React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import './Blogs.css';
import { Link } from 'react-router-dom';
import AuthContext from '../../Service/auth-context';
import { useContext } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import * as noti from '../../Service/socket';
import Animations from '../Layout/Animation';
import CircularIndeterminate from '../Layout/CircularIndeterminate';

function Blogs() {
  const authCtx = useContext(AuthContext);
  let userId = authCtx.id;
  let username = authCtx.username;

  // const socket = React.useContext(SocketContext)

  const [blogs, setBlogs] = useState([]);
  const [isLoading, setLoading] = useState(true);

  // noti.Notiengineconnect(username)

  // noti.ChatNoticonnect()
  // noti.JoinCore(userId)

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
        //     // console.log(data)
      });

    // return () =>{
    //     console.log('Hi buddy')
    // }
  }, []);

  // const blogsDeleteHandler = (blog) =>{
  //     blog.preventDefault();

  //     axios.post('http://localhost:3000/deleteblog/'+blog.target.id){
  //         headers: {
  //             "Access-Control-Allow-Origin": "*",
  //         }
  //     })
  //     .then(res => {
  //         console.log(res);
  //         document.getElementById('blog-'+ blog.target.id).remove()
  //     }).catch(err => {
  //         console.log(err);

  //         console.log("main nhi chal rha hoon bhai")
  //     });

  // const blogsDeleteHandler = (blog) =>{
  //     blog.preventDefault();
  //     console.log(blog.target.id)

  //     axios.get('http://localhost:3000/deleteblog/?id='+blog.target.id)
  //     .then(response => {
  //         return response.data
  //     }).then(data =>{
  //         console.log(data)
  //         document.getElementById('blog-'+ blog.target.id).remove()
  //     });

  // }

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

  const blogsRendering = () => {
    if (isLoading) {
      return (
        <div>
          <CircularIndeterminate />
        </div>
      );
    } else {
      return (
        <div>
          <div className='blogsOuterBox'>
            <div className='blogsInnerBox'>
              {blogs.map((data) => {
                return (
                  <div
                    id={'blog-' + data._id}
                    className='blogsListBox'
                    key={data._id}
                  >
                    <div className='blogsTitleBox'>
                      <Link
                        className='blogsTitleLink'
                        to={{ pathname: '/DisplayBlogs', state: data._id }}
                      >
                        {data.title}
                      </Link>
                    </div>

                    <div className='blogsEditBox'>
                      <Link to={{ pathname: '/EditBlog', state: data._id }}>
                        <button className='blogsEditButton'>Edit</button>
                      </Link>
                    </div>
                    <div className='blogsDeleteBox'>
                      <button
                        className='blogsDeleteButton'
                        onClick={blogsDeleteHandler}
                        id={data._id}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
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
  };

  return <>{blogsRendering()}</>;
}

export default Blogs;
