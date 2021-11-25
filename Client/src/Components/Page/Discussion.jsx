import React from 'react'
import "./Discussion.css"
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import AddCommentTwoToneIcon from '@mui/icons-material/AddCommentTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import ClearIcon from '@mui/icons-material/Clear';
import {useState, useEffect} from "react";
import AuthContext from '../../Service/auth-context';
import{useContext} from 'react'
import Axios from "axios"

function Discussion() {

    const [Discuss,setDiscuss] = useState([])
    let count=0;
    const [likePost,setLikePost]= useState(count)



    const authCtx = useContext(AuthContext);
    let userid = authCtx.id;


    useEffect(() =>{

        // axios.get('http://localhost:3000/Discuss')
        // .then(response => {
        //     return response.data
        // }).then(data =>{
        //     console.log(data)
        //     setDiscuss(data.posts)
            
        // });


        Axios({
            method: "GET",
            
            withCredentials: true,
            url: 'http://localhost:3000/Discuss',
          }).then((response) =>{
          
                  return response.data
                  
              })
          .then(data =>{
            console.log(data)
            setDiscuss(data.posts)
              //     // console.log(data)
              });





    },[])



    const deletePostHandler = (del) =>{

        const userData={
            userid:del.target.id
        }


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
        console.log("main id hoon", del.target.id)


        let user ={
            id:userid
        }

        // const config = {
        //     withCredentials: true,
        //     headers: {
        //       'Content-Type': 'application/json',
        //     //   "Access-Control-Allow-Origin": "http://localhost:3000",
        //       "Access-Control-Allow-Credentials": true
              
        //     },
        //   };

        //   axios.post('http://localhost:8000/routes/register', user, config);

        // axios.get('http://localhost:3000/destroypost/'+del.target.id,
        //     // headers:{
        //     //     "Access-Control-Allow-Origin": "http://localhost:3000",
                
        //     // }
        // )
        //     .then(response => {
        //         return response.data
        //     }).then(data =>{
        //         console.log(data)
        //         document.getElementById('post-'+ del.target.id).remove()
        // });



        Axios({
            method: "GET",
            
            withCredentials: true,
            url: 'http://localhost:3000/destroypost/'+del.target.id,
          }).then(response => {
            return response.data
        }).then(data =>{
            console.log(data)
            // setDiscuss(...Discuss,data)
            document.getElementById('post-'+ del.target.id).remove()
    });


    }


    const likePostHandler = () =>{

        var str =e.target.id.slice("-")
        Axios({
            method: "POST",
            
            
            withCredentials: true,
            url: "http://localhost:3000/Likehandler",
          }).then(res => {
            console.log(res);
            document.getElementById('blog-'+ blog.target.id).remove()
            
        }).catch(err => {
            console.log(err);
            console.log("main nhi chal rha hoon bhai")
        });

    }


    const deleteCommentHandler = () =>{

    }






    return (
        <div>
            <div className="discussionOuterBox">
                <div className="discussionInnerBox">
                {Discuss.map((data) =>{
                       return(
                        <div id={'post-'+ data._id} className="discussionMessageBox">
                        <div  className="PostBox" key={data._id}>
                            <div className="discussionUserDetails">
                                <div className="discussionUserDetails">
                                    <img className="discussionUserImage" src={data.userid.dp} alt="" />
                                    <span className="discussionUsername"><h2>{data.userid.username}</h2></span>
                                    <div className="discussionReport">
                                    
                                    <span>{data.report.length} report</span>
                                    </div>
                                </div>
                            </div>
                            <div className="discussionUserPost">
                                <h4>{data.postBody}</h4>
                            </div>
                            <div className="discussionLikeandComment">
                                <div>
                                <button onClick={likePostHandler} id={"like-"+data._id}> {data.likes.length} <ThumbUpTwoToneIcon/> </button>
                                <span><AddCommentTwoToneIcon/> {data.comments.length}</span>
                                <span><button onClick={deletePostHandler} id={data._id}>Delete</button></span>
                                {/* <span onClick={deletePostHandler} id={data._id} className="discussionDeletePost">< DeleteIcon/>Delete Post</span> */}
                                </div>
                            </div>
                        </div>
                        {data.comments.map((value) =>{
                       return(
                        <div className="discussionCommentSection">
                        <div key={value._id} className="discussionScrollField">
                        <div className="discussionUserComment">
                            <div><PersonIcon/></div>
                            <div className="CommentUserDetails">
                                {value.userid.username}
                            <div className="CommentText">
                                {value.commentBody}
                            </div>
                            </div>
                            <div onClick={deleteCommentHandler} style={{color:"red"}}><ClearIcon/></div>
                            
                        </div>
                        <div className="CommentLikesandReport">
                                <span>{value.likes.length} <ThumbUpTwoToneIcon/></span>
                                
                                <span style={{color:"red"}}> {value.report.length} report</span>
                        </div>

                        
                        </div>
                        
                    </div>
                       )
                   })}

<div className="discussionPostComment">
                            <div className="WriteComment">
                                <textarea className="discussionCommentBox" type="text" placeholder="Comment here..!" />
                            </div>
                            <div className="CommentButton">Send</div>
                        </div>
                        
                    </div>
                       )
                   })}
                
                </div>
                <div className="discussionPostBox">
                <div className="WritePost">
                    <textarea className="discussionWritePostBox" type="text" placeholder="Write your Post here..!" />
                </div>
                <div className="discussionPostButton">Send</div>
                </div>
            </div>
        </div>
    )
}

export default Discussion
