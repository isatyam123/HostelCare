import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/chat";
import SubmitComplaint from "./pages/submit";
import GetComplains from "./pages/complains";
import AdminPage from "./pages/adminPage";
import AdminLogin from "./pages/AdminLogin";
import UserLogin from "./pages/UserLogin";
import Home from './components/homepage/home';
import About from './components/homepage/about';
import Contact from './components/homepage/contactUs';


function App() {
  return (
    <BrowserRouter>
     
     
     <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/submit" element={<SubmitComplaint />} />
        <Route path="/complains" element={<GetComplains />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
     
      
    </BrowserRouter>
  );
}

export default App;
