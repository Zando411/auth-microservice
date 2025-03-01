const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Express server
const app = express();
const port = process.env.PORT || 3362;

app.use(bodyParser.json());

const verifyUser = async (db, email) => {
  try {
    if (db.type === 'mysql') {
      const [rows] = await db.connection.execute('SELECT * FROM users WHERE email = ?', [email]);
      return rows.length > 0;
    }

    throw new Error('Unsupported database type');
  } catch (error) {
    console.error('Error verifying user:', error);
    return false;
  }
};

app.post('/verifyUser', async (req, res) => {
  const { email, db } = req.body; 

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  if (!db || !db.connection) {
    return res.status(400).json({ message: 'Database connection is required.' });
  }

  try {
    const userExists = await verifyUser(db, email);
    if (userExists) {
      return res.status(200).json({ message: 'User exists.' });
    } else {
      return res.status(404).json({ message: 'User does not exist.' });
    }
  } catch (error) {
    console.error('Error verifying user:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
