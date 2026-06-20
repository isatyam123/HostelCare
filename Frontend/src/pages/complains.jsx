import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  allgetComplaintRoute,
  deleteComplaintRoute,
  getComplaintsRoute,
  updateComplaintStatusRoute,
} from "../utils/APIroutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  PageNav,
  StatCard,
  categoryTone,
  inferCategory,
  inferPriority,
  priorityTone,
  statusLabel,
  statusTone,
} from "../components/ui";

const filters = ["All", "Pending", "In Progress", "Resolved"];

const GetComplaint = () => {
  const [allcomplaints, setAllComplaints] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [isadmin, setIsAdmin] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const navigate = useNavigate();

  const currentUser = useMemo(
    () => JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)),
    []
  );

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setIsAdmin(Boolean(currentUser.isadmin));
  }, [currentUser, navigate]);

  useEffect(() => {
    const fetchAllComplaints = async () => {
      try {
        const response = await axios.get(allgetComplaintRoute);
        setAllComplaints(response.data);
      } catch (error) {
        toast.error("Error fetching complaints. Please try again.", { position: "bottom-right", autoClose: 5000 });
      }
    };

    fetchAllComplaints();
  }, []);

  useEffect(() => {
    const fetchComplaints = async () => {
      if (!currentUser?._id) return;
      try {
        const response = await axios.get(`${getComplaintsRoute}/${currentUser._id}`);
        setComplaints(response.data);
      } catch (error) {
        toast.error("Error fetching complaints. Please try again.", { position: "bottom-right", autoClose: 5000 });
      }
    };

    fetchComplaints();
  }, [currentUser]);

  const sourceComplaints = isadmin ? allcomplaints : complaints;

  const stats = useMemo(() => {
    const total = sourceComplaints.length;
    const pending = sourceComplaints.filter((complaint) => statusLabel(complaint.status).toLowerCase() === "pending").length;
    const progress = sourceComplaints.filter((complaint) => statusLabel(complaint.status).toLowerCase() === "in progress").length;
    const resolved = sourceComplaints.filter((complaint) => statusLabel(complaint.status).toLowerCase() === "resolved").length;
    return { total, pending, progress, resolved };
  }, [sourceComplaints]);

  const updateComplaintStatus = async (_id, status) => {
    try {
      const response = await axios.put(updateComplaintStatusRoute, { _id, status });

      if (response.data.status) {
        setAllComplaints((prevState) => prevState.map((complaint) => (complaint._id === _id ? { ...complaint, status } : complaint)));
        setComplaints((prevState) => prevState.map((complaint) => (complaint._id === _id ? { ...complaint, status } : complaint)));
        toast.success(response.data.msg, { position: "bottom-right", autoClose: 5000 });
      } else {
        toast.error(response.data.msg, { position: "bottom-right", autoClose: 5000 });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", { position: "bottom-right", autoClose: 5000 });
    }
  };

  const deleteComplaint = async (_id) => {
    try {
      const response = await axios.delete(`${deleteComplaintRoute}/${_id}`);
      if (response.data.status) {
        toast.success(response.data.msg, { position: "bottom-right", autoClose: 5000 });
        setComplaints((prevState) => prevState.filter((complaint) => complaint._id !== _id));
        setAllComplaints((prevState) => prevState.filter((complaint) => complaint._id !== _id));
      } else {
        toast.error(response.data.msg, { position: "bottom-right", autoClose: 5000 });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", { position: "bottom-right", autoClose: 5000 });
    }
  };

  const filteredComplaints = sourceComplaints.filter((complaint) => {
    if (statusFilter === "All") return true;
    return statusLabel(complaint.status) === statusFilter;
  });

  const ComplaintCard = ({ complaint }) => {
    const category = complaint.category || inferCategory(complaint.complaint);
    const priority = inferPriority(complaint.complaint, complaint.priority);
    const currentStatus = statusLabel(complaint.status);
    const isResolved = currentStatus === "Resolved";

    return (
      <article className="hc-card overflow-hidden">
        <div className="grid gap-5 p-5 lg:grid-cols-[1fr_260px]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`hc-badge ${categoryTone(category)}`}>{category}</span>
              <span className={`hc-badge ${priorityTone(priority)}`}>{priority} Priority</span>
              <span className={`hc-badge ${statusTone(currentStatus)}`}>{currentStatus}</span>
            </div>
            <div className="mt-5 flex flex-col gap-1">
              <h2 className="text-xl font-bold text-slate-950">{complaint.username}</h2>
              <p className="text-sm text-slate-500">Roll {complaint.rollNumber} • Room {complaint.roomNumber}</p>
            </div>
            <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-700">{complaint.complaint}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {isadmin && !isResolved && (
                <>
                  <button className="hc-secondary-btn px-4 py-2" onClick={() => updateComplaintStatus(complaint._id, "In Progress")}>
                    Mark in progress
                  </button>
                  <button className="hc-primary-btn px-4 py-2" onClick={() => updateComplaintStatus(complaint._id, "Resolved")}>
                    Mark resolved
                  </button>
                </>
              )}
              {isadmin && (
                <button className="hc-secondary-btn px-4 py-2" onClick={() => navigate("/chat")}>
                  Chat with student
                </button>
              )}
              <button className="hc-danger-btn" onClick={() => deleteComplaint(complaint._id)}>
                Delete complaint
              </button>
            </div>
          </div>
          <div className="min-h-36 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
            {complaint.imageUrl ? (
              <img className="h-full max-h-64 w-full object-cover" src={complaint.imageUrl} alt="Complaint attachment" />
            ) : (
              <div className="grid h-full min-h-36 place-items-center px-5 text-center text-sm font-semibold text-slate-400">
                No attachment
              </div>
            )}
          </div>
        </div>
      </article>
    );
  };

  return (
    <main className="hc-page">
      <PageNav currentUser={currentUser} />
      <section className="hc-container py-8 sm:py-12">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <span className="hc-badge bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
              {isadmin ? "Admin dashboard" : "Complaint history"}
            </span>
            <h1 className="mt-4 text-3xl font-extrabold text-slate-950 sm:text-4xl">
              {isadmin ? "Manage all hostel complaints" : "Track your submitted complaints"}
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Filter by status, review details, inspect attachments, and continue the conversation in chat.
            </p>
          </div>
          <button className="hc-primary-btn" onClick={() => navigate(isadmin ? "/chat" : "/submit")}>
            {isadmin ? "Open chat" : "Submit new complaint"}
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total" value={stats.total} helper="All visible complaints" tone="blue" />
          <StatCard label="Pending" value={stats.pending} helper="Waiting for action" tone="amber" />
          <StatCard label="In Progress" value={stats.progress} helper="Currently assigned" tone="blue" />
          <StatCard label="Resolved" value={stats.resolved} helper="Completed requests" tone="emerald" />
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                statusFilter === filter ? "bg-blue-600 text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4">
          {filteredComplaints.length > 0 ? (
            filteredComplaints.map((complaint) => <ComplaintCard key={complaint._id} complaint={complaint} />)
          ) : (
            <div className="hc-card p-10 text-center">
              <h2 className="text-xl font-bold text-slate-950">No complaints found</h2>
              <p className="mt-2 text-slate-500">Try a different filter or submit a new complaint.</p>
            </div>
          )}
        </div>
      </section>
      <ToastContainer />
    </main>
  );
};

export default GetComplaint;
