# HostelCare

HostelCare is a MERN hostel complaint management platform for students and hostel administrators. Students can register, submit maintenance complaints with image attachments, track complaint status, and chat with admins in real time. Admins can review complaints, update status, and continue support conversations from a modern dashboard.

## Features

- Student registration and login
- Admin login with secret key validation
- Complaint submission with Cloudinary image uploads
- Complaint history and complaint status tracking
- Admin complaint management dashboard
- Category badges, priority badges, and status indicators
- Real-time chat using Socket.IO
- MongoDB Atlas persistence
- Responsive Tailwind CSS frontend

## Tech Stack

- **Frontend:** React, React Router, Tailwind CSS, Axios, React Toastify, Socket.IO Client
- **Backend:** Node.js, Express, MongoDB, Mongoose, Socket.IO
- **Storage:** MongoDB Atlas
- **Media Uploads:** Cloudinary unsigned upload preset

## Project Structure

```text
HostelCare/
  Backend/
    controller/
    db/
    models/
    routes/
    index.js
  Frontend/
    public/
    src/
      components/
      pages/
      utils/
```

## Installation

### Prerequisites

- Node.js 18 or newer
- npm
- MongoDB Atlas connection string
- Cloudinary unsigned upload preset configured for complaint images

### Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/`:

```env
PORT=5000
MONGO_URL=your_mongodb_atlas_connection_string
ADMIN_KEY=your_admin_secret_key
```

Start the backend:

```bash
npm run dev
```

The backend should run on `http://localhost:5000` to match the existing frontend API configuration.

### Frontend Setup

```bash
cd Frontend
npm install
```

Create a `.env` file in `Frontend/`:

```env
REACT_APP_LOCALHOST_KEY=hostelcare-user
```

Start the frontend:

```bash
npm start
```

The React app runs on `http://localhost:3000`.

## Available Scripts

### Backend

- `npm run dev` - Starts the Express server with Nodemon.

### Frontend

- `npm start` - Starts the React development server.
- `npm run build` - Builds the production frontend bundle.
- `npm test` - Runs the React test runner.

## Screenshots

Add project screenshots here after running the app locally:

| Landing Page | Complaint Dashboard | Chat |
| --- | --- | --- |
| `screenshots/landing.png` | `screenshots/complaints.png` | `screenshots/chat.png` |

## Environment Notes

- The frontend API constants currently target `http://localhost:5000`.
- Socket.IO is initialized by the backend and allows the frontend origin `http://localhost:3000`.
- Cloudinary upload settings are defined in the complaint submission page.

## License

This project is available for educational and hostel operations use. Add a formal license file if you plan to distribute it publicly.
