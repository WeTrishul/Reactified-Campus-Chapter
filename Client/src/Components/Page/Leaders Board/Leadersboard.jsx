import React from 'react';
import './Leaderboards.css';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

function Leadersboard() {
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
      <div className='leaderboards-body-Box'>
        <div className='leaderboards-outer-Box'>
          <div className='inner-Leaderboards-Box'>
            <div className='leadersboard-Heading'>
              <h2>
                <u>TOP PERFORMERS</u>
              </h2>
            </div>
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
                        Rank
                      </TableCell>
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
                        Ratings
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
                      <TableCell>
                        <EmojiEventsIcon style={{ color: 'gold' }} />
                      </TableCell>
                      <TableCell>Anand</TableCell>
                      <TableCell>1200</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <EmojiEventsIcon style={{ color: 'silver' }} />
                      </TableCell>
                      <TableCell>Anand</TableCell>
                      <TableCell>1200</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <EmojiEventsIcon style={{ color: 'brown' }} />
                      </TableCell>
                      <TableCell>Anand</TableCell>
                      <TableCell>1200</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>4</TableCell>
                      <TableCell>Anand</TableCell>
                      <TableCell>1200</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>5</TableCell>
                      <TableCell>Anand</TableCell>
                      <TableCell>1200</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>6</TableCell>
                      <TableCell>Anand</TableCell>
                      <TableCell>1200</TableCell>
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

export default Leadersboard;
