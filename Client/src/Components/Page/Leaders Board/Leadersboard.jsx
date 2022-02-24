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
import Axios from 'axios';
import { useEffect, useState } from 'react';
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

  const rankRendering = (index) => {
    if (index == 0) {
      return (
        <>
          <EmojiEventsIcon style={{ color: 'gold' }} />;
        </>
      );
    } else if (index == 1) {
      return (
        <>
          <EmojiEventsIcon style={{ color: 'silver' }} />;
        </>
      );
    } else if (index == 2) {
      return (
        <>
          <EmojiEventsIcon style={{ color: 'brown' }} />;
        </>
      );
    } else {
      return <>{index}</>;
    }
  };
  const [board, setBoard] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    Axios({
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/Leaderboards',
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setLoading(false);
        console.log(data);
        setBoard(data.data.LeaderBoards);
        // setBlogs(data.data.blogs)
        // setEvents(data.data.events)
        // setPosts(data.data.posts)
        //     // console.log(data)
      });
  }, []);
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
                    {board
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((leader, index) => {
                        return (
                          <TableRow>
                            <TableCell>
                              {/* <EmojiEventsIcon style={{ color: 'gold' }} />
                               */}
                              {rankRendering(index)}
                            </TableCell>
                            <TableCell>{leader.userid.name}</TableCell>
                            <TableCell>{leader.userid.CurrentRating}</TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component='div'
                count={board.length}
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
