# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Finance Tracker (MERN Stack)

A full-stack Finance Tracker web application built using the **MERN stack**.  
Users can securely manage income and expenses with authentication and OTP verification.

---

## 🚀 Features

- User Signup & Signin
- OTP verification (Signup / Forgot Password)
- JWT-based authentication
- Add, view & delete transactions
- Profile page with user details
- Protected routes
- Responsive UI

---

## 🛠 Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- Axios
- React Router

**Backend**
- Node.js
- Express.js
- MongoDB
- JWT & Bcrypt
- Nodemailer

---

## ▶️ Run Project
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev

# Environment Variable (Backend)
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
EMAIL_USER=your_email
EMAIL_PASS=your_app_password

## Flow
1.Sign -> OTP verification
2.Signin
3.Add/View/Delete transactions
4.Forgot Password -> OTP -> Reset

# Author
Mohd Samir Shaikh

