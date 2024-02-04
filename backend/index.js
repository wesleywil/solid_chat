import express from "express";
import http from "node:http";
import cors from "cors";
import { Server as SocketIOServer } from "socket.io";
import { createUser, deleteUser, getAllUsers } from "./database/db.js";
import { messageAll, privateMessage } from "./socket_functions/message.js";
import { typing } from "./socket_functions/typing.js";
import {
  asyncHandleDisconnect,
  asyncHandleNewUser,
  asyncHandleDeleteUser,
} from "./socket_functions/handleUser.js";

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
    messageAll(socket, data);
  });
  // Send a private message using the socket ID
  socket.on("private_message", (data) => {
    privateMessage(socket, data);
  });
  // Nofify when a user is typing
  socket.on("typing", (data) => {
    typing(socket, data);
  });
  // Listens when a new user joins the server
  socket.on("newUser", async (data) => {
    try {
      users = await asyncHandleNewUser(socket, data, createUser, getAllUsers);
    } catch (error) {
      console.error("Error handling creation of a new user: ", error.message);
    }
  });
  // Delete the user from the list
  socket.on("deleteUser", async () => {
    try {
      users = await asyncHandleDeleteUser(socket, getAllUsers, deleteUser);
    } catch (error) {
      console.error("Error handling deleting a user: ", error.message);
    }
  });

  // Disconnect User
  socket.on("disconnect", async () => {
    console.log("🔥: A user disconnected");
    try {
      users = await asyncHandleDisconnect(socket, getAllUsers, deleteUser);
      console.log("Updated user list:", users);
    } catch (error) {
      console.error("Error handling disconnect: ", error.message);
    }
  });
});
// Fetch all users from the database
app.get("/api/users", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json({ users: users });
  } catch (error) {
    console.error("Error trying to fetch users: ", error.message);
    res.json({
      error: "Error while trying to fetch users",
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
