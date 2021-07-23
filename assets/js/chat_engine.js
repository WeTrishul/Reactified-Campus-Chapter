



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
            // console.log('message recieved',data.message)

            let newMessage = $('<li>');

            newMessage.append($('<strong>', {
                'html': data.username
            }));
            newMessage.append($('<sub>', {
                'html': data.createdAt
            }));
            newMessage.append($('<br>'));
            
            newMessage.append($('<small>', {
                'html': data.message
            }));


            $('#chat-messages-list').append(newMessage);
        })

        self.socket.on('old_messages',(data)=>{
            console.log(data)

            data.forEach((element) => {

                let newMessage = $('<li>');
                newMessage.append($('<strong>', {
                    'html': element.username
                }));
                newMessage.append($('<sub>', {
                    'html': element.createdAt
                }));
                newMessage.append($('<br>'));
                
                newMessage.append($('<small>', {
                    'html': element.message
                }));
                $('#chat-messages-list').append(newMessage);

            });
          
        })

    }
}

