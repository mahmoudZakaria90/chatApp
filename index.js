const express = require('express');
const socket = require('socket.io');

const app = express();

const server = app.listen(process.env.port || 4000, function(){
	console.log('listening!')
})

app.use(express.static('public'));

const io = socket(server);
io.on('connection', function(socket){
	console.log('Socket', socket.id)
	socket.on('chat', function(data){
		io.sockets.emit('update', data)
	})
	socket.on('typing', function(data){
		socket.broadcast.emit('updateTyping', data);
	})
})

