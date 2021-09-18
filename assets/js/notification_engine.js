
let socketgiver
class NotiEngine{
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
                
                socketgiver=self.socket
               

                self.socket.on('notification',(data)=>{
                    console.log(data)

                    new Noty({
                        theme: 'relax',
                        text: data,
                        type: 'success',
                        layout: 'centerRight',
                        timeout: 1500
                        
                    }).show();
                })

    
            
        });

    }

  
}


class Notihandler {
    constructor(notifieruser){
      
        this.notifieruser=notifieruser
      
    }

    notify(to,msg)
    {
        console.log('imported')
        socketgiver.emit('notify',{
            to : to,
            from:this.notifieruser,
            msg : msg
        })
       
    }
}

