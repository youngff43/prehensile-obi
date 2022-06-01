// Dependancies 
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require('mysql2');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'Charlie89',
      database: 'companyinfo'
    },
    console.log('You are connected to the Company Info database.')
  );

//Selecting all rows from the department table 
db.query(`SELECT * FROM departments`, (err, rows) => {
    console.log(rows);
  });

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });

// Function to start the express server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  module.exports = db 