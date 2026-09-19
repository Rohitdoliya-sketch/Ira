import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, AlertCircle } from 'lucide-react';

interface ScreenRatingProps {
  rating: number | null;
  onSelectRating: (rating: number) => void;
  onContinue: () => void;
}

export const ScreenRating: React.FC<ScreenRatingProps> = ({
  rating,
  onSelectRating,
  onContinue,
}) => {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleStarClick = (starValue: number) => {
    setErrorMessage(null);
    onSelectRating(starValue);
  };

  const handleContinue = () => {
    if (rating === null) {
      setErrorMessage('Choose the rating that matches your experience.');
      return;
    }
    setErrorMessage(null);
    onContinue();
  };

  const activeRating = hoveredStar !== null ? hoveredStar : rating;

  // Dignified honest sentiment descriptors
  const getRatingLabel = (val: number | null) => {
    if (val === null) return 'Select your rating above';
    switch (val) {
      case 1:
        return '1 out of 5 — Unsatisfied';
      case 2:
        return '2 out of 5 — Below expectations';
      case 3:
        return '3 out of 5 — Average / Fair';
      case 4:
        return '4 out of 5 — Good experience';
      case 5:
        return '5 out of 5 — Excellent visit';
      default:
        return `${val} out of 5`;
    }
  };

  return (
    <motion.div
      id="rf-screen-rating"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col justify-between flex-1 px-5 pt-4 pb-8 max-w-md mx-auto w-full"
    >
      <div>
        {/* Step Headings */}
        <div className="mb-6">
          <h1
            id="rf-rating-heading"
            className="font-serif text-[24px] sm:text-[28px] font-normal tracking-tight text-[#1C1917] leading-tight mb-1.5"
          >
            How was your experience?
          </h1>
          <p
            id="rf-rating-subheading"
            className="text-[#57534E] text-[14px] leading-normal"
          >
            Choose the rating that honestly matches your visit.
          </p>
        </div>

        {/* Validation error notification */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              id="rf-rating-error"
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#FEE2E2] text-[#991B1B] text-[13px] border border-[#FECACA]"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Rating Card */}
        <div
          id="rf-rating-card"
          className="p-6 rounded-3xl bg-[#F7F3EC] border border-[#E5DFD5] flex flex-col items-center justify-center text-center my-4 shadow-sm"
        >
          {/* Star selector with EQUAL visual importance across all 5 stars */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 py-3" role="radiogroup" aria-label="Rating selection">
            {[1, 2, 3, 4, 5].map((starValue) => {
              const isFilled = activeRating !== null && starValue <= activeRating;
              return (
                <button
                  key={starValue}
                  id={`rf-star-btn-${starValue}`}
                  type="button"
                  role="radio"
                  aria-checked={rating === starValue}
                  aria-label={`${starValue} star${starValue > 1 ? 's' : ''}`}
                  onClick={() => handleStarClick(starValue)}
                  onMouseEnter={() => setHoveredStar(starValue)}
                  onMouseLeave={() => setHoveredStar(null)}
                  className="p-2 sm:p-2.5 rounded-2xl transition-all duration-150 active:scale-90 focus:outline-none focus:ring-2 focus:ring-[#8C7A6B]/50 hover:bg-[#EFE9DF]"
                >
                  <Star
                    className={`w-9 h-9 sm:w-10 sm:h-10 transition-colors duration-150 ${
                      isFilled
                        ? 'fill-[#9C826B] text-[#9C826B]'
                        : 'fill-transparent text-[#D4C9BD]'
                    }`}
                    strokeWidth={1.75}
                  />
                </button>
              );
            })}
          </div>

          {/* Clean "X out of 5" Display */}
          <div className="mt-3 min-h-[32px] flex items-center justify-center">
            <span
              id="rf-rating-selected-value"
              className={`text-[15px] font-medium tracking-wide transition-all ${
                rating !== null ? 'text-[#1C1917]' : 'text-[#8C7A6B]'
              }`}
            >
              {getRatingLabel(activeRating)}
            </span>
          </div>

          <p className="text-[12px] text-[#A8A29E] mt-1">
            Every honest perspective is valued and respected.
          </p>
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="pt-4 border-t border-[#EDE7DD]/80">
        <button
          id="rf-rating-continue-btn"
          type="button"
          onClick={handleContinue}
          className="w-full py-4 px-6 rounded-2xl bg-[#1C1917] hover:bg-[#2E2A27] text-[#FAF8F5] text-[15px] font-medium tracking-wide shadow-sm active:scale-[0.99] transition-all flex items-center justify-center"
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
};
