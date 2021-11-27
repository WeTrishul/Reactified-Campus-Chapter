import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client"

const AuthContext = React.createContext({
    token:'',
    id:'',
    username:'',
    isLoggedIn:'false',
    login: (token) => {},
    userId:(id) => {},
    userName:(username) => {},
    logout: () => {}

});

export const AuthContextProvider =(props) =>{

    const initialToken = localStorage.getItem('token');
    const initialId = localStorage.getItem('id');
    const initialUsername = localStorage.getItem('username');
    const [token,setToken] = useState(initialToken);
    const [id,setUserId] = useState(initialId);
    const [username, setUserName] = useState(initialUsername);


    const userIsLoggedIn = !!token;

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
        login: loginHandler,
        userId:useridHandler,
        userName:usernameHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;