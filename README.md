# 🔐 Express.js JWT Authentication

A simple and secure authentication system using **Express.js**, **JWT**, **bcrypt**, and **HTTP-only cookies**.

---

## 🌟 Overview
This project demonstrates a complete token-based authentication flow:
- User registration with **bcrypt password hashing**
- Login with **JWT token generation**
- Token stored in a **secure HTTP-only cookie**
- Protected route access only for authenticated users
- Logout functionality that clears the cookie

---

## ⚙️ Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/jwt-auth.git
   cd jwt-auth
2. Install dependencies:
```
npm install
```

3. Create a .env file:

```
JWT_SECRET=your-secret-key
```

4. Start the server:
```
node index.js
```
```
Server will run at http://localhost:3000
```

## 🔒 Security Features

- Passwords hashed using bcrypt

- Tokens signed with JWT secret key

- Cookies set as HTTP-only and SameSite: strict

- Token expiration for added safety

## 🧰 Tech Stack

- Node.js, Express.js, bcrypt, jsonwebtoken, cookie-parser, dotenv