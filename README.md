Project:
Task Manager REST API

Features
- User registration
- User login
- JWT authentication
- Task CRUD
- Task ownership
- Search
- Filtering
- Sorting
- Pagination
- Request validation
- Centralized error handling


Technologies
Node.js
Express.js
MongoDB
Mongoose
JWT
bcrypt
Joi

API Endpoints

POST   /api/auth/users/register
POST   /api/auth/users/login

GET    /api/auth/tasks
POST   /api/auth/tasks
GET    /api/auth/tasks/:id
PATCH  /api/auth/tasks:id
DELETE /api/auth/tasks:id