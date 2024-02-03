export function messageAll(socket, data) {
  socket.emit("messageResponse", data);
}

export function privateMessage(socket, data) {
  // Emit to the recipient
  socket.to(data.toId).emit("messageResponse", {
    text: data.text,
    name: data.name,
    id: data.id,
    socketID: data.socketID,
  });
  // Emit to the sender
  socket.emit("messageResponse", {
    text: data.text,
    name: data.name,
    id: data.id,
    socketID: data.socketID,
  });
}
