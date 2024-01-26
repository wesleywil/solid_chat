import express from "express";
import http from "node:http";
import cors from "cors";
import { Server as SocketIOServer } from "socket.io";
import { createUser, deleteUser, getAllUsers } from "./database/db.js";

const app = express();
const PORT = 5000;

const server = http.Server(app);

app.use(cors());

const socketIO = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  // Send Messages
  socket.on("message", (data) => {
    console.log("message from client => ", data);
    socketIO.emit("messageResponse", data);
  });
  // Nofify when a user is typing
  socket.on("typing", (data) => {
    socket.broadcast.emit("typingResponse", data);
  });
  // Listens when a new user joins the server
  socket.on("newUser", (data) => {
    createUser(data.username, socket.id, (err, userId) => {
      if (err) {
        console.error("Error creating user: ", err.message);
        return;
      }
      users.push({ id: userId, username: data.username, socketID: socket.id });
      socketIO.emit("newUserResponse", users);
    });
  });

  socket.on("deleteUser", ()=>{
    deleteUser(socket.id, (err) => {
      if (err) {
        console.error("Error delete user: ", err.message);
        return;
      }
      getAllUsers((err, rows) => {
        if (err) {
          console.error("Error fetching users: ", err.message);
          return;
        }
        users = rows;
        socket.emit("newUserResponse", users);
      });
    });
  })

  // Disconnect User
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    socket.disconnect();
  });
});


app.get("/api", (req, res) => {
  res.json({
    message: "Hello world!",
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
