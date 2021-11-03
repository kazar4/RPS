var socket;

//io.on('connect', onConnect);

var exampleSocket;

function connect() {

  anim();

  var client = new WebSocketClient('ws', '127.0.0.1', 8080, '/WebSocketServer/endpoint');

  client.connect();

}
/*  console.log("connect");
  socket = io.connect('http://127.0.0.1:3000');
//  let inputVal = document.getElementById("PIN_Input").value;
//  console.log(inputVal);
  //socket.emit('PIN', inputVal);
//  socket.send(inputVal);

// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});

// Listen for messages
//socket.addEventListener('message', function (event) {
//    console.log('Message from server ', event.data);
//});

  socket.send("Plz work");
  // Create WebSocket connection.
  /*
  exampleSocket = new WebSocket('ws://127.0.0.1:3000');

  exampleSocket.onopen = function (event) {
  exampleSocket.send("Here's some text that the server is urgently awaiting!");
  };

exampleSocket.onmessage = function (event) {
  console.log(event.data);

}

  //const socket = new WebSocket('ws://127.0.0.1:3000');





function move(num){
  console.log(num);
  var text = "/:" + num;
  socket.send(text);
}


socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});
*/

class WebSocketClient {

    constructor(protocol, hostname, port, endpoint) {

        this.webSocket = null;

        this.protocol = protocol;
        this.hostname = hostname;
        this.port     = port;
        this.endpoint = endpoint;
    }

    getServerUrl() {
        return this.protocol + "://" + this.hostname + ":" + this.port + this.endpoint;
    }

    connect() {
        try {
            this.webSocket = new WebSocket(this.getServerUrl());

            //
            // Implement WebSocket event handlers!
            //
            this.webSocket.onopen = function(event) {
                console.log('onopen::' + JSON.stringify(event, null, 4));
            }

            this.webSocket.onmessage = function(event) {
                var msg = event.data;
                console.log('onmessage::' + JSON.stringify(msg, null, 4));
            }
            this.webSocket.onclose = function(event) {
                console.log('onclose::' + JSON.stringify(event, null, 4));
            }
            this.webSocket.onerror = function(event) {
                console.log('onerror::' + JSON.stringify(event, null, 4));
            }

        } catch (exception) {
            console.error(exception);
        }
    }

    getStatus() {
        return this.webSocket.readyState;
    }
    send(message) {

        if (this.webSocket.readyState == WebSocket.OPEN) {
            this.webSocket.send(message);

        } else {
            console.error('webSocket is not open. readyState=' + this.webSocket.readyState);
        }
    }
    disconnect() {
        if (this.webSocket.readyState == WebSocket.OPEN) {
            this.webSocket.close();

        } else {
            console.error('webSocket is not open. readyState=' + this.webSocket.readyState);
        }
    }
}
