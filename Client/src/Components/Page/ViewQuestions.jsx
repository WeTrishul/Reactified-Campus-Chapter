import React from 'react';
import { useEffect, useState, useContext } from 'react';
import AuthContext from '../../Service/auth-context';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import './Blogs.css';
import CircularIndeterminate from '../Layout/CircularIndeterminate';

function ViewQuestions() {
  const [allques, setAllQues] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const authCtx = useContext(AuthContext);
  let userId = authCtx.id;

  useEffect(() => {
    Axios({
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/seeQ/' + userId,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);

        //     // console.log(data)
        setLoading(false);

        setAllQues(data.arr);
      });
  }, []);

  const ViewQuestionRendering = () => {
    if (isLoading) {
      return <CircularIndeterminate />;
    } else {
      return (
        <div className='view-question'>
          <div className='viewBlogsHeading'>
            <h2>View Questions</h2>
          </div>
          <div>
            <div className='ViewblogsOuterBox'>
              <div className='ViewblogsInnerBox'>
                {allques.map((data, index) => {
                  return (
                    <div className='ViewblogsListBox' key={index}>
                      <a
                        href={'http://localhost:3000' + data}
                        className='ViewallBlogsLink'
                        target='_blank'
                      >
                        Question-{index}
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
  };

  return <>{ViewQuestionRendering()}</>;
}

export default ViewQuestions;
