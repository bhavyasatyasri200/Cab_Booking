# 🏗️ Technical Architecture

## System Architecture

![Ucab Technical Architecture](docs/images/technical_architecture.png)

---

# 📖 Overview

The **Ucab Cab Booking Application** follows a **Layered Architecture**, separating the frontend, backend, business logic, and database operations into independent layers. This architecture improves **maintainability**, **scalability**, **security**, and **code organization**.

The application consists of the following layers:

1. **Client Layer (React.js)**
2. **API Layer (Express.js)**
3. **Service Layer**
4. **Data Access Layer (Mongoose ODM)**
5. **MongoDB Database**

---

# 🖥️ 1. Client Layer (React.js)

The **Client Layer** is the frontend of the application that users interact with. It is built using **React.js** and provides responsive interfaces for both **Users** and **Admins**.

## Components

- Home Page
- User Login & Registration
- Admin Login & Registration
- User Dashboard
- Admin Dashboard
- Cab Selection
- Booking Form
- My Bookings
- Ride Tracking
- Offers & Promotions
- Cab Management
- User Management

## Responsibilities

- Display user interface
- Handle user interactions
- Perform client-side validation
- Send API requests
- Store JWT tokens
- Navigate between pages

---

# ⚙️ 2. API Layer (Express.js)

The **API Layer** acts as the bridge between the frontend and backend business logic.

Built using **Express.js**, it exposes RESTful APIs that process client requests and return appropriate responses.

## Responsibilities

- Routing
- Authentication
- Authorization
- Request validation
- Error handling
- Response formatting

## Sample REST APIs

### User Authentication

```http
POST /api/users/register
POST /api/users/login
GET  /api/users/profile
```

### Admin Authentication

```http
POST /api/admin/register
POST /api/admin/login
```

### Cab APIs

```http
GET    /api/cars
GET    /api/cars/:id
POST   /api/cars
PUT    /api/cars/:id
DELETE /api/cars/:id
```

### Booking APIs

```http
POST /api/bookings
GET  /api/bookings/user
GET  /api/bookings/all
```

---

# 🧠 3. Service Layer

The **Service Layer** contains the application's business logic. It receives requests from the API layer, applies business rules, and coordinates with the database layer.

## Responsibilities

- User authentication
- Password encryption
- JWT generation
- Ride booking
- Fare calculation
- Ride validation
- Booking management
- Ride tracking simulation
- Promotional offers
- Donation handling
- Refreshment ordering

This layer ensures that all business rules are executed before any data is stored or retrieved.

---

# 🗄️ 4. Data Access Layer (Mongoose ODM)

The **Data Access Layer** communicates with MongoDB using **Mongoose ODM**.

It acts as an abstraction layer between the application and the database.

## Responsibilities

- CRUD operations
- Schema definitions
- Data validation
- Query execution
- Database relationships

## Database Models

- User
- Admin
- Car
- Booking

---

# 🗃️ 5. MongoDB Database

MongoDB stores all application data in separate collections.

## Collections

- Users
- Admins
- Cars
- Bookings

### Stored Data

- User information
- Admin information
- Cab details
- Booking history
- Ride information

---

# 🔄 System Workflow

## Booking a Ride

```text
User
   │
   ▼
React Frontend
   │
   ▼
Express REST API
   │
   ▼
Service Layer
   │
   ▼
Mongoose ODM
   │
   ▼
MongoDB Database
   │
   ▼
Response Returned
   │
   ▼
React UI Updates
```

---

# 🚖 Booking Flow

### Step 1

The user logs into the application.

↓

### Step 2

The user browses available cabs.

↓

### Step 3

The user selects a cab and enters booking details.

↓

### Step 4

React sends a booking request.

```http
POST /api/bookings
```

↓

### Step 5

Express validates the request and authenticates the user.

↓

### Step 6

The Service Layer processes the booking.

- Validates booking information
- Calculates fare
- Creates booking record

↓

### Step 7

Mongoose stores the booking in MongoDB.

↓

### Step 8

The API returns a successful response.

↓

### Step 9

The frontend displays booking confirmation.

↓

### Step 10

The user can monitor ride progress using the Ride Tracking page.

---

# 🔐 Authentication Flow

```text
User Login
      │
      ▼
Express API
      │
      ▼
Validate Credentials
      │
      ▼
bcrypt Password Verification
      │
      ▼
Generate JWT Token
      │
      ▼
Return Token
      │
      ▼
Protected API Access
```

---

# 💻 Technology Stack

| Layer | Technology |
|--------|------------|
| Frontend | React.js |
| Backend | Node.js |
| Framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT |
| Password Hashing | bcryptjs |
| File Upload | Multer |
| HTTP Client | Axios |

---

# ✨ Key Architectural Features

- Layered Architecture
- Modular Project Structure
- RESTful API Design
- JWT Authentication
- Role-Based Authorization
- Secure Password Hashing
- MongoDB Document Database
- Mongoose ODM
- Image Upload Support
- Ride Tracking Simulation
- Booking Management
- User & Admin Separation
- CRUD Operations
- Responsive React Interface

---

# ✅ Advantages of the Architecture

- Clean separation of concerns
- Easy to understand and maintain
- Highly scalable
- Secure authentication and authorization
- Efficient database interaction
- Reusable modules and components
- Easy integration of new features
- Better code organization
- Simplified debugging and testing

---

# 📌 Summary

The Ucab application adopts a **Layered MERN Architecture** where:

- **React.js** provides a dynamic and responsive user interface.
- **Express.js** exposes secure RESTful APIs.
- The **Service Layer** handles all business logic.
- **Mongoose ODM** simplifies MongoDB interactions.
- **MongoDB** securely stores application data.

This architecture ensures the application remains modular, scalable, secure, and easy to extend as new features are introduced.