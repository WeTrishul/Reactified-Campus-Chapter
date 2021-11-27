import React from 'react'
import {useRef} from 'react'
import {useContext} from "react"
import AuthContext from '../../Service/auth-context';
import { CKEditor } from 'ckeditor4-react';
import {useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom"



function WriteBlogs() {

    const [editor,setEditor]= useState({})
    let history = useHistory();

    const authCtx = useContext(AuthContext)
    let userId=authCtx.id;


    const titleInputRef = useRef();
    const descriptionInputRef = useRef();

    const blogSubmitHandler = () =>{

        const enteredTitle = titleInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;

        const blogDetails ={
            title:enteredTitle,
            description:enteredDescription,
            content:editor,
            userid:userId
        }

        axios.post('http://localhost:3000/saveblog',blogDetails,{
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        })
        .then(res => {
            console.log(res);
            history.push("/Blogs")
            
        }).catch(err => {
            console.log(err);
            console.log("main nhi chal rha hoon bhai")
        });
    }

    
    


    return (
        <div>
           <div className="App">
                {/* <h2>Using CKEditor 5 build in React</h2> */}
                <div style={{textAlign:"centre"}} className="titleAndDescription">
                <input style={{textAlign:"centre"}} type="text" placeholder="Title" ref={titleInputRef} />
                <input style={{textAlign:"centre"}} type="text" placeholder="Description" ref={descriptionInputRef}/>
                </div>
                <CKEditor
                    editor="null"
                    initData="<p>Write a blog!!</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    // onChange={ ( event, editor ) => {
                    //     const data = editor.getData();
                    //     console.log( { event, editor, data } );
                    // } }
                    // onChange ={(e) => {setEditor(e.target.value)}}

                    onChange={evt => { 
                    
                    const editorValue = evt.editor.getData() 
                setEditor(editorValue)}}
                    
                    />

                    {/* onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } } */}
                {/* /> */}
                <div className="submitBlog">
                    <button style={{width:"100px", 
                    background:'#5595fd', 
                    borderStyle:"none",
                    height:"5vh",
                    borderRadius:"20px",
                    marginTop:"1rem", 
                    marginLeft:"1rem", 
                    cursor:"pointer", 
                    color:"white"}} onClick={blogSubmitHandler}>Submit</button>
                </div>
            </div>
        
        </div>
    )
}

export default WriteBlogs




// // class App extends Component {
// //     render() {
// //         return (
// //             <div className="App">
// //                 <h2>Using CKEditor 5 build in React</h2>
// //                 <CKEditor
// //                     editor={ ClassicEditor }
// //                     data="<p>Hello from CKEditor 5!</p>"
// //                     onReady={ editor => {
// //                         // You can store the "editor" and use when it is needed.
// //                         console.log( 'Editor is ready to use!', editor );
// //                     } }
// //                     onChange={ ( event, editor ) => {
// //                         const data = editor.getData();
// //                         console.log( { event, editor, data } );
// //                     } }
// //                     onBlur={ ( event, editor ) => {
// //                         console.log( 'Blur.', editor );
// //                     } }
// //                     onFocus={ ( event, editor ) => {
// //                         console.log( 'Focus.', editor );
// //                     } }
// //                 />
// //             </div>
// //         );
// //     }
// // }

// // export default App;


// import React, {Component} from "react";
// import CKEDITOR from "@ckeditor/ckeditor5-build-classic"

// export default class CKEditor extends Component {
//   constructor(props) {
//     super(props);
//     this.componentDidMount = this.componentDidMount.bind(this);
//   }

//   render() {
//     return (
//       <textarea name="editor" cols="100" rows="6" defaultValue={this.props.value}></textarea>
//     )
//   }

//   componentDidMount() {
//     let configuration = {
//       toolbar: "Basic"
//     };
//     CKEDITOR.replace("editor", configuration);
//     CKEDITOR.instances.editor.on('change', function () {
//       let data = CKEDITOR.instances.editor.getData();
//       this.props.onChange(data);
//     }.bind(this));
//   }
// }