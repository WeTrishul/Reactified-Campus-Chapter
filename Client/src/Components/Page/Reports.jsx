import React from 'react';
import './AllUsers.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function Reports() {
  const [postreports, setPostReports] = useState([]);
  const [commentreports, setCommentReports] = useState([]);

  useEffect(() => {
    Axios({
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/ReportedThings',
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        setPostReports(data.posts);
        setCommentReports(data.comments);

        //     // console.log(data)
      });
  }, []);

  return (
    <div>
      <table className='user-table'>
        <thead>
          <tr>
            <th>Type</th>

            <th>Reports</th>

            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {postreports &&
            postreports.map((data) => {
              return (
                <>
                  <tr>
                    <td>posts</td>

                    <td>{data.report.length}</td>

                    <td>
                      <Link to={'Discussion/#post-' + data._id}>
                        <button className='table-btn'>Review</button>
                      </Link>
                    </td>
                  </tr>
                </>
              );
            })}
          {commentreports &&
            commentreports.map((data) => {
              return (
                <>
                  <tr>
                    <td>comments</td>

                    <td>{data.report.length}</td>

                    <td>
                      <Link to={'Discussion/#comment-' + data._id}>
                        <button className='table-btn'>Review</button>
                      </Link>
                    </td>
                  </tr>
                </>
              );
            })}
          {/* <td>data.name</td>

            <td>1</td>

            <td>
              <button className='table-btn'>Delete</button>
            </td> */}
        </tbody>
      </table>
    </div>
  );
}

export default Reports;
