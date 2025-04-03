# MERN Chat Application Backend

A real-time chat application backend built with Node.js, Express, MongoDB, and Socket.IO. This backend powers a chat application with real-time messaging capabilities, user authentication, and group chat functionality.

## Features

- Real-time messaging with Socket.IO
- User authentication with JWT
- Group chat creation and management
- REST API for client applications
- MongoDB database integration
- CORS support for frontend connection

## Technologies Used

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Real-time Communication**: Socket.IO
- **Authentication**: JWT with bcryptjs
- **Cross-Origin Resource Sharing**: CORS

## Project Structure

- `server.js` - Main server file and Express configuration
- `socket.js` - Socket.IO implementation for real-time messaging
- `models/` - Database models (User, Group, Chat)
- `routes/` - API route definitions
- `middleware/` - Authentication and validation middleware

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the server:
   ```
   npm start
   ```

## API Endpoints

- `/api/users` - User registration, login, and profile management
- `/api/groups` - Group creation, joining, and management
- `/api/messages` - Message sending and retrieval

## Socket.IO Events

- `connection` - Client connection establishment
- `message` - Real-time message exchange
- `joinRoom` - User joining a chat room/group
- `typing` - User typing indicators
- `disconnect` - Client disconnection handling

## Frontend Integration

This backend is designed to work with a React frontend. The CORS configuration is set up to allow connections from `http://localhost:5173` by default.

## Database Models

- **User** - User authentication and profile information
- **Group** - Chat group details and membership
- **Chat** - Message content and metadata
