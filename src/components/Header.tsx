import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { ScreenStep } from '../types';

interface HeaderProps {
  currentStep: ScreenStep;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentStep, onBack }) => {
  // Determine step counter
  let stepNumber = 0;
  if (currentStep === 'service') stepNumber = 1;
  else if (currentStep === 'rating') stepNumber = 2;
  else if (currentStep === 'experience') stepNumber = 3;

  const showBack =
    onBack &&
    (currentStep === 'service' ||
      currentStep === 'rating' ||
      currentStep === 'experience' ||
      currentStep === 'review-ready');

  return (
    <header
      id="rf-header"
      className="w-full pt-4 pb-3 px-5 border-b border-[#EDE8E0] bg-[#FAF8F5]/90 backdrop-blur-md sticky top-0 z-30 transition-all"
    >
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          {showBack ? (
            <button
              id="rf-back-button"
              onClick={onBack}
              className="p-1.5 -ml-1.5 rounded-full text-[#57534E] hover:text-[#1C1917] hover:bg-[#F2ECE4] transition-colors active:scale-95"
              aria-label="Go back"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-2 h-2 rounded-full bg-[#8C7A6B]" />
          )}

          <div className="flex flex-col">
            <span
              id="rf-brand-name"
              className="font-serif tracking-[0.18em] text-[13px] font-semibold text-[#1C1917] uppercase"
            >
              Ira Unisex Salon
            </span>
            <span className="text-[10px] tracking-wider text-[#78716C] uppercase font-medium">
              Mumbai, India
            </span>
          </div>
        </div>

        {stepNumber > 0 ? (
          <div
            id="rf-step-indicator"
            className="flex items-center gap-2 bg-[#F2EDE5] px-2.5 py-1 rounded-full border border-[#E8E1D5]"
          >
            <span className="text-[11px] font-semibold tracking-wider text-[#57534E] uppercase">
              Step {stepNumber} of 3
            </span>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    num === stepNumber
                      ? 'w-3.5 bg-[#8C7A6B]'
                      : num < stepNumber
                        ? 'w-1.5 bg-[#A89F91]'
                        : 'w-1.5 bg-[#D9D1C5]'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-[11px] font-medium tracking-wide text-[#8C7A6B] bg-[#F4EFEA] px-2.5 py-1 rounded-full border border-[#E8E1D5]">
            ReviewFlow
          </div>
        )}
      </div>
    </header>
  );
};
