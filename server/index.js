

var express = require('express');
var app = express();
var server = require('http').Server(app);

var io = require('socket.io')(server);

app.get('/', function(req,res){
    res.send('hello');
    
});
let connectionRoomCount = {};

io.on('connection',function (socket) {
    socket.on('connection-room',(data)=>{
        socket.join(data.roomId)
        connectionRoomCount[data.roomId] =(typeof connectionRoomCount[data.roomId] == 'undefined' ? 0 :connectionRoomCount[data.roomId] ) +1
        io.to(data.roomId).emit('connection-room-view',{ count: connectionRoomCount[data.roomId]});
        console.log(connectionRoomCount);
    });
 
    socket.on('leave-room',(data)=>{
        console.log(data);
        socket.leave(data.roomId);
        connectionRoomCount[data.roomId] =(typeof connectionRoomCount[data.roomId] == 'undefined' ? 0 :connectionRoomCount[data.roomId] -1 )
        io.to(data.roomId).emit('connection-room-view',{ count: connectionRoomCount[data.roomId]});
        console.log(connectionRoomCount);
    });
 });

server.listen(3000);
