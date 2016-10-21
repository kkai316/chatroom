var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  //res.sendFile(__dirname + '/index.html');
  console.log(res);
  res.send('Username: ' + req.query['username']);
  res.sendFile(__dirname + '/main.html');

});

/*app.get('/chatroom', function(req, res){
  //res.sendFile(__dirname + '/index.html');
  res.sendFile(__dirname + '/chat.html');

});*/

io.on('connection', function(socket){
  console.log('hello user!, a user connected');
  socket.broadcast.emit('everyone');

  /*socket.on('input_name', function(name){
    console.log('name: ' + name);
    io.emit('input_name', name);
  });*/
  
  
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    console.log('------user disconnected-----');
    io.emit('leave notice');
  });

  /*socket.on('connection', function(){
    io.emit('connect');
  });*/

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});