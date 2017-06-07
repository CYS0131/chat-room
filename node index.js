var app = require('express')(); // 引入express模組
var http = require('http').Server(app); // 引入http模組
var io = require('socket.io')(http); // 整合socket.io，引入socket.io模組
var dirtywords = require('./dirtywords') 

app.get('/', function(request, response){
response.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

// 新user
socket.on('add user',function(msg){
socket.username = msg;
console.log("new user:"+msg+" logged.");
io.emit('add user',{
username: socket.username
});
});

// 監聽新訊息事件
socket.on('chat message', function(msg){
console.log(socket.username+":"+msg);

// 發佈新訊息
io.emit('chat message', {
username:socket.username,
msg:msg
});
});

// left
socket.on('disconnect',function(){
console.log(socket.username+" left.");
io.emit('user left',{
username:socket.username
});
});
});

http.listen(5000, function(){
console.log('Server has stared.'); // HTTP伺服器在http://localhost:5000上運行
});