import React from "react";
import { Link } from "react-router-dom";
import { BiHomeAlt, BiMessageRoundedDots, BiClipboard, BiPlusCircle } from "react-icons/bi";

export const statusLabel = (status) => {
  if (!status) return "Pending";
  const normalized = String(status).toLowerCase();
  if (normalized === "completed") return "Resolved";
  if (normalized === "in progress") return "In Progress";
  if (normalized === "resolved") return "Resolved";
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export const statusTone = (status) => {
  const normalized = statusLabel(status).toLowerCase();
  if (normalized === "resolved") return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
  if (normalized === "in progress") return "bg-blue-50 text-blue-700 ring-1 ring-blue-200";
  return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
};

export const priorityTone = (priority = "Medium") => {
  const normalized = String(priority).toLowerCase();
  if (normalized === "high") return "bg-rose-50 text-rose-700 ring-1 ring-rose-200";
  if (normalized === "low") return "bg-slate-100 text-slate-700 ring-1 ring-slate-200";
  return "bg-blue-50 text-blue-700 ring-1 ring-blue-200";
};

export const categoryTone = (category = "General") => {
  const normalized = String(category).toLowerCase();
  if (normalized.includes("water") || normalized.includes("clean")) return "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200";
  if (normalized.includes("electric")) return "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200";
  if (normalized.includes("mess")) return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
  return "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200";
};

export const inferCategory = (complaint = "") => {
  const text = String(complaint).toLowerCase();
  if (text.includes("water") || text.includes("tap") || text.includes("leak")) return "Water";
  if (text.includes("electric") || text.includes("light") || text.includes("fan")) return "Electricity";
  if (text.includes("wifi") || text.includes("internet")) return "Internet";
  if (text.includes("mess") || text.includes("food")) return "Mess";
  if (text.includes("clean") || text.includes("washroom")) return "Cleanliness";
  if (text.includes("bed") || text.includes("chair") || text.includes("table")) return "Furniture";
  return "General";
};

export const inferPriority = (complaint = "", priority) => {
  if (priority) return priority;
  const text = String(complaint).toLowerCase();
  if (text.includes("urgent") || text.includes("danger") || text.includes("sparking") || text.includes("flood")) return "High";
  if (text.length < 80) return "Low";
  return "Medium";
};

export function BrandMark({ compact = false, inverse = false }) {
  return (
    <Link to="/" className="flex items-center gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-blue-600 text-lg font-black text-white shadow-lg shadow-blue-200">
        HC
      </span>
      {!compact && (
        <span className={`text-xl font-extrabold tracking-normal ${inverse ? "text-white" : "text-slate-950"}`}>
          Hostel<span className="text-emerald-500">Care</span>
        </span>
      )}
    </Link>
  );
}

export function PageNav({ currentUser }) {
  const links = [
    { to: "/", label: "Home", icon: BiHomeAlt },
    { to: "/complains", label: currentUser?.isadmin ? "Complaints" : "My Complaints", icon: BiClipboard },
    { to: "/chat", label: "Chat", icon: BiMessageRoundedDots },
  ];

  if (!currentUser?.isadmin) {
    links.splice(2, 0, { to: "/submit", label: "Submit", icon: BiPlusCircle });
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="hc-container flex min-h-16 items-center justify-between gap-4">
        <BrandMark />
        <nav className="flex items-center gap-1 overflow-x-auto">
          {links.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
            >
              <Icon className="text-lg" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function StatCard({ label, value, helper, tone = "blue" }) {
  const toneMap = {
    blue: "bg-blue-50 text-blue-700",
    emerald: "bg-emerald-50 text-emerald-700",
    slate: "bg-slate-100 text-slate-700",
    amber: "bg-amber-50 text-amber-700",
  };

  return (
    <div className="hc-card p-5">
      <div className={`mb-4 inline-flex rounded-lg px-3 py-1 text-xs font-bold ${toneMap[tone]}`}>
        {label}
      </div>
      <div className="text-3xl font-extrabold text-slate-950">{value}</div>
      {helper && <p className="mt-2 text-sm text-slate-500">{helper}</p>}
    </div>
  );
}
