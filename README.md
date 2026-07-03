# 🚖 Ucab — MERN Stack Cab Booking Application

A full-stack **MERN (MongoDB, Express.js, React.js, Node.js)** cab booking application featuring separate **User** and **Admin** dashboards, JWT authentication, cab management, booking management, simulated live ride tracking, promotional offers, donation support, and an in-cab refreshments store.

---

# 📁 Project Structure

```text
Cab_Booking/
│
├── Server/
│   ├── server.js                  # Express entry point (Port 8000)
│   ├── .env                       # Environment variables
│   │
│   ├── db/
│   │   └── config.js              # MongoDB connection
│   │
│   ├── models/
│   │   ├── UserSchema.js
│   │   ├── AdminSchema.js
│   │   ├── CarSchema.js
│   │   └── MyBookingSchema.js
│   │
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── adminController.js
│   │   ├── carController.js
│   │   └── bookingController.js
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js      # JWT Authentication
│   │   └── multer.js              # Image Upload Middleware
│   │
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── carRoutes.js
│   │   └── bookingRoutes.js
│   │
│   └── uploads/                   # Uploaded Car Images
│
└── Client/
    └── src/
        ├── App.jsx
        ├── index.css
        │
        ├── components/
        │   ├── Unav.jsx
        │   └── Anav.jsx
        │
        └── pages/
            ├── Home.jsx
            ├── Login.jsx
            ├── Register.jsx
            ├── Uhome.jsx
            ├── Cabs.jsx
            ├── BookCab.jsx
            ├── MyBookings.jsx
            ├── TrackRide.jsx
            ├── Offers.jsx
            ├── Alogin.jsx
            ├── Aregister.jsx
            ├── Ahome.jsx
            ├── Users.jsx
            ├── UserEdit.jsx
            ├── Bookings.jsx
            ├── Acabs.jsx
            ├── Acabedit.jsx
            └── Addcar.jsx
```

---

# 🚀 Getting Started

## 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd Cab_Booking
```

---

## 2️⃣ Install Dependencies

### Backend

```bash
cd Server
npm install
```

### Frontend

```bash
cd ../Client
npm install
```

---

# 🗄️ MongoDB Setup

## Option A – Local MongoDB

1. Install MongoDB Community Server.
2. Start the MongoDB service.
3. Configure your `.env` file:

```env
MONGO_URI=mongodb://localhost:27017/ucab
JWT_SECRET=your_jwt_secret
PORT=8000
```

---

## Option B – MongoDB Atlas

1. Create a MongoDB Atlas Cluster.
2. Create a Database User.
3. Allow Network Access (`0.0.0.0/0`).
4. Copy the connection string.
5. Update `.env`:

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
PORT=8000
```

---

# ▶️ Running the Project

## Start Backend

Open a terminal inside the **Server** folder.

```bash
npm run dev
```

Expected Output:

```text
Server running on http://localhost:8000
MongoDB Connected
```

---

## Start Frontend

Open another terminal inside the **Client** folder.

```bash
npm run dev
```

Visit:

```
http://localhost:5173
```

---

# 👤 First Time Usage

## Admin Flow

1. Open:

```
http://localhost:5173/admin/register
```

2. Create an Admin account.

3. Login using:

```
http://localhost:5173/admin/login
```

4. Navigate to:

```
Dashboard → Cabs → Add Cab
```

5. Add multiple vehicles (Mini, Sedan, SUV).

---

## User Flow

1. Open:

```
http://localhost:5173/register
```

2. Create a User account.

3. Login.

4. Browse available cabs.

5. Click **Book Now**.

6. Fill booking details.

7. Confirm booking.

8. Track your ride.

9. Apply offers and order refreshments.

---

# ✨ Features

## Authentication

- JWT Authentication
- Separate User and Admin Login
- Protected Routes
- Password Encryption using bcryptjs

---

## User Features

- User Registration & Login
- Browse Available Cabs
- Filter by Vehicle Type
- Book a Cab
- View Booking History
- Simulated Live Ride Tracking
- Ride Cancellation
- ETA Updates
- Promo Code Discounts
- Go-Green Donations
- In-Cab Refreshments Store

---

## Admin Features

- Admin Registration & Login
- Dashboard Statistics
- Manage Users
- Manage Cabs
- Upload Car Images
- Manage Bookings
- Full CRUD Operations

---

# 🛠️ Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- CSS

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Authentication

- JWT
- bcryptjs

## File Upload

- Multer

---

# 📡 REST API

## User Authentication

### Register User

**POST**

```
/api/users/register
```

Request

```json
{
  "name": "Sarah Johnson",
  "email": "sarah@example.com",
  "password": "securepassword123"
}
```

---

### Login User

**POST**

```
/api/users/login
```

Request

```json
{
  "email": "sarah@example.com",
  "password": "securepassword123"
}
```

---

### Get User Profile

**GET**

```
/api/users/profile
```

Headers

```text
Authorization: Bearer <token>
```

---

## Admin Authentication

### Register Admin

**POST**

```
/api/admin/register
```

---

### Login Admin

**POST**

```
/api/admin/login
```

---

# 🚖 Cab Management (Admin)

## Get All Cabs

**GET**

```
/api/cars
```

---

## Get Cab by ID

**GET**

```
/api/cars/:id
```

---

## Add Cab

**POST**

```
/api/cars
```

Headers

```text
Content-Type: multipart/form-data
```

Form Data

| Field | Type |
|---------|------|
| drivername | Text |
| carname | Text |
| cartype | Mini / Sedan / SUV |
| price | Number |
| carno | Text |
| carImage | File (Optional) |

---

## Update Cab

**PUT**

```
/api/cars/:id
```

---

## Delete Cab

**DELETE**

```
/api/cars/:id
```

---

# 📅 Booking APIs

## Book a Cab

**POST**

```
/api/bookings
```

Headers

```text
Authorization: Bearer <token>
```

Request

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

## User Booking History

**GET**

```
/api/bookings/user
```

Headers

```text
Authorization: Bearer <token>
```

---

## Admin Booking List

**GET**

```
/api/bookings/all
```

Admin Authorization Required.

---

# 🔒 Security

- JWT Token Authentication
- Password Hashing using bcryptjs
- Protected API Routes
- Role-Based Access Control
- Secure Image Upload Handling

---

# 📸 Screens

- Home
- User Dashboard
- Cab Listing
- Booking Page
- My Bookings
- Ride Tracking
- Offers
- Admin Dashboard
- Manage Users
- Manage Cabs
- Booking Management
All the images are added in Screenshots folder
---

# 👨‍💻 Developed Using

- React.js
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- Axios

---

# 📄 License

This project is developed for educational and learning purposes.