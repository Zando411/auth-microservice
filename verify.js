require('dotenv').config();  // variables from env file
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 3456;

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
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate:
  if (!email || !password) {
    return res.status(400).json({ message: 'Error: email and password are required.' });
  }

  try {
    // Find the user in the DB
    const user = await db.collection('users').findOne({ email });

    // if the user doesn't have username saved, or incorrect password:
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Successful login
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/api/checkUser', async (req, res) => {
  const { email } = req.body;

  // Validate:
  if (!email) {
    return res.status(400).json({ message: 'Error: email is required.' });
  }

  try {
    // Find the user in the DB
    const user = await db.collection('users').findOne({ email });

    // if the user doesn't exist
    if (!user) {
      return res.status(401).json({ message: 'User does not exist' });
    }

    // User exists
    res.status(200).json({ message: 'User exists' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;

  // Validate:
  if (!email || !password) {
    return res.status(400).json({ message: 'Error: email and password are required.' });
  }

  try {
    // make sure user doesn't already exist
    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // create user
    const newUser = { email, password: password };
    await db.collection('users').insertOne(newUser);

    // Successful login
    res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Microservice running on http://localhost:${port}`);
});