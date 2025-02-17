// Import required modules
const express = require('express');
const mysql = require('mysql');
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Set up the database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // Replace with your MySQL username
  password: 'Abhi@123',   // Replace with your MySQL password
  database: 'classroom_finder_db'  // Replace with your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err.stack);
    return;
  }
  console.log('Connected to the database as id ' + db.threadId);
});

// Create an endpoint to retrieve all classrooms (GET)
app.get('/classrooms', (req, res) => {
  const query = 'SELECT * FROM classrooms'; // Query to get classrooms
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results); // Send results as JSON
    }
  });
});

// Create an endpoint to add a classroom (POST)
app.post('/classrooms', (req, res) => {
  const { name, capacity } = req.body;  // Extract data from the request body
  const query = 'INSERT INTO classrooms (name, capacity) VALUES (?, ?)';
  db.query(query, [name, capacity], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'Classroom created', id: result.insertId });
    }
  });
});

// Set up a route to check server status (GET)
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Start the server on port 5000 (or any port you prefer)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
