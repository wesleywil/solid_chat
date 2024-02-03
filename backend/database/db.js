import * as sqlite3 from "sqlite3";

// Open SQLite database connection
const db = new sqlite3.default.Database("database.sqlite");

// Create a table for users
db.run(
  "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, socketID TEXT NOT NULL)"
);

export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const selectQuery = "SELECT * FROM users";
    db.all(selectQuery, [], function (err, rows) {
      if (err) {
        console.error("Error from database fetching users: ", err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

export const createUser = (username, socketID) => {
  return new Promise((resolve, reject) => {
    const insertQuery = `INSERT INTO users (username, socketID) VALUES (?,?)`;
    const params = [username, socketID];
    db.run(insertQuery, params, function (err) {
      if (err) {
        console.error("Error from database deleting user: ", err.message);
        reject(err);
      } else {
        console.log("USER CREATED");
        resolve(this.lastID);
      }
    });
  });
};

export const deleteUser = (socketID) => {
  return new Promise((resolve, reject) => {
    const deleteQuery = "DELETE FROM users WHERE socketID = ?";
    const params = [socketID];
    db.run(deleteQuery, params, function (err) {
      if (err) {
        console.error("Error deleting user: ", err.message);
        reject(err);
      } else {
        console.log("USER DELETED");
        resolve();
      }
    });
  });
};
