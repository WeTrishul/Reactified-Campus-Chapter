import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client"

const AuthContext = React.createContext({
    token:'',
    id:'',
    username:'',
    isLoggedIn:'false',
    flag:'',
    login: (token) => {},
    userId:(id) => {},
    userName:(username) => {},
    logout: () => {},
    render: (flag) => {}

});

export const AuthContextProvider =(props) =>{

    const initialToken = localStorage.getItem('token');
    const initialId = localStorage.getItem('id');
    const initialUsername = localStorage.getItem('username');
    const flagValue = localStorage.getItem('flag');
    const [token,setToken] = useState(initialToken);
    const [flag,setFlag] = useState('');
    const [id,setUserId] = useState(initialId);
    const [username, setUserName] = useState(initialUsername);


    const userIsLoggedIn = !!token;

    const renderHandle =(flag) =>{
        var flag = '1';
        setFlag(flag);
        localStorage.setItem('flag',flag)
    }

    const loginHandler = (token) =>{
        setToken(token);
        localStorage.setItem('token',token);
    }

    const useridHandler = (id) =>{
        setUserId(id);
        localStorage.setItem('id',id)
    }

    const usernameHandler = (username) =>{
        setUserName(username);
        localStorage.setItem('username',username)
    }

    const logoutHandler =() =>{
        setToken('')
        setUserId('')
        setUserName('')
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('username');
        
    };



    const contextValue ={
        token:token,
        id:id,
        username:username,
        isLoggedIn: userIsLoggedIn,
        flag:flag,
        login: loginHandler,
        userId:useridHandler,
        userName:usernameHandler,
        logout: logoutHandler,
        render:renderHandle,
    }

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;