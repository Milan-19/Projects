# Basic Chat App

A simple real-time chat application built with Node.js, Express, and Socket.IO.

## Features

- Real-time messaging with Socket.IO
- Simple and responsive user interface
- Message broadcasting to all connected clients
- Server acknowledgment of client connections

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   node server.js
   ```
4. Open your browser and navigate to `http://localhost:3000`

## Technologies Used

- **Backend**: Node.js, Express
- **Real-time Communication**: Socket.IO
- **Frontend**: HTML, CSS, JavaScript

## Project Structure

- `server.js` - Express server and Socket.IO setup
- `public/` - Static files
  - `index.html` - Main chat interface
  - `js/chat.js` - Client-side Socket.IO logic
  - `css/styles.css` - Styling for the chat interface

## How It Works

1. Server listens for client connections via Socket.IO
2. When a client connects, the server acknowledges the connection
3. Clients can send messages which are broadcast to all other connected clients
4. Messages are displayed differently based on whether they're from the server or client
