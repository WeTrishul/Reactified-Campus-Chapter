import React from 'react';
import './Leaderboard.css';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import CircularIndeterminate from '../Layout/CircularIndeterminate';

function Leaderboard() {
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

  const leaderboardRendering = () => {
    if (isLoading) {
      return <CircularIndeterminate />;
    } else {
      return (
        <div>
          <h1>Leaderboard</h1>
          <div className='toplist'>
            {board.map((data, index) => {
              return (
                <div className='listbox' key={data.userid._id}>
                  <div className='list'>
                    <div className='name-list'>
                      <h3>{data.userid.name}</h3>
                    </div>
                    <div className='rating-list'>
                      <h3>Rating: {data.userid.CurrentRating}</h3>
                    </div>
                    <div className='rank-list'>
                      <h3>Rank : {index}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  };

  return <>{leaderboardRendering()}</>;
}

export default Leaderboard;
