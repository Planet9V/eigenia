"use client";

import React from "react";
import { X, Building2, MapPin, Scale, Mail } from "lucide-react";

interface ImpressumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImpressumModal: React.FC<ImpressumModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-mono">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-surface rounded-2xl p-6 sm:p-8 overflow-y-auto shadow-2xl text-primary space-y-6 border border-hairline transition-colors duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-hairline pb-4">
          <div className="flex items-center gap-3">
            <Building2 className="w-6 h-6 text-dutchOrange" />
            <div>
              <h2 className="text-xl font-bold text-primary font-mono uppercase">EU Statutory Legal Disclosure (Impressum)</h2>
              <span className="text-xs font-mono text-muted">Compliant with Dutch Law & EU Directive 2000/31/EC</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-subtle text-muted hover:text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corporate Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-subtle border border-hairline space-y-1">
            <span className="text-muted uppercase block text-[10px]">Official Entity Name</span>
            <span className="text-base font-bold text-primary">Eigenia B.V.</span>
            <span className="text-dutchOrange block">Dutch Private Limited Company</span>
          </div>

          <div className="p-4 rounded-xl bg-subtle border border-hairline space-y-1">
            <span className="text-muted uppercase block text-[10px]">Jurisdiction & Registry</span>
            <span className="text-primary font-bold">The Netherlands (KvK Registered B.V.)</span>
            <span className="text-secondary block">Belastingdienst Tax Compliant</span>
          </div>

          <div className="p-4 rounded-xl bg-subtle border border-hairline space-y-1">
            <span className="text-muted uppercase block text-[10px]">Direct Intake Email</span>
            <a href="mailto:jim@eigenia.nl" className="text-dutchOrange font-bold hover:underline block text-sm">
              jim@eigenia.nl
            </a>
            <span className="text-secondary block">Board & Research Communications</span>
          </div>

          <div className="p-4 rounded-xl bg-subtle border border-hairline space-y-1">
            <span className="text-muted uppercase block text-[10px]">Official Web Domains</span>
            <span className="text-primary font-bold">eigenia.com & eigenia.nl</span>
            <span className="text-dutchOrange block">100% Unencumbered Ownership</span>
          </div>
        </div>

        {/* Legal Disclaimer & Regulatory Policy */}
        <div className="space-y-3 pt-2 text-xs font-sans text-secondary border-t border-hairline leading-relaxed font-light">
          <h3 className="font-mono text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-2">
            <Scale className="w-4 h-4 text-dutchOrange" /> Regulatory Status & Technical Mission
          </h3>
          <p>
            Eigenia B.V. operates as an independent applied complexity think tank and research lab. All publications, mathematical proofs, software specifications, and physical digital twin models distributed through <strong className="text-primary font-semibold">eigenia.com</strong> and <strong className="text-primary font-semibold">eigenia.nl</strong> are provided under open scientific licenses for sovereign defense and infrastructure protection.
          </p>
        </div>

        {/* Footer Close Action */}
        <div className="pt-4 border-t border-hairline flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-dutchOrange text-white font-bold font-mono text-xs hover:bg-dutchOrange/90 transition-all shadow-md"
          >
            Close Disclosure
          </button>
        </div>
      </div>
    </div>
  );
};
