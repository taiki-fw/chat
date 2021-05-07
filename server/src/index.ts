import http from "http";
import socketio, { Socket } from "socket.io";

const port = process.env.PORT || 3001;
const server: http.Server = http.createServer();
const io: socketio.Server = new socketio.Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", function (socket: Socket) {
  console.log("a user connected");
  socket.on("chat message", function (msg: string) {
    console.log("message: " + JSON.stringify(msg));
    io.emit("chat message", msg);
  });
});

server.listen(port, function () {
  console.log("listening on *:3001");
});
