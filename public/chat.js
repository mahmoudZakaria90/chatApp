const socket = io.connect('http://localhost:4000');

//DOM
const chat = document.querySelector('#chat');
const chatWin = document.querySelector('#chatWin');
const chatInner = document.querySelector('#chatInner');
const chatUser = document.querySelector('#chatUser');
const chatMsg = document.querySelector('#chatMsg');
const chatTyping = document.querySelector('#chatTyping');


function emitChat(e){
	e.preventDefault();
	const user = chatUser.value;
	const msg = chatMsg.value;
	socket.emit('chat', {user, msg})
}

function updateChat(data){
	chatInner.innerHTML += `<p><strong>${data.user}: </strong> <span>${data.msg}</span></p>`;
	chatUser.value = '';
	chatMsg.value = '';
	chatTyping.innerHTML = '';
}

function updateTyping(data) {
	chatTyping.innerHTML = `${data} is typing a message...`
}

//Front-end listeners
chat.addEventListener('submit', emitChat);
chatMsg.addEventListener('keypress', function(){
	socket.emit('typing', chatUser.value)
})


//Socket listeners
socket.on('update', updateChat)
socket.on('updateTyping', updateTyping)
