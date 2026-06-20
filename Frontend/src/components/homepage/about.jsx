import React from "react";

const features = [
  ["Complaint Management", "Submit and track maintenance issues efficiently."],
  ["Real-Time Communication", "Chat directly with hostel administration."],
  ["Status Tracking", "Monitor complaints from submission to resolution."],
  ["Student Friendly", "A simple interface for hostel residents."],
];

const About = () => {
  return (
    <section className="bg-white py-16">
      <div className="hc-container text-center">
        <h2 className="text-3xl font-extrabold text-slate-950">About HostelCare</h2>
        <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-600">
          HostelCare helps students report issues, track complaint status, and communicate with hostel administration in real time.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(([title, text]) => (
            <article key={title} className="hc-card p-5 text-left">
              <h3 className="font-bold text-blue-700">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
