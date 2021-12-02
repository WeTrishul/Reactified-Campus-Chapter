import React from 'react';
import { useRef } from 'react';
import { useContext } from 'react';
import AuthContext from '../../Service/auth-context';
import { CKEditor } from 'ckeditor4-react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

function EditBlog() {
  const location = useLocation();
  const [displayBlogs, setDisplayBlogs] = useState({});

  const [editor, setEditor] = useState({});
  let history = useHistory();

  const authCtx = useContext(AuthContext);
  const userId = authCtx.id;

  const titleInputRef = useRef();
  const descriptionInputRef = useRef();

  const blogSubmitHandler = () => {
    const enteredTitle = titleInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const blogDetails = {
      title: enteredTitle,
      description: enteredDescription,
      content: editor,
      userid: userId,
    };

    // axios.post('http://localhost:3000/updateblog',blogDetails,{
    //     headers: {
    //         "Access-Control-Allow-Origin": "*",
    //     }
    // })
    // .then(res => {
    //     console.log(res);
    //     history.push("/Blogs")

    // }).catch(err => {
    //     console.log(err);
    //     console.log("main nhi chal rha hoon bhai")
    // });

    // Axios({
    //   method: 'POST',
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //   },
    //   data: {
    //     title: enteredTitle,
    //     description: enteredDescription,
    //     content: editor,
    //     userid: userId,
    //   },

    //   withCredentials: true,
    //   url: 'http://localhost:3000/updateblog',
    // })
    //   .then((res) => {
    //     console.log(res);
    //     history.push('/Blogs');
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     console.log('main nhi chal rha hoon bhai');
    //   });
    Axios({
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
      data: {
        title: enteredTitle,
        description: enteredDescription,
        content: editor,
        userid: userId,
      },

      withCredentials: true,
      credentials: 'same-origin',
      url: 'http://localhost:3000/updateblog',
    })
      .then((response) => {
        console.log(response);

        return response.data;
      })
      .then((data) => {
        console.log(data);
        history.push('/Blogs');
      })
      .catch((err) => {
        console.log('error', err);
        // alert("Poll Failed!!");
      });
  };

  useEffect(() => {
    console.log('main id', location.state);

    // axios.get('http://localhost:3000/showblog/'+location.state)
    // .then(response => {
    //     return response.data
    // }).then(data =>{
    //     console.log(data)
    //     setDisplayBlogs(data.blogs)
    //     console.log("yahan")
    //     console.log(displayBlogs)
    //     // let main = document.querySelector("main")
    //     // let str = data.blogs.content
    //     // let strhtml = str;
    //     // main.innerHTML=strhtml;
    // });

    Axios({
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/showblog/' + location.state,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        setDisplayBlogs(data.blogs);
        console.log('yahan');
        // console.log(displayBlogs)
        //     // console.log(data)
      });
  }, []);

  return (
    <div>
      <div className='App'>
        {/* <h2>Using CKEditor 5 build in React</h2> */}
        <input type='text' value={displayBlogs.title} ref={titleInputRef} />
        <input
          type='text'
          value={displayBlogs.description}
          placeholder='Description'
          ref={descriptionInputRef}
        />
        {/* <input type="hidden" id="cont" value={displayBlogs.content}/> */}
        <CKEditor
          editor='null'
          initData={ReactHtmlParser(displayBlogs.content)}
          // data="{<p>{displayBlogs.title}</p>}"
          onReady={(editor) => {
            console.log(document.getElementById('cont').value);
            // editor.editor.setData("hello")

            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          // onChange={ ( event, editor ) => {
          //     const data = editor.getData();
          //     console.log( { event, editor, data } );
          // } }
          // onChange ={(e) => {setEditor(e.target.value)}}

          onChange={(evt) => {
            const editorValue = evt.editor.getData();
            setEditor(editorValue);
          }}
        />

        {/* onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } } */}
        {/* /> */}
        <div className='submitBlog'>
          <button onClick={blogSubmitHandler}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default EditBlog;
