# 📊 Entity Relationship (ER) Diagram

## ER Diagram

![ER Diagram](docs/images/er-diagram.png)

---

# 📖 Overview

The **Entity Relationship (ER) Diagram** represents the core database design of the **Ucab Cab Booking Application**. It illustrates the relationships between the primary entities involved in the cab booking process, including **Users**, **Drivers**, **Vehicles**, **Rides**, and **Payments**.

The ER model ensures efficient data organization, minimizes redundancy, and maintains relationships between different entities.

---

# 🗂️ Entities

## 👤 User

Represents customers who use the application to book rides.

### Attributes

- User ID (Primary Key)
- Name
- Email
- Password
- Phone Number

### Responsibilities

- Register and log in
- Browse available cabs
- Book rides
- View booking history
- Make payments

---

## 🚖 Ride

Represents each cab booking created by a user.

### Attributes

- Ride ID (Primary Key)
- User ID (Foreign Key)
- Driver ID (Foreign Key)
- Pickup Location
- Drop Location
- Booking Date
- Fare
- Ride Status

### Responsibilities

- Store ride details
- Maintain booking history
- Track ride status
- Connect users with drivers

---

## 🚗 Driver

Represents drivers registered in the system.

### Attributes

- Driver ID (Primary Key)
- Driver Name
- Phone Number
- License Number

### Responsibilities

- Accept ride requests
- Drive assigned vehicles
- Complete rides

---

## 🚘 Vehicle

Represents vehicles assigned to drivers.

### Attributes

- Vehicle ID (Primary Key)
- Driver ID (Foreign Key)
- Vehicle Number
- Vehicle Type
- Price per Kilometer

### Responsibilities

- Store cab information
- Link vehicles to drivers
- Manage available fleet

---

## 💳 Payment

Represents payment information for completed rides.

### Attributes

- Payment ID (Primary Key)
- User ID (Foreign Key)
- Ride ID (Optional)
- Amount
- Payment Method
- Payment Status

### Responsibilities

- Store payment records
- Track completed transactions

---

# 🔗 Entity Relationships

## 1. User → Ride

### Relationship

**One-to-Many (1:N)**

### Description

One user can book multiple rides, but each ride belongs to only one user.

### Database Implementation

The **Ride** collection stores the **User ID** as a foreign key.

### Example

```text
User A
   ├── Ride 1
   ├── Ride 2
   └── Ride 3
```

---

## 2. Ride → Driver

### Relationship

**Many-to-One (N:1)**

### Description

Many rides can be assigned to one driver, while each ride is handled by only one driver.

### Database Implementation

The **Ride** collection stores the **Driver ID**.

### Example

```text
Driver A
   ├── Ride 101
   ├── Ride 102
   └── Ride 103
```

---

## 3. Driver → Vehicle

### Relationship

**One-to-One (1:1)**

*(Can be extended to One-to-Many if multiple drivers share vehicles in different shifts.)*

### Description

A driver is assigned one vehicle for completing rides.

### Database Implementation

The **Vehicle** collection stores the **Driver ID**.

### Example

```text
Driver A
      │
      ▼
Vehicle X
```

---

## 4. User → Payment

### Relationship

**One-to-Many (1:N)**

### Description

A user can make multiple payments for different rides.

### Database Implementation

The **Payment** collection stores the **User ID**.

### Example

```text
User A
   ├── Payment 1
   ├── Payment 2
   └── Payment 3
```

---

# 📌 Relationship Summary

| Relationship | Cardinality | Description |
|--------------|------------|-------------|
| User → Ride | One-to-Many | A user can book multiple rides. |
| Ride → Driver | Many-to-One | Many rides can be assigned to one driver. |
| Driver → Vehicle | One-to-One | A driver is assigned one vehicle. |
| User → Payment | One-to-Many | A user can make multiple payments. |

---

# ✅ Benefits of the ER Design

- Maintains data consistency
- Eliminates redundant data
- Simplifies database queries
- Improves scalability
- Supports efficient ride management
- Clearly defines relationships between entities
- Makes future feature integration easier

---

# 📌 Summary

The ER Diagram provides a structured representation of the **Ucab Cab Booking Application** database. It defines how **Users**, **Drivers**, **Vehicles**, **Rides**, and **Payments** interact with one another, ensuring a normalized, scalable, and maintainable database design.
