



class ChatEngine{
    constructor(chatBoxId, username ,chattype){
        this.chatBox = $(`#${chatBoxId}`);
        this.username = username;
        this.chattype=chattype;

        this.socket = io.connect('http://localhost:5000');

        if (this.username){
            this.connectionHandler();
        }

    }


    connectionHandler(){

        const self = this

        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');

                self.socket.emit('join_room',{
                    username:self.username,
                    chatroom:self.chattype
                })
    
                self.socket.on('user_joined',(data)=>{
                    console.log('user joined',data)
                })
            
        });


        $('#send-message').click(()=>{
            
            let msg = $('#chat-message-input').val();
            console.log(msg)
            if (msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    username: self.username,
                    chatroom: self.chattype
                });
            }
        });

        self.socket.on('receive_message',(data)=>{
            console.log('message recieved',data.message)

            let newMessage = $('<li>');

            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.append($('<sub>', {
                'html': data.username
            }));


            $('#chat-messages-list').append(newMessage);
        })

    }
}

