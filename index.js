var app = require('express')();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/chat.html');
});

io.on('connection', function(socket){
  console.log('hello user!, a user connected');
  
  //when join the chat room
  socket.on('new user', function(name){
  	socket.username = name;
  	console.log(name + 'logged');
  	socket.broadcast.emit('new user', {username: name});
  });
  
  //chat action
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  //leave chatroom
  socket.on('disconnect', function(){
    console.log(socket.username + '------user disconnected-----');
    io.emit('leave notice', {username: socket.username});
  });

  //typing
  socket.on('typing', function(msg){
    console.log("i am typing");
    io.emit('typing');
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});