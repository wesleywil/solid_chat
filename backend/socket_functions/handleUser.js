export async function asyncHandleNewUser(
  socket,
  data,
  createUserCallback,
  getAllUsersCallback
) {
  try {
    const userId = await createUserCallback(data.username, socket.id);
    console.log("User created with ID: ", userId);
    const users = await getAllUsersCallback();
    socket.emit("newUserResponse", users);
    return users;
  } catch (err) {
    console.error("Error handling new user: ", err.message);
    if(err.message.includes("SQLITE_CONSTRAINT: UNIQUE constraint failed: users.username")){
      const error = new Error("Username already exists!");
      socket.emit("newUserError", error.message);
    throw err;
    }else{
      socket.emit("newUserError", err.message);
    }
    
  }
}

export async function asyncHandleDeleteUser(
  socket,
  getAllUsersCallback,
  deleteUserCallback
) {
  try {
    await deleteUserCallback(socket.id);
    const users = await getAllUsersCallback();
    socket.emit("userDeleteResponse", users);
    return users;
  } catch (err) {
    console.error("Error handling delete of a user: ", err.message);
    throw err;
  }
}

export async function asyncHandleDisconnect(
  socket,
  getAllUsersCallback,
  deleteUserCallback
) {
  try {
    await deleteUserCallback(socket.id);
    const users = await getAllUsersCallback();
    socket.emit("newUserResponse", users);
    return users;
  } catch (err) {
    console.error("Error handling disconnect: ", err.message);
    throw err;
  } finally {
    socket.disconnect();
  }
}
