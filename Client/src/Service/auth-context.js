import React, {useState} from 'react';


const AuthContext = React.createContext({
    token:'',
    id:'',
    isLoggedIn:'false',
    login: (token) => {},
    userId:(id) => {},
    logout: () => {}

});

export const AuthContextProvider =(props) =>{

    const initialToken = localStorage.getItem('token');
    const initialId = localStorage.getItem('id');
    const [token,setToken] = useState(initialToken);
    const [id,setUserId] = useState(initialId);

    const userIsLoggedIn = !!token;

    const loginHandler = (token) =>{
        setToken(token);
        localStorage.setItem('token',token);
    }

    const useridHandler = (id) =>{
        setUserId(id);
        localStorage.setItem('id',id)
    }

    const logoutHandler =() =>{
        setToken('')
        setUserId('')
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        
    };

    

    const contextValue ={
        token:token,
        id:id,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        userId:useridHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;