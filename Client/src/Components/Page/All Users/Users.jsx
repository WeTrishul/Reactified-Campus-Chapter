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
import DeleteIcon from '@mui/icons-material/Delete';

function Users() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
                    {/* {rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role='checkbox'
                            tabIndex={-1}
                            key={row.code}
                          >
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })} */}
                    <TableRow>
                      <TableCell>Anand</TableCell>
                      <TableCell>
                        Admin, Question Setter, Executive, Core
                      </TableCell>
                      <TableCell style={{ textAlign: 'right' }}>
                        <div className='users-Edit-Delete'>
                          <div className='user-Edit-Btn'>
                            <EditIcon style={{ color: 'green' }} />
                          </div>
                          <div className='user-Delete-Btn'>
                            <DeleteIcon style={{ color: 'red' }} />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Anand</TableCell>
                      <TableCell>
                        Admin, Question Setter, Executive, Core
                      </TableCell>
                      <TableCell>
                        <div className='users-Edit-Delete'>
                          <div className='user-Edit-Btn'>
                            <EditIcon style={{ color: 'green' }} />
                          </div>
                          <div className='user-Delete-Btn'>
                            <DeleteIcon style={{ color: 'red' }} />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Anand</TableCell>
                      <TableCell>Admin</TableCell>
                      <TableCell>
                        <div className='users-Edit-Delete'>
                          <div className='user-Edit-Btn'>
                            <EditIcon style={{ color: 'green' }} />
                          </div>
                          <div className='user-Delete-Btn'>
                            <DeleteIcon style={{ color: 'red' }} />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Anand</TableCell>
                      <TableCell>
                        Admin, Question Setter, Executive, Core
                      </TableCell>
                      <TableCell>
                        <div className='users-Edit-Delete'>
                          <div className='user-Edit-Btn'>
                            <EditIcon style={{ color: 'green' }} />
                          </div>
                          <div className='user-Delete-Btn'>
                            <DeleteIcon style={{ color: 'red' }} />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Anand</TableCell>
                      <TableCell>
                        Admin, Question Setter, Executive, Core
                      </TableCell>
                      <TableCell>
                        <div className='users-Edit-Delete'>
                          <div className='user-Edit-Btn'>
                            <EditIcon style={{ color: 'green' }} />
                          </div>
                          <div className='user-Delete-Btn'>
                            <DeleteIcon style={{ color: 'red' }} />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Anand</TableCell>
                      <TableCell>
                        Admin, Question Setter, Executive, Core
                      </TableCell>
                      <TableCell>
                        <div className='users-Edit-Delete'>
                          <div className='user-Edit-Btn'>
                            <EditIcon style={{ color: 'green' }} />
                          </div>
                          <div className='user-Delete-Btn'>
                            <DeleteIcon style={{ color: 'red' }} />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Anand</TableCell>
                      <TableCell>
                        Admin, Question Setter, Executive, Core
                      </TableCell>
                      <TableCell>
                        <div className='users-Edit-Delete'>
                          <div className='user-Edit-Btn'>
                            <EditIcon style={{ color: 'green' }} />
                          </div>
                          <div className='user-Delete-Btn'>
                            <DeleteIcon style={{ color: 'red' }} />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Anand</TableCell>
                      <TableCell>
                        Admin, Question Setter, Executive, Core
                      </TableCell>
                      <TableCell>
                        <div className='users-Edit-Delete'>
                          <div className='user-Edit-Btn'>
                            <EditIcon style={{ color: 'green' }} />
                          </div>
                          <div className='user-Delete-Btn'>
                            <DeleteIcon style={{ color: 'red' }} />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Anand</TableCell>
                      <TableCell>
                        Admin, Question Setter, Executive, Core
                      </TableCell>
                      <TableCell>
                        <div className='users-Edit-Delete'>
                          <div className='user-Edit-Btn'>
                            <EditIcon style={{ color: 'green' }} />
                          </div>
                          <div className='user-Delete-Btn'>
                            <DeleteIcon style={{ color: 'red' }} />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Anand</TableCell>
                      <TableCell>
                        Admin, Question Setter, Executive, Core
                      </TableCell>
                      <TableCell>
                        <div className='users-Edit-Delete'>
                          <div className='user-Edit-Btn'>
                            <EditIcon style={{ color: 'green' }} />
                          </div>
                          <div className='user-Delete-Btn'>
                            <DeleteIcon style={{ color: 'red' }} />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Anand</TableCell>
                      <TableCell>
                        Admin, Question Setter, Executive, Core
                      </TableCell>
                      <TableCell>
                        <div className='users-Edit-Delete'>
                          <div className='user-Edit-Btn'>
                            <EditIcon style={{ color: 'green' }} />
                          </div>
                          <div className='user-Delete-Btn'>
                            <DeleteIcon style={{ color: 'red' }} />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Anand</TableCell>
                      <TableCell>
                        Admin, Question Setter, Executive, Core
                      </TableCell>
                      <TableCell>
                        <div className='users-Edit-Delete'>
                          <div className='user-Edit-Btn'>
                            <EditIcon style={{ color: 'green' }} />
                          </div>
                          <div className='user-Delete-Btn'>
                            <DeleteIcon style={{ color: 'red' }} />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component='div'
                // count={rows.length}
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
