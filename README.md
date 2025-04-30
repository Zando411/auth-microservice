# Auth Microservice

This microservice handles **user authentication and registration** for the
**CatCall** application. It provides RESTful endpoints for signing up and
logging in with email and password.

## ⚠️ Disclaimer

This microservice was developed by another student as part of a group project.  
I did **not** write this code, and it does **not** reflect my coding standards
or practices, and I do **not endorse** the security or design of this
implementation.

I am documenting it here solely because it is a part of the overall CatCall
project.  
While I may consider rewriting it in the future, that is unlikely as I currently
consider the project functionally complete.

## Important Notes

- This service uses a **basic, insecure** form of authentication that **does not
  include JWT or any other standard security practices**. It is strictly for
  **testing and development use only**, and **must not be used in production**.
- This service is designed to run only as part of the full
  [CatCall application](https://github.com/zandonella/CatCall) and is **not
  intended to be deployed independently**.
- MongoDB must be running and accessible using the URI defined in your `.env`
  file.

## Base Configuration

- **Base URL:** `http://localhost:<PORT>/api/`
- **Default Port:** `3000`
- **Port in CatCall:** Determined by `PORT_<SERVICE>` in the root `.env`
- **Change the Port:** Set `PORT=<your_port>` in a `.env` file (see
  `.env.example` for a template).
- **Content Type:** `application/json`
- **Response Format:** `JSON`

---

## Endpoints

> All endpoints expect and return JSON. If a server or database error occurs, a
> `500 Internal Server Error` will be returned with a generic error message.

| Method | Route            | Description                            |
| ------ | ---------------- | -------------------------------------- |
| POST   | `/api/signup`    | Register a new user                    |
| POST   | `/api/login`     | Authenticate a user                    |
| POST   | `/api/checkUser` | Check if a user exists in the database |

---

### `POST /api/signup`

**Register a new user account.**

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response:**

```json
{ "message": "User created successfully" }
```

**Error Responses:**

- `400 Bad Request` – Missing fields

  ```json
  { "message": "Email and password are required." }
  ```

- `409 Conflict` – User already exists
  ```json
  { "message": "User already exists" }
  ```

---

### `POST /api/login`

**Authenticate an existing user.**

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response:**

```json
{ "message": "Login successful" }
```

**Error Responses:**

- `400 Bad Request` – Missing fields

  ```json
  { "message": "Email and password are required." }
  ```

- `401 Unauthorized` – Invalid credentials
  ```json
  { "message": "Invalid email or password" }
  ```

---

### `POST /api/checkUser`

**Check if a user exists in the database.**

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

**Success Response:**

- If user exists

  ```json
  { "message": "User exists" }
  ```

- If user does not exist
  ```json
  { "message": "User does not exist" }
  ```

**Error Response:**

- `400 Bad Request` – Missing email
  ```json
  { "message": "Email is required." }
  ```

---

## Environment Setup To Run Locally

1. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

2. Modify the values in `.env` as needed:

   **Example `.env` contents:**

   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/catcall-auth
   ```

---

## Running Locally (Without Docker)

Make sure [Node.js](https://nodejs.org/) is installed and MongoDB is running.
Then:

```bash
npm install
npm start
```

Expected output:

```
Auth microservice listening on port 3000
Connected to MongoDB
```

---

## Running with Docker

You can also run this microservice in isolation using Docker:

### 1. Build the image

```bash
docker build -t auth-microservice .
```

### 2. Run the container

```bash
docker run -p 3000:3000 --env-file .env auth-microservice
```

> ⚠️ Make sure your `.env` file is in the root directory and includes
> `MONGO_URI`.

---
