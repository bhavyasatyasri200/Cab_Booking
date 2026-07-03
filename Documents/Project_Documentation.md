# Full Stack Development with MERN — Project Documentation

---

## 1. Introduction

### Project Title
**Ucab — MERN Stack Cab Booking Application**

### Team Members

| Name | Role |
|------|------|
| Rajkumari Valentina | Team Lead |
| Naga Ram Sai Manikanta Thota | Member |
| Bhavya Satya Sri Karri | Member |
| Believe Mangwayana | Member |
| Praveen Mandala | Member |

---

## 2. Project Overview

### Purpose
Ucab is a full-stack cab booking web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The goal of the project is to provide a seamless platform where users can register, browse available cabs, book rides, track their ride in real time, and manage their bookings — all through an intuitive and responsive web interface. On the administrative side, admins can manage users, cabs, and bookings through a dedicated dashboard.

### Features

#### User Features
- User Registration & Login
- Browse & Filter Available Cabs (Mini, Sedan, SUV)
- Book a Cab with Pickup & Drop Details
- View Booking History
- Simulated Live Ride Tracking with ETA Updates
- Ride Cancellation
- Promo Code Discounts
- Go-Green Donation Support
- In-Cab Refreshments Store

#### Admin Features
- Admin Registration & Login
- Dashboard Statistics
- Manage Users (View & Edit)
- Manage Cabs (Add, Edit, Delete)
- Upload Car Images
- Manage All Bookings
- Full CRUD Operations

---

## 3. Architecture

### Frontend
The frontend is built using **React.js** with **React Router DOM** for client-side routing. It follows a component-based architecture, separating reusable UI components (navigation bars) from dedicated page components for each feature. **Axios** is used for HTTP communication with the backend REST API. JWT tokens received on login are stored in `localStorage` and attached to protected API requests.

- **Build Tool:** Vite
- **Styling:** Plain CSS
- **HTTP Client:** Axios
- **Routing:** React Router DOM

### Backend
The backend is built using **Node.js** and **Express.js** following the **MVC (Model-View-Controller)** pattern. It exposes a RESTful API consumed by the React frontend. The application is structured into:

- **Routes** — Define API endpoints and delegate to controllers
- **Controllers** — Handle request/response logic
- **Models** — Define Mongoose schemas
- **Middlewares** — Handle JWT authentication and file uploads (Multer)

The server runs on **Port 8000**.

### Database
**MongoDB** is used as the database, accessed through the **Mongoose ODM**. The application uses four main collections:

| Collection | Description |
|------------|-------------|
| `users` | Stores registered user data (name, email, hashed password) |
| `admins` | Stores admin credentials |
| `cars` | Stores cab details (driver name, car name, type, price, car number, image) |
| `bookings` | Stores booking records linked to users and cabs |

---

## 4. Setup Instructions

### Prerequisites
Ensure the following are installed on your system:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (Local) **or** a [MongoDB Atlas](https://www.mongodb.com/atlas) account
- Git

### Installation

#### Step 1 — Clone the Repository
```bash
git clone <repository-url>
cd Cab_Booking
```

#### Step 2 — Install Backend Dependencies
```bash
cd Server
npm install
```

#### Step 3 — Install Frontend Dependencies
```bash
cd ../Client
npm install
```

#### Step 4 — Configure Environment Variables
Create a `.env` file inside the `Server/` directory:

```env
MONGO_URI=mongodb://localhost:27017/ucab   # or your MongoDB Atlas URI
JWT_SECRET=your_jwt_secret_key
PORT=8000
```

> **Note:** Never commit your `.env` file to version control. It is excluded via `.gitignore`.

---

## 5. Folder Structure

### Client (React Frontend)
```
Client/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── App.jsx              # Root component with all routes
    ├── index.css            # Global styles
    ├── components/
    │   ├── Unav.jsx         # User navigation bar
    │   └── Anav.jsx         # Admin navigation bar
    └── pages/
        ├── Home.jsx         # Landing page
        ├── Login.jsx        # User login
        ├── Register.jsx     # User registration
        ├── Uhome.jsx        # User dashboard
        ├── Cabs.jsx         # Browse available cabs
        ├── BookCab.jsx      # Booking form
        ├── MyBookings.jsx   # User booking history
        ├── TrackRide.jsx    # Live ride tracking
        ├── Offers.jsx       # Promotions & offers
        ├── Alogin.jsx       # Admin login
        ├── Aregister.jsx    # Admin registration
        ├── Ahome.jsx        # Admin dashboard
        ├── Users.jsx        # Manage users
        ├── UserEdit.jsx     # Edit user
        ├── Bookings.jsx     # Admin bookings view
        ├── Acabs.jsx        # Admin cab listing
        ├── Acabedit.jsx     # Edit cab
        └── Addcar.jsx       # Add new cab
```

### Server (Node.js Backend)
```
Server/
├── server.js                # Express entry point (Port 8000)
├── .env                     # Environment variables
├── package.json
├── db/
│   └── config.js            # MongoDB connection
├── models/
│   ├── UserSchema.js
│   ├── AdminSchema.js
│   ├── CarSchema.js
│   └── MyBookingSchema.js
├── controllers/
│   ├── userController.js
│   ├── adminController.js
│   ├── carController.js
│   └── bookingController.js
├── middlewares/
│   ├── authMiddleware.js    # JWT verification
│   └── multer.js            # Image upload middleware
├── routes/
│   ├── userRoutes.js
│   ├── adminRoutes.js
│   ├── carRoutes.js
│   └── bookingRoutes.js
└── uploads/                 # Uploaded car images
```

---

## 6. Running the Application

### Start the Backend Server
Open a terminal inside the `Server/` directory:
```bash
npm run dev
```
Expected output:
```
Server running on http://localhost:8000
MongoDB Connected
```

### Start the Frontend Server
Open a separate terminal inside the `Client/` directory:
```bash
npm run dev
```
Visit the application at:
```
http://localhost:5173
```

---

## 7. API Documentation

### Base URL
```
http://localhost:8000/api
```

### User Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/users/register` | Register a new user | No |
| POST | `/users/login` | Login and receive JWT | No |
| GET | `/users/profile` | Get logged-in user profile | Yes |

**Register — Request Body:**
```json
{
  "name": "Sarah Johnson",
  "email": "sarah@example.com",
  "password": "securepassword123"
}
```

**Login — Request Body:**
```json
{
  "email": "sarah@example.com",
  "password": "securepassword123"
}
```

**Login — Response:**
```json
{
  "token": "<jwt_token>",
  "user": { "id": "...", "name": "Sarah Johnson", "email": "sarah@example.com" }
}
```

---

### Admin Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/admin/register` | Register a new admin | No |
| POST | `/admin/login` | Admin login and receive JWT | No |

---

### Cab Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/cars` | Get all available cabs | No |
| GET | `/cars/:id` | Get a specific cab by ID | No |
| POST | `/cars` | Add a new cab (with image) | Admin |
| PUT | `/cars/:id` | Update cab details | Admin |
| DELETE | `/cars/:id` | Delete a cab | Admin |

**Add Cab — Form Data (multipart/form-data):**

| Field | Type | Description |
|-------|------|-------------|
| `drivername` | Text | Name of the driver |
| `carname` | Text | Name of the car |
| `cartype` | Text | `Mini`, `Sedan`, or `SUV` |
| `price` | Number | Price per km |
| `carno` | Text | Car registration number |
| `carImage` | File | Car image (optional) |

---

### Booking Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/bookings` | Create a new booking | User |
| GET | `/bookings/user` | Get current user's bookings | User |
| GET | `/bookings/all` | Get all bookings (admin view) | Admin |

**Book a Cab — Request Body:**
```json
{
  "selectedPickupCity": "Mumbai",
  "selectedPickupState": "Maharashtra",
  "selectedDropCity": "Pune",
  "pickupdate": "2026-07-05",
  "pickuptime": "08:30",
  "dropdate": "2026-07-05",
  "droptime": "11:30",
  "fare": "12",
  "cartype": "Sedan",
  "carname": "Honda City",
  "carno": "MH12AB1234"
}
```

---

## 8. Authentication

The application uses **JSON Web Tokens (JWT)** for stateless authentication.

### Flow
1. User submits credentials (email & password) via `/api/users/login` or `/api/admin/login`.
2. The server verifies credentials and compares the password against the **bcryptjs**-hashed value stored in MongoDB.
3. On success, a **JWT token** is generated (signed with `JWT_SECRET`) and returned to the client.
4. The client stores the token in `localStorage`.
5. For all protected routes, the token is sent in the HTTP `Authorization` header:
   ```
   Authorization: Bearer <token>
   ```
6. The `authMiddleware.js` verifies the token on every protected request before allowing access.

### Role-Based Access Control
- **Users** can only access user-related endpoints (`/api/bookings/user`, etc.).
- **Admins** have access to management endpoints (`/api/bookings/all`, user management, cab CRUD).

### Security Measures
- Passwords are hashed using **bcryptjs** before storage — plain-text passwords are never saved.
- JWT tokens expire after a defined duration.
- The `.env` file (containing `JWT_SECRET` and `MONGO_URI`) is excluded from version control via `.gitignore`.

---

## 9. User Interface

The application features two separate dashboards:

- **User Dashboard** — Home, Browse Cabs, Book a Cab, My Bookings, Track Ride, Offers
- **Admin Dashboard** — Statistics Overview, Manage Users, Manage Cabs, Manage Bookings

Key UI pages include:
- Landing / Home Page
- User & Admin Login / Registration
- Cab Listing with type filters
- Booking Form with pickup/drop selection
- My Bookings with ride status and cancellation
- Simulated Ride Tracking page with ETA
- Promotional Offers page
- Admin Cab Management with image upload

> Screenshots can be added here as the project progresses.

---

## 10. Testing

### Strategy
The project uses **manual testing** throughout development to validate all features end-to-end.

### Tools & Approach

| Area | Tool / Method |
|------|--------------|
| API Testing | [Postman](https://www.postman.com/) — test all REST endpoints |
| Frontend Testing | Manual browser testing across flows |
| Auth Testing | Token validation for protected routes |
| Database | MongoDB Compass to verify stored data |

### Test Cases Covered
- User registration and login
- Admin registration and login
- Cab CRUD operations (Add, Edit, Delete)
- Booking creation and retrieval
- JWT token expiry & protected route rejection
- Image upload via Multer

---

## 11. Screenshots or Demo

> Added Screenshots in Screenshots folder.



---

## 12. Known Issues

| Issue | Description |
|-------|-------------|
| Ride Tracking | Ride tracking is simulated — no real-time GPS integration |
| Image Storage | Car images are stored locally in `Server/uploads/`; not suitable for cloud deployment without additional configuration |
| Token Expiry | No automatic token refresh mechanism; users must re-login on expiry |
| Input Validation | Client-side validation is minimal; additional server-side validation can be strengthened |

---

## 13. Future Enhancements

| Enhancement | Description |
|-------------|-------------|
| Real-Time Tracking | Integrate Google Maps API or socket.io for live GPS-based ride tracking |
| Payment Gateway | Add Stripe or Razorpay for in-app payment processing |
| Cloud Image Storage | Migrate file uploads to Cloudinary or AWS S3 |
| Push Notifications | Notify users of booking confirmations, ride status, and offers |
| Ratings & Reviews | Allow users to rate drivers and leave feedback after rides |
| Mobile App | Develop a React Native version for iOS and Android |
| Email Notifications | Send booking confirmation and OTP emails via Nodemailer |
| Advanced Filtering | Filter cabs by distance, price range, and driver rating |
| Driver Module | Separate driver dashboard for managing assigned rides |

---

*Developed for educational and learning purposes — Ucab MERN Stack Cab Booking Application.*
