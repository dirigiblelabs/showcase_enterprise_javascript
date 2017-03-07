/* eslint-env node, dirigible */

var globals = require("core/globals");
var websocket = require("net/websocket");
var context = require("core/context");

var websocketSession = websocket.getSession();
var type = context.get("type");
var from = context.get("from");
var to = context.get("to");
var message = context.get("message");

if (type === "welcome") {
	websocketSession.sendText("Welcome " + from + "!");
	globals.set("chat-session-" + from, websocketSession);
	var chatMembers = globals.get("chat-members");
	if (chatMembers === null) {
		chatMembers = [];
		globals.set("chat-members", chatMembers);
	}
	chatMembers.push(from);
	console.error("registered " + from);
}

if (type === "message") {
	var toSession = globals.get("chat-session-" + to);
	if (toSession !== null) {
		toSession.sendText(message);
		console.error("send to " + to);
	} else {
		console.error("no session for " + to);
	}
}

if (type === "list") {
	chatMembers = globals.get("chat-members");
	console.error("list: " + JSON.stringify(chatMembers));
	websocketSession.sendText(JSON.stringify(chatMembers));
}


/**
-- Client 1
var jsSocket = new WebSocket("ws://localhost:8080/service/js");
jsSocket.send('{"module": "/chat/chat_service.js","params": {"type":"welcome", "from":"Tom"}}');

-- Client 2
var jsSocket = new WebSocket("ws://localhost:8080/service/js");
jsSocket.send('{"module": "/chat/chat_service.js","params": {"type":"welcome", "from":"Jerry"}}');

-- Client 1
jsSocket.send('{"module": "/chat/chat_service.js","params": {"type":"message", "from":"Tom", "to":"Jerry", "message": "Hello Jerry!"}}');

-- Client 2
jsSocket.send('{"module": "/chat/chat_service.js","params": {"type":"message", "from":"Jerry", "to":"Tom", "message": "Hi Tom!"}}');

jsSocket.send('{"module": "/chat/chat_service.js","params": {"type":"list", "from":"Tom"}}');

*/
