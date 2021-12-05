import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client"

const AuthContext = React.createContext({
    token:'',
    id:'',
    username:'',
    isLoggedIn:'false',
    usertype:'',
    login: (token) => {},
    userId:(id) => {},
    userName:(username) => {},
    logout: () => {},
    userrole:(usertype) =>{}
});

const calculateRemainingTime = (expirationTime) =>{
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();

    const remainingTime = adjExpirationTime - currentTime;

    return remainingTime
}

export const AuthContextProvider =(props) =>{

    const initialToken = localStorage.getItem('token');
    const initialId = localStorage.getItem('id');
    const initialUsername = localStorage.getItem('username');
    const initialUsertype = localStorage.getItem('usertype')
    const [token,setToken] = useState(initialToken);
    const [usertype,setUserType] = useState(initialUsertype);
    const [id,setUserId] = useState(initialId);
    const [username, setUserName] = useState(initialUsername);


    const userIsLoggedIn = !!token;

    

    

    const useridHandler = (id) =>{
        setUserId(id);
        localStorage.setItem('id',id)

        


    }

    const usernameHandler = (username) =>{
        setUserName(username);
        localStorage.setItem('username',username)
    }

    const usertypeHandler = (usertype) =>{
        setUserType(usertype);
        localStorage.setItem('usertype',usertype)
    }

    const logoutHandler =() =>{
        setToken('')
        setUserId('')
        setUserName('')
        setUserType('')
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('username');
        localStorage.removeItem('usertype');
    };

    const loginHandler = (token, expirationTime) =>{
        setToken(token);
        localStorage.setItem('token',token);

        const remainingTime = calculateRemainingTime(expirationTime)
        setTimeout(logoutHandler, remainingTime)
    }


    const contextValue ={
        token:token,
        id:id,
        username:username,
        isLoggedIn: userIsLoggedIn,
        usertype:usertype,
        login: loginHandler,
        userId:useridHandler,
        userName:usernameHandler,
        logout: logoutHandler,
        userrole:usertypeHandler
    }

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;