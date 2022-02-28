import React from 'react';
import './Discuss.css';
import Card from '@mui/material/Card';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ReportIcon from '@mui/icons-material/Report';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import AuthContext from '../../../Service/auth-context';
import { useContext } from 'react';
import Axios from 'axios';

function Discuss({ socket }) {
  const [comment, setComment] = useState(true);
  let [count, setCount] = useState(0);
  const [like, setLike] = useState(false);
  const likeHandler = {
    color: 'blue',
  };
  const viewAllComment = (postid) => {
    // document.getElementById('commentsof-' + postid).style.display = 'block';

    if (count == 0) {
      document.getElementById('commentsof-' + postid).style.display = 'block';
      setCount(count++);
    } else if (count == 1) {
      count = 0;
      document.getElementById('commentsof-' + postid).style.display = 'none';
    }
    setCount(count);
  };

  // Connection code

  const authCtx = useContext(AuthContext);
  let userid = authCtx.id;
  let username = authCtx.username;
  const UserType = authCtx.usertype;

  console.log(username);

  const postBody = useRef();
  const commentBody = useRef();

  const [viewComment, setViewComment] = useState(false);

  const commentViewHandler = () => setViewComment(!viewComment);
  const [Discuss, setDiscuss] = useState([]);
  const [likePost, setLikePost] = useState(count);

  const [notifications, setnotifications] = useState([]);

  const PostsubmitHandler = (event) => {
    event.preventDefault();
    // console.log(postBody.current)
    console.log(postBody.current.value);
    Axios({
      method: 'POST',
      data: { postBody: postBody.current.value },

      withCredentials: true,
      url: 'http://localhost:3000/postit',
    })
      .then((response) => {
        console.log(response);

        return response.data;
      })
      .then((data) => {
        postBody.current.value = '';
        console.log('Post hogya');
        // console.log(data)
        setDiscuss([...Discuss, data.data.post]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CommentsubmitHandler = (index, sendid) => {
    // event.preventDefault();

    // var s = event.target.id.split('-')[2];

    var s = sendid;
    // console.log("here you go ",event.target)

    var v = document.getElementById('post-commentinput-' + s).value;

    console.log(v);
    Axios({
      method: 'POST',
      data: { commentBody: v, postid: s },

      withCredentials: true,
      url: 'http://localhost:3000/commentit',
    })
      .then((response) => {
        console.log(response);

        return response.data;
      })
      .then((data) => {
        document.getElementById('post-commentinput-' + s).value = ' ';
        console.log('comment hogya');
        var x = index;
        let copy = [...Discuss];
        copy[x].comments.push(data.data.comment);
        setDiscuss(copy);
        console.log(data.data.comment.userid.username);
        console.log(data.data.postuser);
        // if(data.data.comment.userid.username!=data.data.postuser)
        // {

        console.log('main submit', data);
        if (data.data.postuser != authCtx.username) {
          socket.emit('notify', {
            to: data.data.postuser,
            from: authCtx.username,
            msg: 'commented on your post',
            placetogo: '/Discussion/#post-' + data.data.comment.postid,
          });
        }

        // noti.notify(data.data.postuser,'commented on your post')

        // }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // const socket = noti.socket

    // // noti.joinNotiRoom(username)

    // socket.on('user_joined',()=>{
    //     console.log("Bolbum")
    // })

    // socket.on('notification',(data)=>{
    //     console.log('notification aya')
    //     console.log(data)
    // })

    Axios({
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/Discuss',
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        setDiscuss(data.posts);
        //     // console.log(data)
      });
  }, []);

  const deletePostHandler = (del) => {
    const userData = {
      userid: del,
    };

    // axios.post('http://localhost:3000/destroypost/'+del.target.id,{
    //     headers: {
    //         "Access-Control-Allow-Origin": "*",
    //     }
    // })
    // .then(res => {
    //     console.log(res);

    // }).catch(err => {
    //     console.log(err);
    //     console.log("main nhi chal rha hoon bhai")
    // });
    // {withCredentials: true}
    console.log('main id hoon', del);

    let user = {
      id: userid,
    };

    Axios({
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/destroypost/' + del,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        // setDiscuss(...Discuss,data)
        document.getElementById('post-' + del).remove();

        document.getElementById('commentsof-' + del).remove();
      });
  };

  const likePostHandler = (str, likecount) => {
    // /Likehandler/?id=<%= post.id %>&type=post
    // var str = e.target.id.split('-')[1];
    Axios({
      method: 'POST',

      withCredentials: true,
      url: 'http://localhost:3000/Likehandler?id=' + str + '&type=post',
    })
      .then((res) => {
        //  var likesCount = parseInt(e.target.getAttribute('data-likes'));
        var likesCount = parseInt(
          document.getElementById('span-like-' + str).innerHTML
        );

        if (res.data.data.deleted == true) {
          likesCount -= 1;
        } else {
          likesCount += 1;
        }

        // console.log(likesCount)
        // e.target.setAttribute('data-likes', likesCount);

        // console.log(parseInt(e.target.getAttribute('data-likes')));

        // e.target.innerHTML(`${likesCount} likes`);
        document.getElementById('span-like-' + str).innerHTML = likesCount;

        // if(res.data.data.deleted==false && noti.usernaam!=res.data.data.likeableowner)
        // {
        //     noti.notify(res.data.data.likeableowner,'liked your ' + res.data.data.likeabletype,res.data.data.likeabletype)

        // }
        if (
          res.data.data.deleted == false &&
          authCtx.username != res.data.data.likeableowner
        ) {
          socket.emit('notify', {
            to: res.data.data.likeableowner,
            from: authCtx.username,
            msg: 'liked your ' + res.data.data.likeabletype,
            placetogo: '/Discussion/#post-' + res.data.data.likeable,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        console.log('main nhi chal rha hoon bhai');
      });
  };

  const ReportPostHandler = (str, reportcount) => {
    // /Likehandler/?id=<%= post.id %>&type=post
    console.log('hi');
    // var str = e.target.id.split('-')[1];
    Axios({
      method: 'POST',

      withCredentials: true,
      url: 'http://localhost:3000/Reporthandler?id=' + str + '&type=post',
    })
      .then((res) => {
        // var reportCount = parseInt(e.target.getAttribute('data-reports'));
        // var reportCount = parseInt(reportcount);
        var reportCount = parseInt(
          document.getElementById('span-report-' + str).innerHTML
        );
        if (res.data.data.deleted == true) {
          reportCount -= 1;
        } else {
          reportCount += 1;
        }

        // console.log(likesCount)
        // e.target.setAttribute('data-reports', reportCount);

        // if(reportCount==5)
        // {
        //   console.log('yo man')
        //   let reporttonoti = '/Discuss/#'+res.data.data.reportabletype+'-'+res.data.data.reportable

        //   noti.notify('reportnoti','One ' + res.data.data.reportabletype +' has 5 reports',reporttonoti)
        // }

        // e.target.innerHTML(`${likesCount} likes`);
        document.getElementById('span-report-' + str).innerHTML = reportCount;

        // if(res.data.data.deleted==false && noti.usernaam!=res.data.data.reportableowner)
        // {
        // let reporttonoti = '/Discuss/#'+res.data.data.reportabletype+'-'+res.data.data.reportable
        // noti.notify(res.data.data.reportableowner,'reported your ' + res.data.data.reportabletype,reporttonoti)
        // }
        if (
          res.data.data.deleted == false &&
          authCtx.username != res.data.data.reportableowner
        ) {
          socket.emit('notify', {
            to: res.data.data.reportableowner,
            from: authCtx.username,
            msg: 'reported your ' + res.data.data.reportabletype,
            placetogo: '/Discussion/#post-' + res.data.data.reportable,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        console.log('main nhi chal rha hoon bhai');
      });
  };

  const deleteCommentHandler = (del) => {
    console.log('main id hoon', del);

    Axios({
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/destroycomment/' + del,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        // setDiscuss(...Discuss,data)
        document.getElementById('comment-' + del).remove();
      });
  };

  const likeCommentHandler = (str, likecount) => {
    // /Likehandler/?id=<%= post.id %>&type=post
    // var str = e.target.id.split('-')[1];
    Axios({
      method: 'POST',

      withCredentials: true,
      url: 'http://localhost:3000/Likehandler?id=' + str + '&type=comment',
    })
      .then((res) => {
        var likesCount = parseInt(
          document.getElementById('span-like-' + str).innerHTML
        );

        if (res.data.data.deleted == true) {
          likesCount -= 1;
        } else {
          likesCount += 1;
        }

        // console.log(likesCount)
        // e.target.setAttribute('data-likes', likesCount);
        document.getElementById('span-like-' + str).innerHTML = likesCount;
        // console.log(parseInt(e.target.getAttribute('data-likes')));

        // e.target.innerHTML(`${likesCount} likes`);
        // if(res.data.data.deleted==false && noti.usernaam!=res.data.data.likeableowner)
        // {
        //     noti.notify(res.data.data.likeableowner,'liked your ' + res.data.data.likeabletype,res.data.data.likeabletype)

        // }
        if (
          res.data.data.deleted == false &&
          authCtx.username != res.data.data.likeableowner
        ) {
          socket.emit('notify', {
            to: res.data.data.likeableowner,
            from: authCtx.username,
            msg: 'liked your ' + res.data.data.likeabletype,
            placetogo: '/Discussion/#comment-' + res.data.data.likeable,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        console.log('main nhi chal rha hoon bhai');
      });
  };
  const ReportCommentHandler = (str, reportcount) => {
    // /Likehandler/?id=<%= post.id %>&type=post
    // var str = e.target.id.split('-')[1];
    Axios({
      method: 'POST',

      withCredentials: true,
      url: 'http://localhost:3000/Reporthandler?id=' + str + '&type=comment',
    })
      .then((res) => {
        var reportCount = parseInt(
          document.getElementById('span-report-' + str).innerHTML
        );

        if (res.data.data.deleted == true) {
          reportCount -= 1;
        } else {
          reportCount += 1;
        }

        // if(reportCount==5)
        //       {
        //         console.log('yo man')
        //         let reporttonoti = '/Discuss/#'+res.data.data.reportabletype+'-'+res.data.data.reportable

        //         noti.notify('reportnoti','One ' + res.data.data.reportabletype +' has 5 reports',reporttonoti)
        //       }

        // console.log(likesCount)
        // e.target.setAttribute('data-reports', reportCount);

        // e.target.innerHTML(`${likesCount} likes`);
        document.getElementById('span-report-' + str).innerHTML = reportCount;

        // if(res.data.data.deleted==false && noti.usernaam!=res.data.data.reportableowner)
        // {
        // let reporttonoti = '/Discuss/#'+res.data.data.reportabletype+'-'+res.data.data.reportable
        // noti.notify(res.data.data.reportableowner,'reported your ' + res.data.data.reportabletype,reporttonoti)
        // }
        if (
          res.data.data.deleted == false &&
          authCtx.username != res.data.data.reportableowner
        ) {
          socket.emit('notify', {
            to: res.data.data.reportableowner,
            from: authCtx.username,
            msg: 'reported your ' + res.data.data.reportabletype,
            placetogo: '/Discussion/#comment-' + res.data.data.reportable,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        console.log('main nhi chal rha hoon bhai');
      });
  };

  // connection code

  return (
    <div>
      <div className='body-Discussion-Box'>
        <div className='discussion-Outer-Box'>
          <div className='discuss-Inner-Box'>
            <div className='discuss-Container-Box'>
              {Discuss &&
                Discuss.map((data, index) => {
                  return (
                    <div>
                      <div
                        id={'post-' + data._id}
                        key={data._id}
                        className='Discuss-post-comment-Box'
                      >
                        <Card
                          className='discussion-Card-Box'
                          style={{
                            borderRadius: '20px',
                            border: '1px solid black',
                            background: '#fff',
                            height: 'auto',
                            paddingTop: '10px',
                            paddingBottom: '1rem',
                          }}
                        >
                          <div className='discussion-UserImg-Name-Time'>
                            <div className='discussion-Image-Container'>
                              <img
                                className='discussion-User-Image'
                                src={'http://localhost:3000' + data.userid.dp}
                                alt=''
                              />
                            </div>
                            <div className='discussion-User-Name'>
                              {data.userid.username}
                            </div>
                            <div className='discussion-Post-Time'>
                              <span>
                                <AccessTimeFilledIcon />
                              </span>
                              <span>1hr ago</span>
                            </div>
                          </div>
                          <div className='discussion-Post-Content'>
                            {data.postBody}
                          </div>
                          <div className='discussion-Like-Comment-Share'>
                            <div className='discussion-Like-Button'>
                              {/* <button
                          style={{
                            borderStyle: 'none',
                            background: 'rgb(207, 209, 203)',
                            cursor: 'pointer',
                          }}
                          onClick={likePostHandler}
                          id={'like-' + data._id}
                          data-likes={data.likes.length}
                        >
                          {' '}
                         
                          <span id={'span-like-' + data._id}>
                            {data.likes.length}
                          </span>{' '}
                          Like{' '}
                        </button> */}
                              <ThumbUpIcon
                                onClick={() =>
                                  likePostHandler(data._id, data.likes.length)
                                }
                              />
                              {/* <ThumbUpIcon sx={likeHandler} /> */}
                              <span id={'span-like-' + data._id}>
                                {' '}
                                {data.likes.length}
                              </span>
                            </div>
                            <div className='discussion-Comment-Button'>
                              <AddCommentIcon
                                onClick={() => viewAllComment(data._id)}
                              />
                              <span>{data.comments.length}</span>
                            </div>
                            <dv className='discussion-Report-Button'>
                              <ReportIcon
                                style={{ color: 'red' }}
                                onClick={() =>
                                  ReportPostHandler(
                                    data._id,
                                    data.report.length
                                  )
                                }
                                id={'report-' + data._id}
                                data-reports={data.report.length}
                              />

                              <span
                                id={'span-report-' + data._id}
                                style={{ color: 'red' }}
                              >
                                {' '}
                                {data.report.length}
                              </span>
                            </dv>
                            <div className='discussion-Delete-Button'>
                              {/* <button
                            style={{
                              paddingLeft: '100px',
                              color: 'red',
                              borderStyle: 'none',
                              background: 'rgb(207, 209, 203)',
                              cursor: 'pointer',
                            }}
                            onClick={deletePostHandler}
                            id={data._id}
                          >
                            Delete
                          </button> */}
                          { (UserType=='Admin' || data.userid._id==authCtx.id )
                              && <DeleteIcon
                                style={{ color: 'red' }}
                                onClick={() => deletePostHandler(data._id)}
                              /> }
                            </div>
                          </div>
                        </Card>
                      </div>

                      {comment && (
                        <div
                          style={{ display: 'none' }}
                          id={'commentsof-' + data._id}
                        >
                          <div className='discussion-Posted-Comment-Container-Section'>
                            {data.comments.map((value) => {
                              return (
                                <div
                                  id={'comment-' + value._id}
                                  className='discussion-Posted-Comment-Section'
                                >
                                  <div
                                    key={value._id}
                                    className='discuss-Comment-Design'
                                  >
                                    <div className='discuss-person-Logo'>
                                      <PersonIcon />
                                    </div>
                                    <div className='discuss-Comment-Box'>
                                      <Card
                                        style={{
                                          width: '80%',
                                          height: 'auto',
                                          background: '#fff',
                                        }}
                                      >
                                        <div className='discuss-Comment-Username'>
                                          {value.userid.username}
                                        </div>
                                        <div className='discuss-Comment-of-user'>
                                          {value.commentBody}
                                        </div>
                                        <div className='discuss-Comment-Like-and-Report'>
                                          <div className='comment-Box-Like-and-Count'>
                                            <ThumbUpIcon
                                              onClick={() =>
                                                likeCommentHandler(
                                                  value._id,
                                                  value.likes.length
                                                )
                                              }
                                            />
                                            {/* <button
                                    style={{
                                      borderStyle: 'none',
                                      cursor: 'pointer',
                                    }}
                                    onClick={likeCommentHandler}
                                    id={'like-' + value._id}
                                    data-likes={value.likes.length}
                                  >
                                    {' '}
                                    <span id={'span-like-' + value._id}>
                                      {value.likes.length}
                                    </span>{' '}
                                    like{' '}
                                  </button> */}
                                            <span id={'span-like-' + value._id}>
                                              {value.likes.length}
                                            </span>
                                          </div>
                                          <div className='comment-Box-Report-and-Count'>
                                            <ReportIcon
                                              onClick={() =>
                                                ReportCommentHandler(
                                                  value._id,
                                                  value.report.length
                                                )
                                              }
                                            />
                                            <span
                                              id={'span-report-' + value._id}
                                            >
                                              {value.report.length}
                                            </span>
                                          </div>

                                          <div>
                                            {/* <button
                                      style={{
                                        color: 'red',
                                        borderStyle: 'none',
                                        cursor: 'pointer',
                                      }}
                                      
                                      id={value._id}
                                    >
                                      Delete
                                    </button> */}
                                    { (UserType=='Admin' || value.userid._id==authCtx.id ) &&
                                            <DeleteIcon
                                              style={{ color: 'red' }}
                                              onClick={() =>
                                                deleteCommentHandler(value._id)
                                              }
                                            /> }
                                          </div>
                                        </div>
                                      </Card>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          <div className='write-Comment-for-Post'>
                            <div style={{ width: '75%' }}>
                              <TextField
                                name='commentBody'
                                id={'post-commentinput-' + data._id}
                                style={{ width: '100%' }}
                                label='Comment here'
                              />
                            </div>
                            <div
                              style={{
                                width: '25%',
                                marginLeft: '20px',
                                paddingTop: '8px',
                              }}
                            >
                              <SendIcon
                                onClick={() =>
                                  CommentsubmitHandler(index, data._id)
                                }
                                id={'post-submit-' + data._id}
                                post-index={index}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>

            <div className='write-Discuss-Post-Box'>
              <div style={{ width: '90%', borderRadius: '20%' }}>
                <TextField
                  style={{ width: '100%', borderRadius: '50%' }}
                  label='Write your Post'
                  name='postBody'
                  inputRef={postBody}
                />
                {/* <textarea
              name='postBody'
              className='discussionWritePostBox'
              type='text'
              placeholder='Write your Post here..!'
              ref={postBody}
            /> */}
              </div>
              <div
                style={{ width: '10%', marginLeft: '10px', paddingTop: '8px' }}
              >
                <SendIcon onClick={PostsubmitHandler} />
              </div>
            </div>
            {/* <div className='discussionPostBox'>
          <div className='WritePost'>
            <textarea
              name='postBody'
              className='discussionWritePostBox'
              type='text'
              placeholder='Write your Post here..!'
              ref={postBody}
            />
          </div>
          <div onClick={PostsubmitHandler} className='discussionPostButton'>
            Send
          </div>
        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Discuss;
