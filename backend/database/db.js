import * as sqlite3 from "sqlite3";

// Open SQLite database connection
const db = new sqlite3.default.Database("database.sqlite");

// Create a table for users
db.run(
  "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, socketID TEXT NOT NULL)"
);

export const getAllUsers = (callback) => {
  const selectQuery = "SELECT * FROM users";

  db.all(selectQuery, [], function (err, rows) {
    callback(err, rows);
  });
};

export const createUser = (username, socketID, callback) => {
  const insertQuery = `INSERT INTO users (username, socketID) VALUES (?,?)`;
  const params = [username, socketID];
  db.run(insertQuery, params, function (err) {
    console.log("edsovjh ", insertQuery);
    if (err) {
      return callback(err, null);
    }
    console.log('USER CREATED')
    callback(null, this.lastID);
  });
};

export const deleteUser = (socketID, callback) => {
  const deleteQuery = "DELETE FROM users WHERE socketID = ?";
  const params = [socketID];

  db.run(deleteQuery, params, function (err) {
    console.log('USER DELETED');
    callback(err);
  });
};
