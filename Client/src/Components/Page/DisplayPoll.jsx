import React from 'react';
import './Polling.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Axios from 'axios';
import PieChart from './PieChart';

import { useState } from 'react';
import { useContext } from 'react';
import AuthContext from '../../Service/auth-context';
import { useParams } from 'react-router-dom';

function DisplayPoll() {
  const [poll, setPoll] = useState();

  const [pollresult, setPollResult] = useState();

  const authCtx = useContext(AuthContext);
  const userid = authCtx.id;

  const { pollID } = useParams();

  useEffect(() => {
    var x = { pollID };

    var pollid = x.pollID;

    Axios({
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/viewPagePoll/' + pollid,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setPoll(data.myPoll);
        console.log(data.myPoll);
      });
  }, []);

  const Submitpollans = (e) => {
    console.log(e.target.value);

    var y = { pollID };

    var pollkiId = y.pollID;

    // { Option: 'C', pollID: '61995485b70f373d7c3701f5' }

    Axios({
      method: 'POST',
      data: {
        Option: e.target.value,
        pollID: pollkiId,
      },

      withCredentials: true,
      url: 'http://localhost:3000/poll/sendpoll/' + userid,
    })
      .then((res) => {
        console.log(res);
        // history.push("/")
        if (res.data.title == 'again') {
          alert('Kitni baar krega ?');
          setPoll(undefined);
          setPollResult(res.data.arr);
        } else {
          setPollResult(res.data.arr);
          setPoll(undefined);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log('main nhi chal rha hoon bhai');
      });
  };

  return (
    <div>
      {poll && (
        <div className='wrapper'>
          <div class='title'>{poll.question} </div>
          <div className='box'>
            <input
              type='radio'
              value='A'
              name='select'
              onClick={Submitpollans}
              id='option-1'
            />
            <input
              type='radio'
              value='B'
              name='select'
              onClick={Submitpollans}
              id='option-2'
            />
            <input
              type='radio'
              value='C'
              name='select'
              onClick={Submitpollans}
              id='option-3'
            />
            <input
              type='radio'
              value='D'
              name='select'
              onClick={Submitpollans}
              id='option-4'
            />
            <label htmlFor='option-1' className='option-1'>
              <div className='dot'></div>
              <div className='text'>{poll.optionA}</div>
            </label>
            <label htmlFor='option-2' className='option-2'>
              <div className='dot'></div>
              <div className='text'>{poll.optionB}</div>
            </label>
            <label htmlFor='option-3' className='option-3'>
              <div className='dot'></div>
              <div className='text'>{poll.optionC}</div>
            </label>
            <label htmlFor='option-4' className='option-4'>
              <div className='dot'></div>
              <div className='text'>{poll.optionD}</div>
            </label>
          </div>
        </div>
      )}
      <div
        style={{
          textAlign: 'center',
          justifyContent: 'center',
        }}
      >
        <div>{pollresult && <PieChart profile={pollresult} />}</div>
      </div>
    </div>
  );
}
export default DisplayPoll;
