import express from "express";
import http from "node:http";
import cors from "cors";
import { Server as SocketIOServer } from 'socket.io';

const app = express();
const PORT = 5000;

const server = http.Server(app);

app.use(cors());

const socketIO = new SocketIOServer(server, {
    cors:{
        origin:"http://localhost:3000"
    }
});

socketIO.on('connection', (socket)=>{
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on("message", (data)=>{
        console.log('message from client => ',data);
        socketIO.emit('messageResponse', data);
    })
    socket.on('disconnect', ()=>{
        console.log('🔥: A user disconnected');
    })
})



app.get("/api", (req, res)=>{
    res.json({
        message:"Hello world!",
    })
})

server.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}`)
})



