import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-4 text-center">
      <section className="hc-card max-w-xl p-8">
        <h1 className="text-3xl font-extrabold text-slate-950">Welcome to HostelCare</h1>
        <p className="mt-3 text-slate-600">Choose your workspace to continue managing hostel complaints.</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/user-login" className="hc-primary-btn">Student login</Link>
          <Link to="/admin-login" className="hc-secondary-btn">Admin login</Link>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
