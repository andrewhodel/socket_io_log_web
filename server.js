Tail = require('tail').Tail;
var tail = new Tail("/home/ec2-user/collect-listener.log");
var fs = require('fs');
var client = fs.readFileSync('./client.html');

var requestListener = function(req, res) {

	res.writeHead(200);
	res.end(client.toString('utf8'));

}

const httpServer = require("http").createServer(requestListener);
const io = require("socket.io")(httpServer, {
  // ...
});

tail.on('line', function(data) {
	//console.log(data);
	io.emit('log', {line: data});
});

io.on("connection", (socket) => {

	console.log('new connection');

});

httpServer.listen(3000);
