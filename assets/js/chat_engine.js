



class ChatEngine{
    constructor(chatBoxId, userEmail ,chattype){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.chattype=chattype;

        this.socket = io.connect('http://localhost:5000');

        if (this.userEmail){
            this.connectionHandler();
        }

    }


    connectionHandler(){

        const self = this

        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');

            if(self.chattype=='executive')
            {

                self.socket.emit('join_room',{
                    useremail:self.userEmail,
                    chattype:self.chattype,
                    chatroom:'executivechat'
                })
    
                self.socket.on('user_joined',(data)=>{
                    console.log('user joined',data)
                })

            }


            else if(self.chattype=='core')
            {

                self.socket.emit('join_room',{
                    useremail:self.userEmail,
                    chattype:self.chattype,
                    chatroom:'corechat'
                })
    
                self.socket.on('user_joined',(data)=>{
                    console.log('user joined',data)
                })

            }

            
        });
    }
}

// class ss {

//     constructor(email){
//         this.email=email

//         this.printer(email)
//     }

//     printer(email){
//         console.log('Connected bro2'+email)
//     }
// }