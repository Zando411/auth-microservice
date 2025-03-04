require('dotenv').config();
const axios = require('axios');

const PORT = process.env.PORT || 3456;

const email1 = 'test@example.com';
const password1 = 'password123';
const email2 = 'michael@example.com';
const password2 = 'password456';
const junkEmail = 'junk@example.com';
const junkPassword = null;

async function signup(email, password) {
  try {
    const response = await axios.post(`http://localhost:${PORT}/api/signup`, {
      email,
      password,
    });
    console.log(`Signup successful for ${email}:`, response.data.message);
  } catch (error) {
    console.error(
      `Error during signup for ${email}:`,
      error.response.data.message
    );
  }
}

async function checkUser(email) {
  try {
    const response = await axios.post(
      `http://localhost:${PORT}/api/checkUser`,
      { email }
    );
    console.log(`User check for ${email}:`, response.data.message);
  } catch (error) {
    console.error(
      `Error checking user ${email}:`,
      error.response.data.message
    );
  }
}

async function login(email, password) {
  try {
    const response = await axios.post(`http://localhost:${PORT}/api/login`, {
      email,
      password,
    });
    console.log(`Login successful for ${email}:`, response.data.message);
  } catch (error) {
    console.error(
      `Error during login for ${email}:`,
      error.response.data.message
    );
  }
}

// Test the functions
async function runTests() {
  console.log('Starting User Signup Tests...');
  await signup(email1, password1);
  await signup(email2, password2);
  await signup(email2, junkPassword); // Expected to fail

  console.log('\nChecking If Users Exist...');
  await checkUser(email1);
  await checkUser(email2);
  await checkUser(junkEmail); // Expected to fail

  console.log('\nTesting User Login...');
  await login(email1, password1);
  await login(email2, password2);
  await login(junkEmail, junkPassword); // Expected to fail
}
runTests();
