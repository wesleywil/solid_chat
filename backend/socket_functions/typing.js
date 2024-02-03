export function typing(socket, data){
    socket.broadcast.to(data.toId).emit("typingResponse", data);
}