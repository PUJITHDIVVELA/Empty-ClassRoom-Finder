// database.js
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost', // or your MySQL host, for example, '127.0.0.1'
  user: 'root', // Your MySQL username
  password: 'Abhi@123', // Your MySQL password
  database: ' classroom_finder_db ' // Name of your database
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as id ' + connection.threadId);
});

module.exports = connection; // Export the connection for use in server.js
