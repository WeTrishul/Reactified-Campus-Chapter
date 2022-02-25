import React from 'react';
import './Applications.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import AuthContext from '../../../Service/auth-context';
import { useContext } from 'react';
import io from 'socket.io-client';

function Applications({ socket }) {
  const [applications, setApplications] = useState([]);

  const authCtx = useContext(AuthContext);
  let userId = authCtx.id;

  useEffect(() => {
    Axios({
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/applications',
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        setApplications(data.arr);
      });
  }, []);

  const acceptHandler = (role, userkiId) => {
    Axios({
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/accept/' + role + '/' + userkiId,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        // notifier.notify(data.data.username,'Congrats ! welcome on board as a '+ data.data.role,'/dashboard')

        socket.emit('notify', {
          to: data.data.username,
          from: '',
          msg: 'Congrats ! welcome on board as a ' + data.data.role,
          placetogo: '/Dashboard',
        });

        document.getElementById('Removeapply-' + userkiId).remove();

        console.log(data);
      });
  };

  const rejectHandler = (role, userkiId) => {
    // /accept/<%=i.appliedRole%>/<%=i.userid.id%>

    Axios({
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/reject/' + role + '/' + userkiId,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        document.getElementById('Removeapply-' + userkiId).remove();
      });
  };

  const reportsRendering = () => {
    return (
      <div>
        <table className='user-table'>
          <thead>
            <tr>
              <th>User</th>

              <th>Role</th>

              <th>Link</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {applications &&
              applications.map((data) => {
                return (
                  <>
                    <tr id={'Removeapply-' + data.userid._id}>
                      <td>{data.userid.username}</td>

                      <td>{data.appliedRole}</td>

                      <td>
                        {/* <Link to={'Discussion/#comment-' + data._id}> */}
                        <button className='table-btn'>Go</button>
                        {/* </Link> */}
                      </td>

                      <td>
                        {/* <Link to={'Discussion/#comment-' + data._id}> */}
                        <button
                          onClick={() =>
                            acceptHandler(data.appliedRole, data.userid._id)
                          }
                          className='table-btn'
                        >
                          Accept
                        </button>
                        {/* </Link> */}
                        {/* <Link to={'Discussion/#comment-' + data._id}> */}
                        <button
                          onClick={() =>
                            rejectHandler(data.appliedRole, data.userid._id)
                          }
                          className='table-btn'
                        >
                          Reject
                        </button>
                        {/* </Link> */}
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
  };

  return <>{reportsRendering()}</>;
}

export default Applications;
