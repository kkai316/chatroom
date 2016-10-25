var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');



app.get('/', function(req, res){
  //res.sendFile(__dirname + '/index.html');
  //console.log(res);
  //res.send('Username: ' + req.query['username']);
  res.sendFile(__dirname + '/chat.html');

});

app.post('/', function(req, res){
  //res.sendFile(__dirname + '/index.html');
  console.log(res.body);

});

io.on('connection', function(socket){
  console.log('hello user!, a user connected');
  socket.broadcast.emit('everyone');
  
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    console.log('------user disconnected-----');
    io.emit('leave notice');
  });


});

http.listen(3000, function(){
  console.log('listening on *:3000');
});