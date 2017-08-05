const express = require('express');
const socket = require('socket.io');
const os = require('os');
const app = express();

const server = app.listen(process.env.port || 4000, function(){
	console.log('listening!');
	console.log(os.hostname())
})

app.use(express.static('public'));


const io = socket(server);
io.on('connection', function(socket){
	console.log('Socket', socket.id)
	io.sockets.emit('clientName', os.hostname().split('s-')[0])
	socket.on('chat', function(data){
		io.sockets.emit('update', data)
	})
	socket.on('typing', function(data){
		socket.broadcast.emit('updateTyping', data);
	})
	socket.on('sound', function(data){
		socket.broadcast.emit('soundBack', data)
	})
})


