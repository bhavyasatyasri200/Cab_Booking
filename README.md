# 🚖 Ucab — MERN Stack Cab Booking Application

A full-stack **MERN (MongoDB, Express.js, React.js, Node.js)** cab booking application featuring separate **User** and **Admin** dashboards, JWT authentication, cab management, booking approval workflows, and user management.

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
git clone https://github.com/bhavyasatyasri200/Cab_Booking.git
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

Configure your `.env` file inside the `Server/` directory:

```env
MONGO_URI=your_mongodb_atlas_or_local_connection_string
JWT_SECRET=your_jwt_secret
PORT=8000
```

---

# ▶️ Running the Project

## Start Backend

Open a terminal inside the **Server** folder:

```bash
npm start
```

Expected Output:

```text
Server running on http://localhost:8000
MongoDB Connected
```

---

## Start Frontend

Open another terminal inside the **Client** folder:

```bash
npm run dev
```

Visit: `http://localhost:5173`

---

# 👤 Application Workflow

## Admin Flow

1. Register or Login as Admin (`/admin/login`).
2. Add, edit, or delete cab options (`/admin/cabs`).
3. View user registrations & manage accounts (`/admin/users`).
4. **Approve** or **Reject** incoming ride booking requests in real-time (`/admin/bookings`).

---

## User Flow

1. Register or Login as User (`/login`).
2. Browse available cabs by category (`/cabs`).
3. Book a ride by filling pickup/drop dates & locations.
4. Track booking status (`Pending Approval`, `Confirmed`, `Rejected`) under **My Bookings** (`/mybookings`).

---

# ✨ Core Features

## Authentication & Security
- JWT Authentication with protected routes
- Password Encryption using `bcryptjs`
- Role-based Access Control (User / Admin)

## User Features
- Browse available cabs filtered by vehicle type (Mini, Sedan, SUV)
- Instant ride booking
- View booking status (`Pending Approval`, `Confirmed`, `Rejected`)

## Admin Features
- Admin Dashboard with system stats
- **Ride Approval Workflow**: Approve or Reject pending user ride requests
- **Deleted User Handling**: Preserves historical ride data even if a user account is deleted
- Full CRUD management for Cabs and Users
- Car Image Uploads via Multer

---

# 📡 REST API Endpoints

### User & Admin Auth
- `POST /api/users/register` - User Registration
- `POST /api/users/login` - User Login
- `POST /api/admin/register` - Admin Registration
- `POST /api/admin/login` - Admin Login

### Cab Management
- `GET /api/cars` - Fetch all cabs
- `POST /api/cars` - Add new cab (Multipart Image upload)
- `PUT /api/cars/:id` - Update cab details
- `DELETE /api/cars/:id` - Delete a cab

### Booking Management
- `POST /api/bookings` - Create a booking (Defaults status to `Pending`)
- `GET /api/bookings/user` - Fetch logged-in user's bookings
- `GET /api/bookings/all` - Fetch all bookings (Admin)
- `PUT /api/bookings/:id/status` - Update booking status (`Confirmed` / `Rejected`) (Admin)

---

# 🛠️ Tech Stack

- **Frontend**: React.js, React Router DOM, Axios, Vanilla CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT), bcryptjs
- **File Storage**: Multer

---

# 📄 License

This project is open-source and developed for educational purposes.
