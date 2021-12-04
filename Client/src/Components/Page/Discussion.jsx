import React from 'react';
import './Discussion.css';
import * as noti from '../../Service/socket';
import { useRef } from 'react';

import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import AddCommentTwoToneIcon from '@mui/icons-material/AddCommentTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import ClearIcon from '@mui/icons-material/Clear';
import { useState, useEffect } from 'react';
import AuthContext from '../../Service/auth-context';
import { useContext } from 'react';
import Axios from 'axios';

function Discussion({ socket }) {
  const authCtx = useContext(AuthContext);
  let userid = authCtx.id;
  let username = authCtx.username;
  console.log(username);

  const postBody = useRef();
  const commentBody = useRef();

  const [viewComment, setViewComment] = useState(false);

  const commentViewHandler = () => setViewComment(!viewComment);
  const [Discuss, setDiscuss] = useState([]);
  let count = 0;
  const [likePost, setLikePost] = useState(count);

  const [notifications, setnotifications] = useState([]);

  const PostsubmitHandler = (event) => {
    event.preventDefault();
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

  const CommentsubmitHandler = (event) => {
    event.preventDefault();

    var s = event.target.id.split('-')[2];

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
        var x = event.target.getAttribute('post-index');
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
      userid: del.target.id,
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
    console.log('main id hoon', del.target.id);

    let user = {
      id: userid,
    };

    Axios({
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/destroypost/' + del.target.id,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        // setDiscuss(...Discuss,data)
        document.getElementById('post-' + del.target.id).remove();
      });
  };

  const likePostHandler = (e) => {
    // /Likehandler/?id=<%= post.id %>&type=post
    var str = e.target.id.split('-')[1];
    Axios({
      method: 'POST',

      withCredentials: true,
      url: 'http://localhost:3000/Likehandler?id=' + str + '&type=post',
    })
      .then((res) => {
        var likesCount = parseInt(e.target.getAttribute('data-likes'));

        if (res.data.data.deleted == true) {
          likesCount -= 1;
        } else {
          likesCount += 1;
        }

        // console.log(likesCount)
        e.target.setAttribute('data-likes', likesCount);

        console.log(parseInt(e.target.getAttribute('data-likes')));

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

  const ReportPostHandler = (e) => {
    // /Likehandler/?id=<%= post.id %>&type=post
    var str = e.target.id.split('-')[1];
    Axios({
      method: 'POST',

      withCredentials: true,
      url: 'http://localhost:3000/Reporthandler?id=' + str + '&type=post',
    })
      .then((res) => {
        var reportCount = parseInt(e.target.getAttribute('data-reports'));

        if (res.data.data.deleted == true) {
          reportCount -= 1;
        } else {
          reportCount += 1;
        }

        // console.log(likesCount)
        e.target.setAttribute('data-reports', reportCount);

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
    console.log('main id hoon', del.target.id);

    Axios({
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/destroycomment/' + del.target.id,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        // setDiscuss(...Discuss,data)
        document.getElementById('comment-' + del.target.id).remove();
      });
  };

  const likeCommentHandler = (e) => {
    // /Likehandler/?id=<%= post.id %>&type=post
    var str = e.target.id.split('-')[1];
    Axios({
      method: 'POST',

      withCredentials: true,
      url: 'http://localhost:3000/Likehandler?id=' + str + '&type=comment',
    })
      .then((res) => {
        var likesCount = parseInt(e.target.getAttribute('data-likes'));

        if (res.data.data.deleted == true) {
          likesCount -= 1;
        } else {
          likesCount += 1;
        }

        // console.log(likesCount)
        e.target.setAttribute('data-likes', likesCount);

        console.log(parseInt(e.target.getAttribute('data-likes')));

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
            placetogo: '/Discussion/#comment-' + res.data.data.likeable,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        console.log('main nhi chal rha hoon bhai');
      });
  };
  const ReportCommentHandler = (e) => {
    // /Likehandler/?id=<%= post.id %>&type=post
    var str = e.target.id.split('-')[1];
    Axios({
      method: 'POST',

      withCredentials: true,
      url: 'http://localhost:3000/Reporthandler?id=' + str + '&type=comment',
    })
      .then((res) => {
        var reportCount = parseInt(e.target.getAttribute('data-reports'));

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
        e.target.setAttribute('data-reports', reportCount);

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

  return (
    <div>
      <div className='discussionOuterBox'>
        <div className='discussionInnerBox'>
          {Discuss &&
            Discuss.map((data, index) => {
              return (
                <div id={'post-' + data._id} className='discussionMessageBox'>
                  <div className='PostBox' key={data._id}>
                    <div className='discussionUserDetails'>
                      <div className='discussionUserDetails'>
                        <img
                          className='discussionUserImage'
                          src={'http://localhost:3000' + data.userid.dp}
                          alt=''
                        />
                        <span className='discussionUsername'>
                          <h2>{data.userid.username}</h2>
                        </span>
                        <div className='discussionReport'>
                          {/* <span>{data.report.length} report</span> */}
                          <button
                            style={{
                              color: 'red',
                              borderStyle: 'none',
                              background: 'rgb(207, 209, 203)',
                              cursor: 'pointer',
                            }}
                            onClick={ReportPostHandler}
                            id={'report-' + data._id}
                            data-reports={data.report.length}
                          >
                            {' '}
                            <span id={'span-report-' + data._id}>
                              {data.report.length}
                            </span>{' '}
                            Report{' '}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className='discussionUserPost'>
                      <h4>{data.postBody}</h4>
                    </div>
                    <div className='discussionLikeandComment'>
                      <div>
                        {/* <button onClick={likePostHandler} id={"like-"+data._id} data-likes={data.likes.length}> <span id={"span-like-"+data._id}>{data.likes.length}</span> <ThumbUpTwoToneIcon/> </button> */}

                        <button
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
                        </button>
                        <span style={{ cursor: 'pointer' }}>
                          <AddCommentTwoToneIcon onClick={commentViewHandler} />{' '}
                          {data.comments.length}
                        </span>
                        <span>
                          <button
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
                          </button>
                        </span>
                        {/* <span onClick={deletePostHandler} id={data._id} className="discussionDeletePost">< DeleteIcon/>Delete Post</span> */}
                      </div>
                    </div>
                  </div>
                  {viewComment && (
                    <div>
                      <div id={'commentsof-' + data._id}>
                        {data.comments.map((value) => {
                          return (
                            <div
                              id={'comment-' + value._id}
                              className='discussionCommentSection'
                            >
                              <div
                                key={value._id}
                                className='discussionScrollField'
                              >
                                <div className='discussionUserComment'>
                                  <div>
                                    <PersonIcon />
                                  </div>
                                  <div className='CommentUserDetails'>
                                    {value.userid.username}
                                    <div className='CommentText'>
                                      {value.commentBody}
                                    </div>
                                  </div>
                                  {/* <div onClick={deleteCommentHandler} style={{color:"red"}}><ClearIcon/></div> */}
                                  <span>
                                    <button
                                      style={{
                                        color: 'red',
                                        borderStyle: 'none',
                                        cursor: 'pointer',
                                      }}
                                      onClick={deleteCommentHandler}
                                      id={value._id}
                                    >
                                      Delete
                                    </button>
                                  </span>
                                </div>
                                <div className='CommentLikesandReport'>
                                  {/* <span>{value.likes.length} <ThumbUpTwoToneIcon/></span> */}
                                  <button
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
                                  </button>
                                  {/* <button onClick={likeCommentHandler} id={"like-"+value._id} data-likes={value.likes.length}> <span id={"span-like-"+value._id}>{value.likes.length}</span> <ThumbUpTwoToneIcon/> </button> */}

                                  {/* <span style={{color:"red"}}> {value.report.length} report</span> */}
                                  <button
                                    style={{
                                      color: 'red',
                                      borderStyle: 'none',
                                      cursor: 'pointer',
                                    }}
                                    onClick={ReportCommentHandler}
                                    id={'report-' + value._id}
                                    data-reports={value.report.length}
                                  >
                                    {' '}
                                    <span id={'span-report-' + value._id}>
                                      {value.report.length}
                                    </span>{' '}
                                    Report{' '}
                                  </button>
                                  {/* <button onClick={ReportCommentHandler} id={"report-"+value._id} data-reports={value.report.length}> <span id={"span-report-"+value._id}>{value.report.length}</span> <ThumbUpTwoToneIcon/> </button> */}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className='discussionPostComment'>
                        <div className='WriteComment'>
                          <textarea
                            name='commentBody'
                            id={'post-commentinput-' + data._id}
                            className='discussionCommentBox'
                            type='text'
                            placeholder='Comment here..!'
                          />
                        </div>
                        <div
                          onClick={CommentsubmitHandler}
                          id={'post-submit-' + data._id}
                          post-index={index}
                          className='CommentButton'
                        >
                          Send
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
        <div className='discussionPostBox'>
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
        </div>
      </div>
    </div>
  );
}

export default Discussion;
