module.exports.chatSockets=function(socketServer){
    let io=require('socket.io')(socketServer,{
        cors: {
            origin: "http://localhost:8000",
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true
          }
    });
   
    // receives a connection and emits back that the connection has been established
    io.sockets.on('connection',function(socket){
        console.log('new connection established',socket.id);
        

        socket.on('disconnect',function(){
            console.log('socket disconnected');
        });
        // .on detects the event emitted by the user
        socket.on('join_room',function(data){
            console.log('joining request received',data);

            // user will be connected to the chat room if the connection has been established
            socket.join(data.chatroom);

            // emitting the notifcation to other users that a new user has entered the chat room
            io.in(data.chatroom).emit('user_joined',data);
        });
        // detect send_message and broadcast to everyone in the room
        socket.on('send_message',function(data){
            io.in(data.chatroom).emit('receive_message',data);
        })
    });
}