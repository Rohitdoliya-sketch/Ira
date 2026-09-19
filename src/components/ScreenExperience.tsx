import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';
import { STANDOUT_OPTIONS } from '../data/salonData';

interface ScreenExperienceProps {
  standouts: string[];
  otherNotes: string;
  onUpdateExperience: (standouts: string[], otherNotes: string) => void;
  onSubmit: () => void;
}

export const ScreenExperience: React.FC<ScreenExperienceProps> = ({
  standouts,
  otherNotes,
  onUpdateExperience,
  onSubmit,
}) => {
  const toggleOption = (option: string) => {
    let updated: string[];

    if (option === 'NOTHING SPECIFIC') {
      if (standouts.includes('NOTHING SPECIFIC')) {
        updated = [];
      } else {
        // Selecting "Nothing specific" clears other positive/specific highlights
        updated = ['NOTHING SPECIFIC'];
      }
    } else {
      // If user picks any specific option, remove "NOTHING SPECIFIC"
      const withoutNothing = standouts.filter((item) => item !== 'NOTHING SPECIFIC');
      if (withoutNothing.includes(option)) {
        updated = withoutNothing.filter((item) => item !== option);
      } else {
        updated = [...withoutNothing, option];
      }
    }

    onUpdateExperience(updated, otherNotes);
  };

  const handleNotesChange = (val: string) => {
    onUpdateExperience(standouts, val);
  };

  const isOtherSelected = standouts.includes('OTHER');

  const handleFinish = () => {
    // If nothing was selected, default to 'NOTHING SPECIFIC' seamlessly as per prompt guidelines
    if (standouts.length === 0) {
      onUpdateExperience(['NOTHING SPECIFIC'], otherNotes);
    }
    onSubmit();
  };

  return (
    <motion.div
      id="rf-screen-experience"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col justify-between flex-1 px-5 pt-4 pb-8 max-w-md mx-auto w-full"
    >
      <div>
        {/* Step Headings */}
        <div className="mb-5">
          <h1
            id="rf-experience-heading"
            className="font-serif text-[24px] sm:text-[28px] font-normal tracking-tight text-[#1C1917] leading-tight mb-1.5"
          >
            What stood out to you?
          </h1>
          <p
            id="rf-experience-subheading"
            className="text-[#57534E] text-[14px] leading-normal"
          >
            Pick whatever matched your experience.
          </p>
        </div>

        {/* Chips / Cards Grid */}
        <div id="rf-standout-chips-grid" className="flex flex-wrap gap-2 mb-4">
          {STANDOUT_OPTIONS.map((item) => {
            const isSelected = standouts.includes(item);
            return (
              <button
                key={item}
                id={`rf-chip-${item.toLowerCase().replace(/\s+/g, '-')}`}
                type="button"
                onClick={() => toggleOption(item)}
                className={`px-3.5 py-2.5 rounded-xl border text-[13px] font-medium tracking-wide transition-all duration-150 flex items-center gap-1.5 active:scale-95 whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#1C1917] border-[#1C1917] text-[#FAF8F5] shadow-xs'
                    : 'bg-[#FAF8F5] border-[#E5DFD5] text-[#44403C] hover:border-[#D1C7BA] hover:bg-[#F6F2EC]'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                <span>{item}</span>
              </button>
            );
          })}
        </div>

        {/* "OTHER" optional text field */}
        <AnimatePresence>
          {isOtherSelected && (
            <motion.div
              id="rf-other-field"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mt-3 mb-4"
            >
              <div className="p-3.5 rounded-2xl bg-[#F7F3EC] border border-[#E5DFD5]">
                <label
                  htmlFor="rf-other-notes-input"
                  className="block text-[12px] font-semibold text-[#57534E] uppercase tracking-wider mb-1.5"
                >
                  Anything else you’d like to mention?
                </label>
                <textarea
                  id="rf-other-notes-input"
                  rows={2}
                  value={otherNotes}
                  onChange={(e) => handleNotesChange(e.target.value)}
                  placeholder="Optional note in your own words..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#D9CFC2] text-[#1C1917] placeholder:text-[#A8A29E] text-[14px] focus:outline-none focus:ring-1 focus:ring-[#8C7A6B] focus:border-[#8C7A6B] resize-none"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-[12px] text-[#A8A29E] mt-2">
          Your answers are only used to help phrase your personal review.
        </p>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="pt-4 border-t border-[#EDE7DD]/80">
        <button
          id="rf-experience-submit-btn"
          type="button"
          onClick={handleFinish}
          className="w-full py-4 px-6 rounded-2xl bg-[#1C1917] hover:bg-[#2E2A27] text-[#FAF8F5] text-[15px] font-medium tracking-wide shadow-sm active:scale-[0.99] transition-all flex items-center justify-center gap-2"
        >
          <span>Put into words</span>
        </button>
      </div>
    </motion.div>
  );
};
