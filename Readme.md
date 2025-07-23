# 📺 YouTube Clone

A full-stack video streaming platform that replicates core features of YouTube, allowing users to upload, stream, manage, and explore video content. Built using the **MERN stack**, this app provides a clean, responsive UI and secure user experience.

## 🚀 Overview

This YouTube Clone is a full-stack web application designed to offer core YouTube-like functionality, where users can:

- 🔐 Authenticate securely using JWT.
- 📤 Upload and manage video content.
- 📺 Stream videos directly from Cloudinary.
- 🔎 Explore, search, and filter video content.
- ✨ Experience a responsive and modern UI.

Technologies include **React**, **Node.js**, **Express**, **MongoDB**, **Cloudinary**, and **Tailwind CSS**.

---

## ✨ Features

### 🎨 Modern UI Layouts

- **Homepage**
  - 🔍 Search bar and conditional Login/Signup button
  - 🧭 Sidebar for categories & tag filters
  - 📺 Video grid with thumbnails, titles, channels, views

- **Video Player Page**
  - 🎥 Full video streaming player
  - 📝 Title, description, channel, views, upload time
  - 💬 Comment section with add/edit/delete support

- **Channel Page**
  - 📈 Channel banner, name, and subscriber count
  - 🎞 Video management tools (edit/delete)
  - 📌 View all videos from a specific channel

---

## 📹 Core Functionalities

- ✅ **User Authentication** (Signup, Login with JWT)
- ✅ **Upload Videos** to Cloudinary
- ✅ **Watch Videos** with view count tracking
- ✅ **Search and Filter** videos by title and tags
- ✅ **Responsive Design** for all screen sizes
- ✅ **Interactive UI** built with Tailwind CSS

---

## 🔐 Security

- JWT-based authentication and authorization
- Protected API routes
- Tokens stored securely in `httpOnly` cookies

---

## 🛠️ Tech Stack

### 🌐 Frontend

- **React** – UI Library
- **React Router DOM** – Routing
- **Redux Toolkit** – State Management
- **Tailwind CSS** – Styling
- **Axios** – API Communication

### 🔙 Backend

- **Node.js** – Runtime Environment
- **Express.js** – REST API Framework
- **Multer** – File Upload
- **Cloudinary** – Media Storage

### 💾 Database & Cloud

- **MongoDB** – NoSQL Database
- **Mongoose** – ODM for MongoDB
- **Cloudinary** – Video & Image Hosting

---

## 🧰 Version Control

- **Git & GitHub** – For version control and collaboration  
- Repository: [youtube_clone](https://github.com/swethannadhurai/youtube_clone)

---

## 🛠️ Installation Guide

### 1. Clone the Repository

git clone https://github.com/swethannadhurai/youtube_clone.git
cd youtube_clone


### 2. Install Dependencies

Frontend:

cd frontend
npm install
npm run dev

Backend:

cd backend
npm install
npm start

### 3. Environment Variables

Create a .env file in the backend folder with the following:
PORT=7000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

## 🌐 Visit in Browser
Once both servers are running:

Frontend: http://localhost:5173
Backend: http://localhost:7000

---


