import React from 'react';
import { motion } from 'motion/react';
import { Heart, RotateCcw } from 'lucide-react';

interface ScreenThankYouProps {
  onRestart: () => void;
}

export const ScreenThankYou: React.FC<ScreenThankYouProps> = ({ onRestart }) => {
  return (
    <motion.div
      id="rf-screen-thank-you"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center justify-between flex-1 px-6 pt-10 pb-8 max-w-md mx-auto w-full text-center"
    >
      <div className="flex flex-col items-center mt-6">
        {/* Warm heart icon in elegant circle */}
        <div className="w-16 h-16 rounded-full bg-[#F4EFEA] border border-[#E8E1D5] flex items-center justify-center mb-6 text-[#8C7A6B]">
          <Heart className="w-7 h-7 fill-[#8C7A6B]/20 stroke-[#8C7A6B]" />
        </div>

        {/* Brand identity badge */}
        <div className="mb-4">
          <span className="font-serif tracking-[0.2em] text-[13px] font-semibold text-[#1C1917] uppercase block">
            IRA UNISEX SALON
          </span>
          <span className="text-[11px] tracking-wider text-[#78716C] uppercase font-medium">
            Mumbai, India
          </span>
        </div>

        {/* Heading */}
        <h1
          id="rf-thank-you-heading"
          className="font-serif text-[26px] sm:text-[30px] font-normal tracking-tight text-[#1C1917] leading-tight mb-3"
        >
          Thanks for sharing your experience ❤️
        </h1>

        {/* Supporting text */}
        <p
          id="rf-thank-you-subheading"
          className="text-[#57534E] text-[15px] leading-relaxed max-w-xs mx-auto"
        >
          Your feedback helps the business understand what customers enjoy and where they can improve.
        </p>

        <div className="w-12 h-[1px] bg-[#E5DFD5] my-6" />

        <div className="p-4 rounded-2xl bg-[#F7F4EE] border border-[#EDE7DD] max-w-xs text-left">
          <p className="text-[13px] text-[#44403C] leading-normal font-medium mb-1">
            Have a wonderful rest of your day!
          </p>
          <p className="text-[12px] text-[#78716C] leading-snug">
            We hope you enjoyed your time with us at Ira Unisex Salon.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full pt-6 flex flex-col items-center gap-3">
        <button
          id="rf-restart-btn"
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-2 py-3 px-5 rounded-2xl border border-[#D6CCC0] bg-[#FAF8F5] text-[#57534E] hover:text-[#1C1917] hover:bg-[#F2ECE4] text-[13px] font-medium transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Start new review</span>
        </button>

        <span className="text-[11px] text-[#A8A29E] tracking-wider uppercase font-medium">
          REVIEWFLOW • Powered for guests
        </span>
      </div>
    </motion.div>
  );
};
