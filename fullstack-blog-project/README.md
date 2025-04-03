# Fullstack Blog Project

A full-stack blog application built with Node.js, Express, MongoDB, and EJS templates. This application includes user authentication, blog post creation, commenting, and file uploads.

## Features

- User authentication with Passport.js
- CRUD operations for blog posts
- Commenting system
- File uploads with Cloudinary integration
- Responsive UI with EJS templates
- MongoDB database storage

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js, bcryptjs
- **View Engine**: EJS
- **File Upload**: Multer, Cloudinary
- **Session Management**: express-session, connect-mongo

## Project Structure

- `app.js` - Main application file and server setup
- `models/` - Database models (User, Post, Comment, File)
- `controllers/` - Business logic handlers
- `routes/` - API route definitions
- `middlewares/` - Custom middleware functions
- `views/` - EJS templates
- `config/` - Configuration files

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=3000
   MONGODB_URL=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```
4. Start the server:
   ```
   npm start
   ```
5. Visit `http://localhost:3000` in your browser

## API Routes

- `/auth` - Authentication routes (login, register, logout)
- `/posts` - Blog post management
- `/user` - User profile management
- `/` - Comment routes

## Database Models

- **User** - User authentication and profile information
- **Post** - Blog post content and metadata
- **Comment** - User comments on posts
- **File** - Uploaded file information
