import React from "react";
import io from "socket.io-client";


export const socket = io('http://localhost:7000');
const SocketContext = React.createContext(socket);

export const joinNotiRoom = (username) =>{

    socket.emit('join_room',{
                
                        chatroom:username
                    })
    
}





export default SocketContext