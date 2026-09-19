import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, RefreshCw } from 'lucide-react';

interface ScreenGeneratingProps {
  onComplete: () => void;
}

export const ScreenGenerating: React.FC<ScreenGeneratingProps> = ({ onComplete }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Deliberate, smooth transition timer to make the experience feel thoughtful and polished
    const timer = setTimeout(() => {
      onComplete();
    }, 1800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleRetry = () => {
    setHasError(false);
    setTimeout(() => {
      onComplete();
    }, 1200);
  };

  if (hasError) {
    return (
      <div
        id="rf-generating-error"
        className="flex flex-col items-center justify-center flex-1 px-6 py-12 max-w-md mx-auto w-full text-center"
      >
        <div className="w-12 h-12 rounded-full bg-[#FEE2E2] text-[#991B1B] flex items-center justify-center mb-4">
          <RefreshCw className="w-5 h-5" />
        </div>
        <h2 className="font-serif text-[22px] font-normal text-[#1C1917] mb-2">
          Almost there
        </h2>
        <p className="text-[#78716C] text-[14px] max-w-xs mb-6">
          We couldn’t create the review right now. Your answers are still saved.
        </p>
        <button
          id="rf-try-again-btn"
          onClick={handleRetry}
          className="py-3 px-6 rounded-2xl bg-[#1C1917] text-[#FAF8F5] text-[14px] font-medium tracking-wide shadow-sm"
        >
          TRY AGAIN
        </button>
      </div>
    );
  }

  return (
    <motion.div
      id="rf-screen-generating"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center justify-center flex-1 px-6 py-16 max-w-md mx-auto w-full text-center"
    >
      {/* Subtle luxury animation container */}
      <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
        {/* Soft pulsing warm halo */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full bg-[#E5DFD5]/80"
        />

        {/* Elegant rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-1 rounded-full border border-dashed border-[#8C7A6B]/60"
        />

        {/* Center icon */}
        <div className="relative z-10 w-11 h-11 rounded-full bg-[#1C1917] text-[#FAF8F5] flex items-center justify-center shadow-md shadow-black/10">
          <Sparkles className="w-5 h-5" />
        </div>
      </div>

      {/* Heading */}
      <h1
        id="rf-generating-heading"
        className="font-serif text-[24px] sm:text-[26px] font-normal tracking-tight text-[#1C1917] mb-2 leading-tight"
      >
        Putting your experience into words…
      </h1>

      {/* Supporting Text */}
      <p
        id="rf-generating-subheading"
        className="text-[#57534E] text-[14px] sm:text-[15px] max-w-xs leading-relaxed"
      >
        Creating a short review from what you told us.
      </p>

      <div className="mt-8 flex items-center gap-2">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
          className="w-1.5 h-1.5 rounded-full bg-[#8C7A6B]"
        />
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
          className="w-1.5 h-1.5 rounded-full bg-[#8C7A6B]"
        />
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
          className="w-1.5 h-1.5 rounded-full bg-[#8C7A6B]"
        />
      </div>
    </motion.div>
  );
};
