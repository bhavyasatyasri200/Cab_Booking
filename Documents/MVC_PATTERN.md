# 🏛️ Model-View-Controller (MVC) Pattern

## MVC Architecture Diagram

![MVC Architecture](docs/images/mvc.png)

---

# 📖 Overview

The **Ucab Cab Booking Application** follows the **Model-View-Controller (MVC)** architectural pattern. MVC is a widely used software design pattern that separates an application into three interconnected components:

1. **Model**
2. **View**
3. **Controller**

This separation of responsibilities improves code organization, maintainability, scalability, and makes the application easier to develop and test.

---

# 🏗️ MVC Architecture

```text
        Database
            ▲
            │
      Database Operations
            │
        ┌─────────┐
        │  Model  │
        └─────────┘
             ▲
             │
             ▼
        ┌────────────┐
        │ Controller │
        └────────────┘
         ▲          ▲
         │          │
   Request        Response
         │          │
         ▼          ▼
        ┌─────────┐
        │  User   │
        └─────────┘
             ▲
             │
             ▼
        ┌─────────┐
        │  View   │
        └─────────┘
```

---

# 🗄️ Model Layer

The **Model Layer** is responsible for managing the application's data and interacting with the MongoDB database.

In this project, the Model layer is implemented using **Mongoose ODM**, which provides schema-based data modeling for MongoDB.

## Responsibilities

- Define database schemas
- Perform CRUD operations
- Validate data
- Interact with MongoDB
- Store application data

## Models Used

- UserSchema
- AdminSchema
- CarSchema
- MyBookingSchema

---

# 🎮 Controller Layer

The **Controller Layer** acts as the bridge between the routes (View) and the database (Model).

It receives client requests, processes the business logic, interacts with the models, and returns appropriate responses.

## Responsibilities

- Handle HTTP requests
- Validate request data
- Authenticate users
- Execute business logic
- Call Model functions
- Send JSON responses

## Controllers Used

- userController.js
- adminController.js
- carController.js
- bookingController.js

---

# 🖥️ View Layer (Routing Layer)

In a REST API application, the **View Layer** is represented by the routing system.

Routes define the application's API endpoints and determine which controller should process each incoming request.

## Responsibilities

- Define API endpoints
- Receive HTTP requests
- Invoke controller methods
- Return API responses

## Route Files

- userRoutes.js
- adminRoutes.js
- carRoutes.js
- bookingRoutes.js

---

# 🔄 MVC Request Flow

## User Login

```text
User
   │
   ▼
Login API Request
   │
   ▼
Route
   │
   ▼
User Controller
   │
   ▼
User Model
   │
   ▼
MongoDB
   │
   ▼
Controller
   │
   ▼
JSON Response
   │
   ▼
User
```

---

## Booking a Cab

```text
User
   │
   ▼
POST /api/bookings
   │
   ▼
bookingRoutes.js
   │
   ▼
bookingController.js
   │
   ▼
MyBookingSchema.js
   │
   ▼
MongoDB
   │
   ▼
Booking Saved
   │
   ▼
Response Sent
```

---

# 📂 MVC Folder Structure

```text
Server/
│
├── models/
│   ├── UserSchema.js
│   ├── AdminSchema.js
│   ├── CarSchema.js
│   └── MyBookingSchema.js
│
├── controllers/
│   ├── userController.js
│   ├── adminController.js
│   ├── carController.js
│   └── bookingController.js
│
├── routes/
│   ├── userRoutes.js
│   ├── adminRoutes.js
│   ├── carRoutes.js
│   └── bookingRoutes.js
│
├── middlewares/
│
└── server.js
```

---

# 💻 Technologies Used

| MVC Component | Technology |
|--------------|------------|
| Model | MongoDB, Mongoose |
| View | Express Routes (REST APIs) |
| Controller | Express.js Controllers |
| Database | MongoDB |
| Backend Runtime | Node.js |

---

# ✨ Advantages of MVC

## Separation of Concerns

Each layer has a clearly defined responsibility, making the codebase easier to understand and maintain.

---

## Better Maintainability

Changes in one layer have minimal impact on the others, reducing development complexity.

---

## Scalability

New features can be implemented by simply adding new models, controllers, and routes.

---

## Code Reusability

Business logic and database operations can be reused across multiple API endpoints.

---

## Easier Testing

Each layer can be tested independently, improving application reliability.

---

## Team Collaboration

Frontend and backend developers can work independently on different layers of the application.

---

# 📌 Summary

The **Ucab Cab Booking Application** follows the **Model-View-Controller (MVC)** architecture to achieve a clean and modular backend design.

- **Model** manages the application's data and database operations using **Mongoose**.
- **View** is represented by the **Express routing layer**, exposing RESTful API endpoints.
- **Controller** processes incoming requests, executes business logic, communicates with the models, and returns appropriate responses.

This architecture improves maintainability, scalability, code reusability, and simplifies future development by keeping responsibilities clearly separated.
