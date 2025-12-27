# 🛒 E-Commerce Web Application (Django + Next.js)

A full-stack **E-Commerce Web Application** built using **Django REST Framework** for the backend and **Next.js (React)** for the frontend.  
The project includes **authentication, product management, cart functionality, and a modern Flipkart/Amazon-style UI**.

---

## 🚀 Features

### 🔐 Authentication
- Token-based authentication (DRF TokenAuth)
- User registration & login
- Auth token stored securely using cookies
- Custom user model support

### 🛍️ Products
- Product listing & product detail page
- Product attributes:
  - Name, description
  - Price & discount price
  - Stock & availability
  - Category & brand
  - Image
  - Rating & review count
  - Material, color, weight

### 🛒 Cart System
- One cart per user
- Add to cart
- Update item quantity
- Remove item from cart
- Cart total calculation
- Persistent cart per user
- Real-time cart sync with backend

### 🎨 Frontend UI
- Flipkart / Amazon-inspired UI
- Responsive layout
- Card-based design
- Sticky order summary
- Smooth animations (MUI + Fade)
- Clean and modern UX

---

## 🧱 Tech Stack

### Backend
- Django
- Django REST Framework
- Token Authentication
- SQLite / PostgreSQL (configurable)
- Custom User Model

### Frontend
- Next.js (App Router)
- React
- Material UI (MUI)
- Zustand (state management)
- Axios & Fetch API
- js-cookie

