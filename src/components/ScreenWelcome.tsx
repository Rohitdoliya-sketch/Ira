import React from 'react';
import { motion } from 'motion/react';
import { Clock, Sparkles, ShieldCheck } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface ScreenWelcomeProps {
  onStart: () => void;
}

export const ScreenWelcome: React.FC<ScreenWelcomeProps> = ({ onStart }) => {
  return (
    <motion.div
      id="rf-screen-welcome"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col justify-between flex-1 px-6 pt-6 pb-8 max-w-md mx-auto w-full"
    >
      {/* Brand & Editorial Identity */}
      <div className="flex flex-col items-center text-center mt-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4EFEA] border border-[#E8E1D5] mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#8C7A6B]" />
          <span className="text-[11px] font-medium tracking-widest text-[#6E645A] uppercase">
            ReviewFlow
          </span>
        </div>

        {/* Sophisticated Text-Based Salon Identity */}
        <div id="rf-salon-identity" className="mb-6">
          <h2 className="font-serif text-3xl font-normal tracking-[0.25em] text-[#1C1917] uppercase leading-none">
            IRA
          </h2>
          <p className="text-[11px] font-medium tracking-[0.35em] text-[#78716C] uppercase mt-1.5">
            UNISEX SALON
          </p>
          <div className="w-8 h-[1px] bg-[#C7BCAD] mx-auto mt-3" />
        </div>

        {/* Main Heading */}
        <h1
          id="rf-welcome-heading"
          className="font-serif text-[28px] sm:text-[32px] font-normal tracking-tight text-[#1C1917] leading-[1.25] mb-3"
        >
          How was your experience today?
        </h1>

        {/* Supporting Copy */}
        <p
          id="rf-welcome-subheading"
          className="text-[#57534E] text-[15px] sm:text-[16px] leading-[1.6] max-w-xs mx-auto"
        >
          Tell us in a few quick taps. We’ll help you put your experience into words.
        </p>

        {/* Reassurance cards */}
        <div className="w-full mt-8 grid grid-cols-2 gap-3 text-left">
          <div className="p-3.5 rounded-2xl bg-[#F7F4EE] border border-[#EDE7DD]">
            <span className="block text-[13px] font-semibold text-[#292524] mb-0.5">
              No Blank Page
            </span>
            <span className="text-[12px] text-[#78716C] leading-snug block">
              We craft your inputs into natural phrasing for you.
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F7F4EE] border border-[#EDE7DD]">
            <span className="block text-[13px] font-semibold text-[#292524] mb-0.5">
              Full Control
            </span>
            <span className="text-[12px] text-[#78716C] leading-snug block">
              Always review, edit, and decide what to share.
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-8 flex flex-col items-center gap-3">
        <button
          id="rf-start-button"
          onClick={onStart}
          className="w-full py-4 px-6 rounded-2xl bg-[#1C1917] hover:bg-[#2E2A27] text-[#FAF8F5] text-[15px] font-medium tracking-wide shadow-md shadow-black/5 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
        >
          <span>START</span>
        </button>

        <div className="flex items-center gap-1.5 text-[12px] text-[#78716C]">
          <Clock className="w-3.5 h-3.5 text-[#8C7A6B]" />
          <span>Takes less than a minute</span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-[#A8A29E] mt-1">
          <ShieldCheck className="w-3 h-3 text-[#A8A29E]" />
          <span>Authentic customer assistant • No account required</span>
        </div>
      </div>
    </motion.div>
  );
};
