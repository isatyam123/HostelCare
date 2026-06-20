import React from "react";
import { Link } from "react-router-dom";
import { BiCheckCircle, BiMessageRoundedDots, BiShieldQuarter, BiTimeFive } from "react-icons/bi";
import { BrandMark } from "../ui";

const features = [
  { icon: BiCheckCircle, title: "Track every request", text: "Students can follow complaint status from submission to resolution." },
  { icon: BiMessageRoundedDots, title: "Chat in real time", text: "Residents and admins stay aligned through Socket.IO messaging." },
  { icon: BiShieldQuarter, title: "Role-aware access", text: "Student and admin flows stay separated through the existing auth rules." },
  { icon: BiTimeFive, title: "Faster operations", text: "A focused dashboard helps hostel teams prioritize work quickly." },
];

const stats = [
  ["24/7", "Complaint visibility"],
  ["3", "Status stages"],
  ["1", "Unified help desk"],
];

const Home = () => {
  return (
    <main className="hc-page">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="hc-container flex min-h-16 items-center justify-between gap-4">
          <BrandMark />
          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
            <a href="#features" className="hover:text-blue-700">Features</a>
            <a href="#workflow" className="hover:text-blue-700">Workflow</a>
            <Link to="/register" className="hover:text-blue-700">Register</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/user-login" className="hc-secondary-btn px-4 py-2">Student</Link>
            <Link to="/admin-login" className="hc-primary-btn px-4 py-2">Admin</Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-blue-50 via-emerald-50/50 to-white" />
        <div className="hc-container relative grid gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="flex flex-col justify-center">
            <span className="mb-5 inline-flex w-fit rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700 ring-1 ring-emerald-200">
              Hostel complaint management, simplified
            </span>
            <h1 className="max-w-3xl text-4xl font-extrabold tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
              HostelCare keeps students heard and maintenance teams moving.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Submit issues, upload proof, track progress, and chat directly with hostel administration from one clean workspace.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/register" className="hc-primary-btn">Create account</Link>
              <Link to="/user-login" className="hc-secondary-btn">Student login</Link>
            </div>
          </div>

          <div className="hc-card overflow-hidden p-5">
            <div className="rounded-lg bg-slate-950 p-5 text-white">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm text-blue-100">Live dashboard</p>
                  <h2 className="text-2xl font-bold">Maintenance queue</h2>
                </div>
                <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-bold text-emerald-200">Online</span>
              </div>
              <div className="mt-5 grid gap-3">
                {["Water leakage in B-204", "Wi-Fi outage in study hall", "Mess hygiene concern"].map((item, index) => (
                  <div key={item} className="rounded-lg bg-white/10 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold">{item}</p>
                        <p className="mt-1 text-sm text-slate-300">Assigned to hostel admin</p>
                      </div>
                      <span className={`hc-badge ${index === 0 ? "bg-amber-100 text-amber-700" : index === 1 ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"}`}>
                        {index === 0 ? "Pending" : index === 1 ? "In Progress" : "Resolved"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-y border-slate-200 bg-slate-50 py-14">
        <div className="hc-container grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text }) => (
            <article key={title} className="hc-card p-5">
              <Icon className="text-3xl text-blue-600" />
              <h3 className="mt-4 text-lg font-bold text-slate-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="workflow" className="bg-white py-16">
        <div className="hc-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-blue-600">How it works</p>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-950">A clear path from report to resolution.</h2>
            <p className="mt-4 text-slate-600">HostelCare gives students a simple reporting flow and gives admins the context they need to respond quickly.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map(([value, label]) => (
              <div key={label} className="hc-card p-5">
                <div className="text-3xl font-extrabold text-blue-600">{value}</div>
                <p className="mt-2 text-sm font-semibold text-slate-600">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
