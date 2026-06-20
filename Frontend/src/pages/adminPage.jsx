import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logout from "../components/Logout";
import { PageNav, StatCard } from "../components/ui";
import { allgetComplaintRoute } from "../utils/APIroutes";

const AdminPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
    if (user) {
      setCurrentUser(user);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(allgetComplaintRoute);
        setComplaints(response.data);
      } catch (error) {
        setComplaints([]);
      }
    };

    fetchComplaints();
  }, []);

  if (!currentUser || !currentUser.isadmin) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 text-slate-600">
        Loading...
      </div>
    );
  }

  const pending = complaints.filter((complaint) => !complaint.status || String(complaint.status).toLowerCase() === "pending").length;
  const resolved = complaints.filter((complaint) => ["resolved", "completed"].includes(String(complaint.status).toLowerCase())).length;

  return (
    <main className="hc-page">
      <PageNav currentUser={currentUser} />
      <section className="hc-container py-8 sm:py-12">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div>
            <span className="hc-badge bg-blue-50 text-blue-700 ring-1 ring-blue-200">Admin dashboard</span>
            <h1 className="mt-4 text-3xl font-extrabold text-slate-950 sm:text-4xl">Welcome, {currentUser.username}.</h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Review hostel complaint volume, jump into status management, or continue student conversations.
            </p>
          </div>
          <Logout />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="All Complaints" value={complaints.length} helper="Total requests in system" tone="blue" />
          <StatCard label="Pending" value={pending} helper="Needs review" tone="amber" />
          <StatCard label="Resolved" value={resolved} helper="Closed by team" tone="emerald" />
          <StatCard label="Contacts" value="Live" helper="Socket.IO chat enabled" tone="slate" />
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <button className="hc-card p-6 text-left transition hover:border-blue-200 hover:bg-blue-50" onClick={() => navigate("/complains")}>
            <h2 className="text-xl font-bold text-slate-950">Complaint operations</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Open the full complaint board to filter requests, update status, review attachments, and manage completed items.</p>
            <span className="mt-5 inline-flex text-sm font-bold text-blue-700">See all complaints</span>
          </button>
          <button className="hc-card p-6 text-left transition hover:border-emerald-200 hover:bg-emerald-50" onClick={() => navigate("/chat")}>
            <h2 className="text-xl font-bold text-slate-950">Student conversations</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Continue real-time support with students through the existing Socket.IO chat experience.</p>
            <span className="mt-5 inline-flex text-sm font-bold text-emerald-700">Open chat</span>
          </button>
        </div>
      </section>
    </main>
  );
};

export default AdminPage;
