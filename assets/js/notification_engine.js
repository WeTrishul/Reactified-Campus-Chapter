



class ChatEngine{
    constructor(chatBoxId, username ,chattype){
        this.chatBox = $(`#${chatBoxId}`);
        this.username = username;
      

        this.socket = io.connect('http://localhost:7000');

        if (this.username){
            this.connectionHandler();
        }

    }


    connectionHandler(){

        const self = this

        this.socket.on('connect', function(){
            console.log('notification engine is running...!');

                self.socket.emit('join_room',{
                    
                    chatroom:self.username
                })
    
                self.socket.on('user_joined',()=>{
                    console.log('Acknowledged by server')
                })

    
            
        });

    }
}
