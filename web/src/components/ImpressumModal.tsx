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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in font-mono">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-zinc-950 light:bg-white rounded-2xl p-6 sm:p-8 overflow-y-auto shadow-2xl text-zinc-300 light:text-[#18181B] space-y-6 border border-zinc-900 light:border-[#E8E3DA]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-900/60 light:border-[#E8E3DA] pb-4">
          <div className="flex items-center gap-3">
            <Building2 className="w-6 h-6 text-dutchOrange" />
            <div>
              <h2 className="text-xl font-bold text-white light:text-[#18181B] font-mono uppercase">EU Statutory Legal Disclosure (Impressum)</h2>
              <span className="text-xs font-mono text-zinc-400 light:text-[#52525B]">Compliant with Dutch Law & EU Directive 2000/31/EC</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-black light:bg-[#E8E3DA] text-zinc-400 light:text-[#52525B] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corporate Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-black light:bg-[#F4F0E8] border border-zinc-900 light:border-[#E8E3DA] space-y-1">
            <span className="text-zinc-500 light:text-[#71717A] uppercase block">Official Entity Name</span>
            <span className="text-base font-bold text-white light:text-[#18181B]">Eigenia B.V.</span>
            <span className="text-dutchOrange block">Dutch Private Limited Company</span>
          </div>

          <div className="p-4 rounded-xl bg-black light:bg-[#F4F0E8] border border-zinc-900 light:border-[#E8E3DA] space-y-1">
            <span className="text-zinc-500 light:text-[#71717A] uppercase block">Jurisdiction & Registry</span>
            <span className="text-white light:text-[#18181B] font-bold">The Netherlands (KvK Registered B.V.)</span>
            <span className="text-zinc-400 light:text-[#52525B] block">Belastingdienst Tax Compliant</span>
          </div>

          <div className="p-4 rounded-xl bg-black light:bg-[#F4F0E8] border border-zinc-900 light:border-[#E8E3DA] space-y-1">
            <span className="text-zinc-500 light:text-[#71717A] uppercase block">Direct Intake Email</span>
            <a href="mailto:jim@eigenia.nl" className="text-dutchOrange font-bold hover:underline block text-sm">
              jim@eigenia.nl
            </a>
            <span className="text-zinc-400 light:text-[#52525B] block">Board & Research Communications</span>
          </div>

          <div className="p-4 rounded-xl bg-black light:bg-[#F4F0E8] border border-zinc-900 light:border-[#E8E3DA] space-y-1">
            <span className="text-zinc-500 light:text-[#71717A] uppercase block">Official Web Domains</span>
            <span className="text-white light:text-[#18181B] font-bold">eigenia.com & eigenia.nl</span>
            <span className="text-dutchOrange block">100% Unencumbered Ownership</span>
          </div>
        </div>

        {/* Legal & Regulatory Section */}
        <div className="space-y-4 text-xs font-sans font-light text-zinc-300 light:text-[#3F3F46] pt-2 border-t border-zinc-900/60 light:border-[#E8E3DA]">
          <div className="flex items-center gap-2 text-white light:text-[#18181B] font-mono font-bold text-sm">
            <MapPin className="w-4 h-4 text-dutchOrange" /> Registered Statutory Headquarters
          </div>
          <p className="font-mono text-xs text-zinc-400 light:text-[#52525B]">
            Eigenia B.V. &bull; Herengracht 450, 1017 CA Amsterdam, The Netherlands
          </p>

          <div className="flex items-center gap-2 text-white light:text-[#18181B] font-mono font-bold text-sm pt-2">
            <Scale className="w-4 h-4 text-dutchOrange" /> EU Online Dispute Resolution (ODR)
          </div>
          <p className="text-xs text-zinc-300 light:text-[#3F3F46] leading-relaxed">
            The European Commission provides a platform for online dispute resolution (ODR):{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dutchOrange underline font-mono"
            >
              https://ec.europa.eu/consumers/odr
            </a>
            . Eigenia B.V. is neither obligated nor willing to participate in dispute resolution proceedings before a consumer arbitration board.
          </p>
        </div>

        <div className="pt-4 border-t border-zinc-900/60 light:border-[#E8E3DA] flex justify-between items-center text-[10px] font-mono text-zinc-500 light:text-[#71717A]">
          <span>STATUTORY IMPRESSUM DISCLOSURE</span>
          <span className="text-dutchOrange">EIGENIA B.V. (AMSTERDAM, NL)</span>
        </div>

      </div>
    </div>
  );
};
