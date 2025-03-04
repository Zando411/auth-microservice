require('dotenv').config();  // variables from env file
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

app.use(express.json());  

// env database name
const uri = process.env.MONGODB_URI;
const dbName = process.env.DATABASE_NAME;   
let db;

// MongoDB connection
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    db = client.db(dbName);  // env database name 
    console.log(`Connected to Database: ${dbName}`);
  })
  .catch(error => console.error(error));

// POST - verify login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Validate:
  if (!username || !password) {
    return res.status(400).json({ message: 'Error: Username and password are required.' });
  }

  try {
    // Find the user in the DB
    const user = await db.collection('users').findOne({ username });

    // if the user doesn't have username saved, or incorrect password:
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Successful login
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Microservice running on http://localhost:${port}`);
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
