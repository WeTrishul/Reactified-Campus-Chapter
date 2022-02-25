import React from 'react';
import './Users.css';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';

function Users() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [allusers, setAllUsers] = useState([]);

  const [isLoading, setLoading] = useState(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    // axios.get('http://localhost:3000/listUsers')
    // .then(response => {
    //     return response.data
    // }).then(data =>{
    //     console.log(data)
    //     setAllUsers(data.data.users)
    // });

    Axios({
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/listUsers',
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        setLoading(false);
        setAllUsers(data.data.users);
        //     // console.log(data)
      });
  }, []);

  const deleteHandler = (name) => {
    // name.preventDefault();
    console.log(name);

    // axios.get('http://localhost:3000/delete/?username='+name.target.id)
    // .then(response => {
    //     return response.data
    // }).then(data =>{
    //     console.log(data)
    //     document.getElementById('tr-'+ name.target.id).remove()
    // });

    Axios({
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/delete/?username=' + name,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        document.getElementById('tr-' + name).remove();

        //     // console.log(data)
      });
  };

  return (
    <div>
      <div className='user-Body-outer-Box'>
        <div className='users-outer-Box'>
          <div className='users-inner-Box'>
            <Paper
              sx={{ width: '100%', overflow: 'hidden', marginTop: '2rem' }}
            >
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label='sticky table'>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          fontWeight: '700',
                          width: '350px',
                        }}
                      >
                        Name
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: '700',

                          width: '350px',
                        }}
                      >
                        Role
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: '700',

                          width: '350px',
                        }}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allusers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((result) => {
                        return (
                          <TableRow
                            id={'tr-' + result.username}
                            key={result._id}
                          >
                            <TableCell>{result.name}</TableCell>
                            <TableCell>{result.UserType}</TableCell>
                            <TableCell style={{ textAlign: 'right' }}>
                              <div className='users-Edit-Delete'>
                                <div className='user-Edit-Btn'>
                                  <EditIcon style={{ color: 'green' }} />
                                </div>
                                <div className='user-Delete-Btn'>
                                  <DeleteIcon
                                    onClick={() =>
                                      deleteHandler(result.username)
                                    }
                                    id={result.username}
                                    style={{ color: 'red' }}
                                  />
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component='div'
                count={allusers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
