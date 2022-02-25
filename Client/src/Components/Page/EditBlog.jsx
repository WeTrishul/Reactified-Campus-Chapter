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
  const [changedcontent, setChangedCont] = useState(false);

  const [parsedContent, setParsedContent] = useState();

  const [editor, setEditor] = useState({});
  let history = useHistory();

  const authCtx = useContext(AuthContext);
  const userId = authCtx.id;

  const titleInputRef = useRef();
  const descriptionInputRef = useRef();

  const handleTitlechange = (e) => {
    let x = displayBlogs;
    x.title = e.target.value;
    setDisplayBlogs({ ...displayBlogs, x });
  };

  const handledescchange = (e) => {
    let x = displayBlogs;
    console.log(x);
    x.description = e.target.value;
    setDisplayBlogs({ ...displayBlogs, x });
  };

  const blogSubmitHandler = () => {
    // const enteredTitle = titleInputRef.current.value;
    // const enteredDescription = descriptionInputRef.current.value;

    const enteredTitle = document.getElementById('editedtitle').value;
    const enteredDescription = document.getElementById('editeddesc').value;

    var blogDetails;

    if (changedcontent) {
      blogDetails = {
        title: enteredTitle,
        description: enteredDescription,
        content: editor,
        userid: userId,
      };
    } else {
      blogDetails = {
        title: enteredTitle,
        description: enteredDescription,
        content: displayBlogs.content,
        userid: userId,
      };
    }

    console.log(blogDetails);

    Axios({
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      params: {
        id: displayBlogs._id,
      },
      data: blogDetails,

      withCredentials: true,
      url: 'http://localhost:3000/updateblog',
    })
      .then((res) => {
        console.log(res);
        history.push('/Blogs');
      })
      .catch((err) => {
        console.log(err);
        console.log('main nhi chal rha hoon bhai');
      });
  };

  useEffect(() => {
    console.log('main id', location.state);

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
        setParsedContent(ReactHtmlParser(displayBlogs.content));
        console.log('yahan');
        // console.log(displayBlogs)
        //     // console.log(data)
      });
  }, []);

  return (
    <div>
      {parsedContent && displayBlogs && (
        <div className='App'>
          {/* <h2>Using CKEditor 5 build in React</h2> */}
          <input
            type='text'
            defaultValue={displayBlogs.title}
            id='editedtitle'
          />
          <input
            type='text'
            defaultValue={displayBlogs.description}
            placeholder='Description'
            id='editeddesc'
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
              setChangedCont(true);
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
      )}
    </div>
  );
}

export default EditBlog;
