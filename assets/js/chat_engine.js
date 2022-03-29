class ChatEngine{
    constructor(chatBoxId,userEmail,userName){
        this.chatBox=$(`#${chatBoxId}`);
        this.userEmail=userEmail;
        this.userName=userName;
 

       // emitting a connect event
        this.socket=io.connect('http://localhost:5000',{
        withCredentials: true,
        extraHeaders: {
             "my-custom-header": "abcd"
  }
        });

        if(this.userEmail){
            this.connectionHandler();
        }
    }
    connectionHandler(){
        // ask for joining a room
        let self=this;
        this.socket.on('connect',function(){
            console.log('connection established using sockets..!!');

            self.socket.emit('join_room',{
              user_name:self.userName,
              user_email:self.userEmail,
              chatroom:'wechat',

            });
            self.socket.on('user_joined',function(data){
               console.log('a user joined',data);
            });
        });
        // send a message on clicking the send message button
        $('#send-message').click(function(){
            let msg=$('#chat-message-input').val();

            if(msg!=''){
                self.socket.emit('send_message',{
                    message:msg,
                    user_name:self.userName,
                    user_email:self.userEmail,
                    chatroom:'wechat'
                });
            }
        });
        // detect if the message is received
        self.socket.on('receive_message',function(data){
          console.log('message received',data.message);
            $('#chat-message-input').val(null);
          let newMessage=$('<li>');
            
            let messageType='other-message';
            if(data.user_email==self.userEmail){
                messageType='self-message';
            }
            newMessage.append($('<h3>',{
                'html':data.user_name
            }));
            newMessage.append($('<span>',{
                'html' : data.message
            }));

            newMessage.addClass(messageType);
            $('#chat-messages-list').append(newMessage);
        });
    }
}