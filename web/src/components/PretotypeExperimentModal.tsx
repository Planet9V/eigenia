"use client";

import React, { useState } from "react";
import { X, TrendingUp, CheckCircle, Upload, ArrowRight, ShieldCheck, Mail, Building } from "lucide-react";
import { useContactForm } from "@/lib/useContactForm";

interface PretotypeExperimentModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "scurve" | "telemetry" | "briefing";
}

export const PretotypeExperimentModal: React.FC<PretotypeExperimentModalProps> = ({
  isOpen,
  onClose,
  type,
}) => {
  const { submitted, error, submit, reset } = useContactForm();
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [plantCapacity, setPlantCapacity] = useState("100");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const subjectTitle =
    type === "scurve"
      ? "S-Curve Position Audit Request"
      : type === "telemetry"
      ? "Telemetry Sandbox Access Request"
      : "Executive Board Risk Briefing Request";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await submit(
      {
        name: email,
        email,
        company,
        capacity: plantCapacity,
        type: subjectTitle,
        message,
      },
      {
        subject: `[Eigenia Labs] ${subjectTitle} - ${company}`,
        body: `Request Type: ${subjectTitle}\nEmail: ${email}\nCompany/Entity: ${company}\nCapacity (MW/MGD): ${plantCapacity}\n\nMessage/Details:\n${message}`,
      }
    );
  };

  const handleReset = () => {
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative w-full max-w-xl bg-zinc-950 light:bg-white border border-dutchOrange/40 rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-200 light:text-[#18181B] space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 light:border-[#E8E3DA] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-dutchOrange/20 border border-dutchOrange/40 flex items-center justify-center text-dutchOrange">
              {type === "scurve" && <TrendingUp className="w-5 h-5" />}
              {type === "telemetry" && <Upload className="w-5 h-5" />}
              {type === "briefing" && <ShieldCheck className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white light:text-[#18181B]">
                {type === "scurve" && "S-Curve Position Audit Request"}
                {type === "telemetry" && "Eigenia Labs Telemetry Sandbox"}
                {type === "briefing" && "Executive Board Risk Briefing"}
              </h2>
              <span className="text-xs font-mono text-dutchOrange">
                Direct Intake • jim@eigenia.nl
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-zinc-900 light:bg-[#E8E3DA] text-zinc-400 light:text-[#52525B] hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-zinc-300 light:text-[#52525B] leading-relaxed font-mono">
              {type === "scurve" &&
                "Submit your infrastructure capacity to compute your exact position on the S-curves and identify exponential return opportunities."}
              {type === "telemetry" &&
                "Paste or upload anonymized control loop config snippets to run nonlinear stability checks against Eigenia Labs digital twin models."}
              {type === "briefing" &&
                "Schedule a private 30-minute board briefing on physical plant risk reduction with senior Eigenia B.V. scientists."}
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-zinc-400 light:text-[#52525B] mb-1 uppercase text-[10px]">Corporate Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-zinc-900 light:bg-[#F4F0E8] border border-zinc-800 light:border-[#E8E3DA] rounded-xl text-white light:text-[#18181B] focus:outline-none focus:border-dutchOrange font-sans text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 light:text-[#52525B] mb-1 uppercase text-[10px]">Company / Organization Name</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Global Energy Grid Operator"
                    className="w-full pl-9 pr-3 py-2.5 bg-zinc-900 light:bg-[#F4F0E8] border border-zinc-800 light:border-[#E8E3DA] rounded-xl text-white light:text-[#18181B] focus:outline-none focus:border-dutchOrange font-sans text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 light:text-[#52525B] mb-1 uppercase text-[10px]">Plant / Network Capacity (MW or MGD)</label>
                <input
                  type="text"
                  value={plantCapacity}
                  onChange={(e) => setPlantCapacity(e.target.value)}
                  placeholder="e.g. 500 MW or 120 MGD"
                  className="w-full px-3 py-2.5 bg-zinc-900 light:bg-[#F4F0E8] border border-zinc-800 light:border-[#E8E3DA] rounded-xl text-white light:text-[#18181B] focus:outline-none focus:border-dutchOrange font-sans text-xs"
                />
              </div>

              <div>
                <label className="block text-zinc-400 light:text-[#52525B] mb-1 uppercase text-[10px]">Technical Scope & Objectives</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your plant topology or specific risk parameters..."
                  className="w-full px-3 py-2.5 bg-zinc-900 light:bg-[#F4F0E8] border border-zinc-800 light:border-[#E8E3DA] rounded-xl text-white light:text-[#18181B] focus:outline-none focus:border-dutchOrange font-sans text-xs"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3 font-mono text-xs">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-zinc-900 light:bg-[#E8E3DA] text-zinc-300 light:text-[#18181B] hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-dutchOrange text-white font-bold hover:bg-dutchOrange/90 transition-all shadow-lg flex items-center gap-2"
              >
                <span>Submit to jim@eigenia.nl</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        ) : (
          <div className="py-6 text-center space-y-4 font-mono">
            <div className="w-12 h-12 rounded-full bg-dutchOrange/20 text-dutchOrange flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white light:text-[#18181B] uppercase">Request Dispatched to jim@eigenia.nl</h3>
            <p className="text-xs text-zinc-300 light:text-[#52525B] font-sans max-w-sm mx-auto leading-relaxed">
              Thank you, <strong className="text-dutchOrange">{email}</strong>. Your request for <strong className="text-white light:text-[#18181B]">{company}</strong> has been routed to <strong className="text-dutchOrange">jim@eigenia.nl</strong>.
            </p>
            {error && (
              <p className="text-xs text-amber-500 font-sans max-w-sm mx-auto leading-relaxed bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3">
                {error}
              </p>
            )}
            <div className="pt-2">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-dutchOrange text-white text-xs font-bold font-mono hover:bg-dutchOrange/90 transition-all shadow-md"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
