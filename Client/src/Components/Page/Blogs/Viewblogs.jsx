import { Card } from '@mui/material';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import './Viewblogs.css';
function Viewblogs() {
  let history = useHistory();
  const blogsDisplay = () => {
    history.push('/DisplayBlogs');
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
            <div className='blogs-Container-Box'>
              <div onClick={blogsDisplay} className='blogs-content-Box'>
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
                        src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
                        alt=''
                      />
                    </div>
                    <div className='blogs-userName'>ANAND CHOUDHARY</div>
                    <div className='blogs-postTime'>
                      <span>
                        <AccessTimeFilledIcon />
                      </span>
                      <span>1hr ago</span>
                    </div>
                  </div>
                  <div className='blogs-Post-Heading-Content'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nisi, iusto?
                  </div>
                  <div className='blogs-Post-Content'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Ipsam nemo at aspernatur dolores temporibus necessitatibus
                    nesciunt asperiores delectus quidem! Rerum sed aspernatur
                    eius voluptate non.
                  </div>
                </Card>
              </div>
              <div className='blogs-Delete-Edit-Box'>
                <div>
                  <button className='blogs-EditBtn'>EDIT</button>
                </div>
                <div>
                  <button className='blogs-DeleteBtn'>DELETE</button>
                </div>
              </div>
            </div>
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
