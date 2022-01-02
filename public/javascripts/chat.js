const socket = io();
const chatForm = document.querySelector('#chat-form');
const chatbox = document.querySelector('#chat');

/**
 * Recieves chat history on fresh connection.
 */
socket.on('chats', (data) => {
    data.forEach(chat => buildMessage(chat));
});

/**
 * Recieves messages from server and add them to chatbox.
 */
 socket.on('message', (message) => {
    buildMessage(message);
    chatbox.scrollTop = chatbox.scrollHeight;
})

/**
 * Executes when 'enter' button is clicked to emit message to server.
 */
chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const msg = document.querySelector("#msg").value;
	if (msg) {
		const name = document.querySelector('meta[name=name]').content;
		const avatar = document.querySelector('meta[name=avatar]').content;
		const data = {name: name, avatar: avatar, msg: msg}
		socket.emit('submit', data);
    }
	document.querySelector("#msg").value = "";
});

/**
 * Turns message data into a HTML DOM element
 */
function buildMessage(data) {
	// Create message interface with HTML
	let mainDiv = document.createElement("div");
	mainDiv.setAttribute("id", "chat-message");
	
	let avatar = document.createElement("img");
	avatar.setAttribute("id", "chat-avatar");
	avatar.setAttribute("src", data.avatar); // Change This!
	mainDiv.appendChild(avatar);
	
	let innerDiv = document.createElement("div");
	innerDiv.setAttribute("id", "msg-text");
	mainDiv.appendChild(innerDiv);
	
	let textName = document.createElement("p");
	textName.setAttribute("id", "chat-name");
	textName.setAttribute("class", "no-margin-p");
	textName.appendChild(document.createTextNode(data.name)); // Change This!
	innerDiv.appendChild(textName);
	
	let textContent = document.createElement("p");
	textContent.setAttribute("id", "msg-content");
	textContent.setAttribute("class", "no-margin-p");
	textContent.appendChild(document.createTextNode(data.msg)); // Change This!
	innerDiv.appendChild(textContent);
	
	// Append message to chatbox
	let mySpan = document.querySelector("#chat");
	mySpan.appendChild(mainDiv);
}