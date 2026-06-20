import React from "react";
import { Link } from "react-router-dom";
import { BrandMark } from "./ui";

export default function AuthShell({ title, subtitle, asideTitle, asideText, children, footer }) {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
        <section className="hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <BrandMark inverse />
          <div>
            <span className="mb-5 inline-flex rounded-full bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-200 ring-1 ring-emerald-300/20">
              HostelCare workspace
            </span>
            <h1 className="max-w-xl text-4xl font-extrabold leading-tight">{asideTitle}</h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-300">{asideText}</p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-sm">
            {["Complaints", "Tracking", "Chat"].map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-white/5 p-4 font-semibold">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
          <div className="w-full max-w-xl">
            <div className="mb-8 flex items-center justify-between">
              <BrandMark />
              <Link to="/" className="text-sm font-semibold text-blue-700 hover:text-blue-800">
                Home
              </Link>
            </div>
            <div className="hc-card p-6 sm:p-8">
              <h2 className="text-3xl font-extrabold text-slate-950">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{subtitle}</p>
              <div className="mt-8">{children}</div>
              {footer && <div className="mt-6 border-t border-slate-100 pt-5 text-sm text-slate-600">{footer}</div>}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
