Microservice-A---user-login
Microservice A - user login authentication

User Login Microservice This microservice takes the user's login information and verifies that the user has a an account.

Communication Contract This microservice follows a express.js framework with JSON response.

Base URL: http://localhost:3362/verifyUser Default Port: 3362 To change the port: Set PORT= in a .env file (Environment Variables).

How to Programmatically REQUEST Data Endpoint: POST /verifyUser Description: verifies user login

Response for Verifying User Login

Example for successful login: return res.status(200).json({ message: 'User exists.' }); Example for unsuccessful login: return res.status(404).json({ message: 'User does not exist.' });
