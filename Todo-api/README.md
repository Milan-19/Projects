# Todo API

A RESTful API for managing todos with user authentication, authorization, and reminder capabilities.

## Features

- User registration and authentication with JWT tokens
- Create, read, update, and delete todos
- Set deadlines for todos
- Configure reminders for deadlines
- In-app popup notifications for reminders
- Authorization checks to ensure users can only access their own todos

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT for authentication

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   NODE_ENV=development
   ```
4. Start the server:
   ```
   npm run dev
   ```

## API Documentation

### Authentication

#### Register a User

- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "token": "JWT_TOKEN"
  }
  ```

#### Login

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "token": "JWT_TOKEN"
  }
  ```

#### Get Current User

- **URL**: `/api/auth/me`
- **Method**: `GET`
- **Headers**:
  ```
  Authorization: Bearer JWT_TOKEN
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "timestamp"
    }
  }
  ```

### Todos

#### Get All Todos

- **URL**: `/api/todos`
- **Method**: `GET`
- **Headers**:
  ```
  Authorization: Bearer JWT_TOKEN
  ```
- **Response**:
  ```json
  {
    "success": true,
    "count": 2,
    "data": [
      {
        "_id": "todo_id",
        "title": "Complete project",
        "description": "Finish todo API project",
        "status": "pending",
        "deadline": "2023-12-31T00:00:00.000Z",
        "reminder": {
          "enabled": true,
          "time": "2023-12-30T18:00:00.000Z",
          "sent": false
        },
        "user": "user_id",
        "createdAt": "timestamp"
      },
      {
        "_id": "todo_id_2",
        "title": "Buy groceries",
        "description": "Milk, eggs, bread",
        "status": "completed",
        "user": "user_id",
        "createdAt": "timestamp"
      }
    ]
  }
  ```

#### Get Single Todo

- **URL**: `/api/todos/:id`
- **Method**: `GET`
- **Headers**:
  ```
  Authorization: Bearer JWT_TOKEN
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "todo_id",
      "title": "Complete project",
      "description": "Finish todo API project",
      "status": "pending",
      "deadline": "2023-12-31T00:00:00.000Z",
      "reminder": {
        "enabled": true,
        "time": "2023-12-30T18:00:00.000Z",
        "sent": false
      },
      "user": "user_id",
      "createdAt": "timestamp"
    }
  }
  ```

#### Create Todo

- **URL**: `/api/todos`
- **Method**: `POST`
- **Headers**:
  ```
  Authorization: Bearer JWT_TOKEN
  ```
- **Body**:
  ```json
  {
    "title": "Complete project",
    "description": "Finish todo API project",
    "status": "pending",
    "deadline": "2023-12-31T00:00:00.000Z",
    "reminder": {
      "enabled": true,
      "time": "2023-12-30T18:00:00.000Z"
    }
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "todo_id",
      "title": "Complete project",
      "description": "Finish todo API project",
      "status": "pending",
      "deadline": "2023-12-31T00:00:00.000Z",
      "reminder": {
        "enabled": true,
        "time": "2023-12-30T18:00:00.000Z",
        "sent": false
      },
      "user": "user_id",
      "createdAt": "timestamp"
    }
  }
  ```

#### Update Todo

- **URL**: `/api/todos/:id`
- **Method**: `PUT`
- **Headers**:
  ```
  Authorization: Bearer JWT_TOKEN
  ```
- **Body**:
  ```json
  {
    "status": "in-progress",
    "reminder": {
      "enabled": true,
      "time": "2023-12-29T18:00:00.000Z"
    }
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "todo_id",
      "title": "Complete project",
      "description": "Finish todo API project",
      "status": "in-progress",
      "deadline": "2023-12-31T00:00:00.000Z",
      "reminder": {
        "enabled": true,
        "time": "2023-12-29T18:00:00.000Z",
        "sent": false
      },
      "user": "user_id",
      "createdAt": "timestamp"
    }
  }
  ```

#### Delete Todo

- **URL**: `/api/todos/:id`
- **Method**: `DELETE`
- **Headers**:
  ```
  Authorization: Bearer JWT_TOKEN
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {}
  }
  ```

#### Send Reminder

- **URL**: `/api/todos/:id/send-reminder`
- **Method**: `POST`
- **Headers**:
  ```
  Authorization: Bearer JWT_TOKEN
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Reminder notification created successfully"
  }
  ```

### Notifications

#### Get Notifications

- **URL**: `/api/notifications`
- **Method**: `GET`
- **Headers**:
  ```
  Authorization: Bearer JWT_TOKEN
  ```
- **Response**:
  ```json
  {
    "success": true,
    "count": 2,
    "data": [
      {
        "id": "1617293847123",
        "type": "todo-reminder",
        "title": "Reminder: Complete project",
        "message": "Don't forget to complete your todo: \"Complete project\"",
        "todoId": "todo_id",
        "deadline": "2023-12-31T00:00:00.000Z",
        "createdAt": "2023-12-29T10:30:00.000Z"
      },
      {
        "id": "1617293999456",
        "type": "todo-reminder",
        "title": "Reminder: Buy groceries",
        "message": "Don't forget to complete your todo: \"Buy groceries\"",
        "todoId": "todo_id_2",
        "createdAt": "2023-12-29T11:15:00.000Z"
      }
    ]
  }
  ```

#### Mark Notifications as Read

- **URL**: `/api/notifications/read`
- **Method**: `POST`
- **Headers**:
  ```
  Authorization: Bearer JWT_TOKEN
  ```
- **Body**:
  ```json
  {
    "notificationIds": ["1617293847123", "1617293999456"]
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Notifications marked as read"
  }
  ```

## License

ISC
