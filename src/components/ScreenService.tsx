import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, AlertCircle } from 'lucide-react';
import { SALON_SERVICES } from '../data/salonData';

interface ScreenServiceProps {
  selectedServices: string[];
  customService: string;
  onUpdateServices: (services: string[], customService: string) => void;
  onContinue: () => void;
}

export const ScreenService: React.FC<ScreenServiceProps> = ({
  selectedServices,
  customService,
  onUpdateServices,
  onContinue,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toggleService = (label: string) => {
    setErrorMessage(null);
    let updated: string[];
    if (selectedServices.includes(label)) {
      updated = selectedServices.filter((s) => s !== label);
    } else {
      updated = [...selectedServices, label];
    }
    onUpdateServices(updated, customService);
  };

  const handleCustomTextChange = (val: string) => {
    onUpdateServices(selectedServices, val);
    if (errorMessage) setErrorMessage(null);
  };

  const handleContinue = () => {
    const isSomethingElseOnly =
      selectedServices.length === 1 && selectedServices.includes('Something else');

    if (
      selectedServices.length === 0 ||
      (isSomethingElseOnly && !customService.trim())
    ) {
      setErrorMessage('Choose at least one service to continue.');
      return;
    }
    setErrorMessage(null);
    onContinue();
  };

  const isSomethingElseSelected = selectedServices.includes('Something else');

  return (
    <motion.div
      id="rf-screen-service"
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
            id="rf-service-heading"
            className="font-serif text-[24px] sm:text-[28px] font-normal tracking-tight text-[#1C1917] leading-tight mb-1.5"
          >
            What did you get done today?
          </h1>
          <p
            id="rf-service-subheading"
            className="text-[#57534E] text-[14px] leading-normal"
          >
            Pick the service or services you actually had.
          </p>
        </div>

        {/* Validation error notification */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              id="rf-service-error"
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

        {/* Service Options List */}
        <div id="rf-service-list" className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
          {SALON_SERVICES.map((item) => {
            const isSelected = selectedServices.includes(item.label);
            return (
              <button
                key={item.id}
                id={`rf-service-btn-${item.id}`}
                type="button"
                onClick={() => toggleService(item.label)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between active:scale-[0.99] ${
                  isSelected
                    ? 'bg-[#1C1917] border-[#1C1917] text-[#FAF8F5] shadow-sm'
                    : 'bg-[#FAF8F5] border-[#E5DFD5] text-[#292524] hover:border-[#CFC4B5] hover:bg-[#F6F2EC]'
                }`}
              >
                <div className="flex flex-col pr-2">
                  <span className="text-[14px] font-medium leading-snug">
                    {item.label}
                  </span>
                  {item.category && !isSelected && (
                    <span className="text-[11px] text-[#8C7A6B] mt-0.5">
                      {item.category}
                    </span>
                  )}
                </div>

                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                    isSelected
                      ? 'bg-[#FAF8F5] text-[#1C1917] border-[#FAF8F5]'
                      : 'border-[#D6CCC0] bg-transparent'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Something else optional input */}
        <AnimatePresence>
          {isSomethingElseSelected && (
            <motion.div
              id="rf-custom-service-field"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mt-2 mb-4"
            >
              <div className="p-3.5 rounded-2xl bg-[#F7F3EC] border border-[#E5DFD5]">
                <label
                  htmlFor="rf-custom-service-input"
                  className="block text-[12px] font-semibold text-[#57534E] uppercase tracking-wider mb-1.5"
                >
                  Tell us what you had done
                </label>
                <input
                  id="rf-custom-service-input"
                  type="text"
                  value={customService}
                  onChange={(e) => handleCustomTextChange(e.target.value)}
                  placeholder="e.g. Keratin smoothing, beard trim, etc."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#D9CFC2] text-[#1C1917] placeholder:text-[#A8A29E] text-[14px] focus:outline-none focus:ring-1 focus:ring-[#8C7A6B] focus:border-[#8C7A6B]"
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="pt-4 border-t border-[#EDE7DD]/80">
        <button
          id="rf-service-continue-btn"
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
