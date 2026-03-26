# 🛒 ShopSphere – Full Stack E-commerce Web Application

ShopSphere is a full-stack e-commerce web application built using the MERN stack.
It allows users to browse products, add items to cart, place orders, and simulate payments with secure authentication.

---

## 🚀 Features

### 👤 User Features

* User Registration & Login (JWT Authentication)
* Browse Products with Pagination
* Search Products
* View Product Details
* Add to Cart
* Update Cart Quantity
* Place Orders
* Payment Simulation
* View Personal Orders

### 🔐 Admin Features

* Admin Role Support
* Update Order Status (Pending → Shipped → Delivered)

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Bootstrap
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* REST APIs

---

## 🧠 Key Concepts Implemented

* Full Stack Architecture (Frontend + Backend)
* RESTful API Design
* JWT Authentication & Authorization
* Protected Routes
* Global State Management (Context API)
* Cart System using localStorage
* Pagination & Search
* Race Condition Handling (Atomic Stock Updates)

---

## 📂 Project Structure

```
ShopSphere/
│
├── backend/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── services/
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/YOUR_USERNAME/shopsphere.git
cd shopsphere
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
```

Create a `.env` file:

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
```

Run backend:

```
node server.js
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm start
```

---

## 🌐 API Endpoints

### Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

### Products

* GET `/api/products`
* GET `/api/products?page=1&limit=5&search=keyword`

### Orders

* POST `/api/orders`
* GET `/api/orders/my`

### Admin

* PUT `/api/orders/:id/status`

### Payment

* PUT `/api/orders/:id/pay`

---

## 👨‍💻 Author

**Sumit**
Aspiring Full Stack Developer
