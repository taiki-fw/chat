var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("chat message", function(msg) {
    console.log("message: " + JSON.stringify(msg));
    io.emit("chat message", msg); // chat message = channel
  });
});

http.listen(3001, function() {
  console.log("listening on *:3001");
});
