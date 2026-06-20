# HostelCare

A full-stack hostel complaint management platform that streamlines issue reporting, complaint tracking, and student-admin communication through a centralized dashboard and real-time messaging.

## Live Demo

* Frontend: https://hostel-care-eta.vercel.app
* Backend API: https://hostelcare-bqt7.onrender.com

## Overview

HostelCare enables students to report hostel maintenance issues, upload supporting images, monitor complaint progress, and communicate directly with administrators. Administrators can manage complaints, update statuses, and provide real-time support through an integrated chat system.

## Key Features

### Student Portal

* Secure registration and authentication
* Submit complaints with image attachments
* Track complaint status in real time
* View complaint history
* Direct communication with administrators

### Admin Portal

* Secure admin authentication
* Complaint management dashboard
* Update complaint status (Pending, In Progress, Resolved)
* Review complaint details and attachments
* Real-time chat with students

### Real-Time Communication

* Socket.IO based messaging
* Instant student-admin conversations
* Live complaint support workflow

## Tech Stack

### Frontend

* React.js
* React Router
* Tailwind CSS
* Axios
* React Toastify
* Socket.IO Client

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Socket.IO

### Deployment

* Vercel (Frontend)
* Render (Backend)

## System Architecture

Student → React Frontend → Express API → MongoDB Atlas

Student/Admin ↔ Socket.IO ↔ Real-Time Chat Server

## Installation

### Backend

```bash
cd Backend
npm install
npm run dev
```

Environment Variables:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
ADMIN_KEY=your_admin_secret_key
```

### Frontend

```bash
cd Frontend
npm install
npm start
```

## Future Enhancements

* Email notifications
* Complaint analytics dashboard
* Push notifications
* Complaint priority prediction
* Mobile application support

## Author

Satyam Kumar
