# Verify User Microservice
This microservice takes the user’s login information (email and password) and verifies that the user has an account against the MongoDB database. 
It returns JSON data on whether the user login is successful or the username or password is incorrect.

## Communication Contract
This microservice follows a express.js framework with JSON response.
**Base URL**: http://localhost:3456
**Default Port**: 3456
**Response Format**: JSON 

#How to Programmatically REQUEST Data
This section shows how to interact with the microservice to make requests

### Verify Username and Password
**Endpoint:** POST /api.login
**Example Successful Response:**
{message: 'Login successful'}
**Example Error Response:**
{message: 'Username or password are incorrect'}

## Environmental Variables
This microservice requires a .env file to be created. You will need to create this file with the following information. 
1. Create a .env file in the root directory
2. Add the following variables:
    MONGODB_URI=mongodb://localhost:27017
    DATABASE_NAME= //insert your database name
   
## Running the Microservice 
Need to have node.js installed: **npm install dotenv**
Start the microservice by running: **npm start**
The console should display: **Microservice running on http://localhost:3456**

## UML Diagram
![image](https://github.com/user-attachments/assets/0800c9f7-f239-49c6-bd30-232d0409cde6)
