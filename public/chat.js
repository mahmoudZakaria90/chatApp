const socket = io.connect('http://localhost:4000');

//DOM
const chat = document.querySelector('#chat');
const chatWin = document.querySelector('#chatWin');
const chatInner = document.querySelector('#chatInner');
const chatMsg = document.querySelector('#chatMsg');
const chatTyping = document.querySelector('#chatTyping');
const client = document.querySelector('#clientName');
let notif = new Audio('https://raw.githubusercontent.com/mahmoudZakaria90/myCodePenStuff/master/audio/notification.mp3');
let backUp = [];
let chatUser;


function emitChat(e){
	e.preventDefault();
	const user = chatUser;
	const msg = chatMsg.value;
	backUp.push({user, msg});
	socket.emit('chat', {user, msg});
	socket.emit('sound', backUp);
}

function updateChat(data){
	chatInner.innerHTML += `<p><strong>${data.user}: </strong> <span>${data.msg}</span></p>`;
	chatMsg.value = '';
	chatTyping.innerHTML = '';
	if(chatInner.offsetHeight >= chatWin.offsetHeight) {
		chatWin.scrollTop = chatInner.offsetHeight
	}
}

function updateTyping(data) {
	chatTyping.innerHTML = `${data} is typing a message...`
}

function clientName(data) {
	chatUser = data;
	client.innerHTML = `Logged in as, <span>${data}</span>`
}

function notification(data) {
	document.title = `Messages (${data.length})`;
	notif.play()
}

//Front-end listeners
chat.addEventListener('submit', emitChat);
chatMsg.addEventListener('keypress', function(){
	socket.emit('typing', chatUser)
})


//Socket listeners
socket.on('update', updateChat)
socket.on('updateTyping', updateTyping)
socket.on('clientName', clientName)
socket.on('soundBack', notification)
