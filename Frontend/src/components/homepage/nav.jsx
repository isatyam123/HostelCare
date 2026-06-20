import React from "react";
import { Link } from "react-router-dom";
import { BrandMark } from "../ui";

const Navbar = () => (
  <nav className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
    <div className="hc-container flex min-h-16 items-center justify-between gap-4">
      <BrandMark />
      <div className="flex items-center gap-2">
        <Link to="/user-login" className="hc-secondary-btn px-4 py-2">Student</Link>
        <Link to="/admin-login" className="hc-primary-btn px-4 py-2">Admin</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
