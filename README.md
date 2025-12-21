# Finance Tracker (MERN Stack)

A full-stack **Finance Tracker application** built with the **MERN stack** that allows users to manage income and expenses with secure authentication and OTP-based password recovery using **Resend**.

---

## Features
- User Signup & Signin (JWT Authentication)
- Secure password hashing (bcrypt)
- Protected routes
- Add, view & delete income/expense transactions
- User-specific data isolation
- Profile management
- Logout

### Forgot Password (OTP)
- OTP sent via **Resend Email Service**
- OTP expiration handling
- Secure password reset
- OTP is sent **only to registered users** (security best practice)

> **Note:**  
> A generic success message is shown for all forgot-password requests to prevent **email enumeration attacks**.

---

## Tech Stack
**Frontend:** React, Vite, Tailwind CSS, Axios  
**Backend:** Node.js, Express, MongoDB, Mongoose  
**Auth & Security:** JWT, bcryptjs  
**Email:** Resend  
**Deployment:** Render (Backend), Vercel (Frontend)

---

## Email Service
This project uses **Resend** for reliable OTP email delivery in production environments.  
SMTP is intentionally avoided for better cloud compatibility.

---


## Setup 

# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev

----

## Security Highlights

-Hashed passwords
-JWT-based authentication
-OTP expiration
-Protected routes
-Email enumeration protection
-Environment-based secrets

---

##  Testing Note

Forgot Password works only for registered emails.
To test, signup first or use a demo account.


## Environment Variables (Backend)
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=onboarding@resend.dev
FRONTEND_URL=http://localhost:5173
OTP_EXP_MIN=10

---

## Author
Mohd Samir Shaikh





