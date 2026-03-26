# - Chatify

**Chatify** is a full-featured real-time chat application built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Node.js**, **Express.js**, and **MongoDB**.

---

## Notice

This project is created by Misbah Ilyas for portfolio/demo purposes.
You are welcome to view the code, but reuse, copying, or redistribution is not allowed.
It supports **OTP-based registration & login**, ...
It supports **OTP-based registration & login**, **password reset**, **real-time friend requests**, **messaging with media files**, **typing & recording indicators**, **profile management**, and fully responsive UI for all devices.

---

## 📚 Table of Contents

- [Purpose](#purpose)
- [Features](#features)
- [User Roles & Permissions](#user-roles--permissions)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Authentication & Chat Flow](#authentication--chat-flow)
- [Real-Time Messaging Flow](#real-time-messaging-flow)
- [Author](#author)

---

## 🎯 Purpose

Chatify is designed to provide a **secure, interactive, and feature-rich chat platform**, including:

- Real-time messaging with text, images, videos, PDFs, voice notes, and emojis
- OTP-based **user registration & login**
- Password reset via OTP
- Friend requests & real-time acceptance/rejection
- Profile management with real-time updates
- Responsive and advanced UI for mobile, tablet, and desktop
- Full validation with visual cues (input borders red, messages for invalid inputs)

---

## Features

### User Authentication & Authorization

- **Registration:** User signs up with name, email, and password
  - OTP sent to email for verification
  - OTP expires in **10 minutes**
  - Resend OTP option available
  - Fully validated fields with inline error messages
- **Login:** OTP-verified login
- **Forgot Password:** Request OTP and reset password with validation
- **JWT Authentication:** Access + Refresh tokens with token revocation support

### Friend Requests & Contacts

- Users can **search for other users**
- Send friend requests in real-time
- Accept or reject friend requests
  - Accepted users are added to each other’s contact list
  - Rejected requests are removed in real-time
- Cancel pending requests
- Real-time notifications for friend request updates

### Real-Time Messaging

- Send **text messages, emojis, images, videos, PDFs, and voice messages**
- Real-time **typing indicators** & **recording status**
- **Message status indicators:**
  - Single tick = sent
  - Double tick = delivered
  - Blue tick = seen
- Responsive chat bubbles with **avatars** and **user names**
- Advanced UI with **modern message layout**

### Profile Management

- Update **profile picture, name, and bio**
- Changes are **reflected in real-time**
- Accessible from **settings** for full control

### Email & Notifications

- OTP for account verification
- OTP for password reset
- Confirmation emails after account verification and password reset

### 🔐 Security

- Protected routes using `userAuth` middleware
- Role-based access using `roleAuth` middleware
- JWT verification and expiration handling
- Token revocation
- Error handling for unauthorized or forbidden access
- Password hashing with bcrypt

---

## User Roles & Permissions

| Role     | Friend Requests | Real-Time Messaging | Profile Management | Protected Routes |
| -------- | --------------- | ------------------- | ------------------ | ---------------- |
| **User** | ✅              | ✅                  | ✅                 | ✅               |

---

## Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS, React Redux, Framer Motion
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT + Refresh Tokens
- **Email:** Nodemailer (OTP & verification)
- **Validation:** Joi / Yup
- **Real-Time:** Socket.io
- **Security:** bcrypt, password hashing

---

## Setup & Installation

### Clone the repository

```bash
git clone https://github.com/YourUsername/Chatify.git
cd Chatify
npm install
```
