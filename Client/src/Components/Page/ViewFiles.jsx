import React from 'react';
import './Blogs.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Axios from 'axios';

function ViewFiles() {
  const [files, setfiles] = useState([]);
  const { foldername } = useParams();
  // var cat = {foldername};
  // var fname = cat.foldername;

  useEffect(() => {
    var cat = { foldername };
    var fname = cat.foldername;

    Axios({
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/fileresources/' + fname,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        // setfiles(files => [ ...files, data.arr.files])
        setfiles(data.arr.files);
        console.log(files);
        //     // console.log(data)
      });
  }, []);

  return (
    <div className='view-question'>
      <div className='viewBlogsHeading'>
        <h2>View Files</h2>
      </div>
      <div>
        <div className='ViewblogsOuterBox'>
          <div className='ViewblogsInnerBox'>
            {files.map((data, index) => {
              return (
                <div
                  style={{ background: 'blue' }}
                  className='ViewblogsListBox'
                  key={index}
                >
                  <a
                    href={'http://localhost:3000' + data.ele}
                    target='_blank'
                    style={{ color: 'white' }}
                    className='ViewallBlogsLink'
                  >
                    {data.name}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewFiles;
