export function handleNewUser(socket, data, createUserCallback) {
  createUserCallback(data.username, socket.id, (err, userId) => {
    if (err) {
      if (
        err.message ===
        "SQLITE_CONSTRAINT: UNIQUE constraint failed: users.username"
      ) {
        console.log("username is already taken");
        socket.emit("newUserError", "username is already taken");
      } else {
        console.error("Error creating user: ", err.message);
        return;
      }
    } else {
      users.push({
        id: userId,
        username: data.username,
        socketID: socket.id,
      });
      socket.emit("newUserResponse", users);
    }
  });
}

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
    throw err;
  }
}

export function handleDeleteUser(
  socket,
  getAllUsersCallback,
  deleteUserCallback
) {
  deleteUserCallback(socket.id, (err) => {
    if (err) {
      console.error("Error delete user: ", err.message);
      return;
    }
    getAllUsersCallback((err, rows) => {
      if (err) {
        console.error("Error fetching users: ", err.message);
        return;
      }
      users = rows;
      socket.emit("userDeleteResponse", users);
    });
  });
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

export function handleDisconnect(
  socket,
  getAllUsersCallback,
  deleteUserCallback
) {
  deleteUserCallback(socket.id, (err) => {
    if (err) {
      console.error("Error delete user: ", err.message);
      return;
    }
    getAllUsersCallback((err, rows) => {
      if (err) {
        console.error("Error fetching users: ", err.message);
        return;
      }
      users = rows;
      socket.emit("newUserResponse", users);
    });
  });
  socket.disconnect();
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
