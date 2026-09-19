import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star,
  Copy,
  Check,
  Edit3,
  ExternalLink,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface ScreenReviewReadyProps {
  rating: number;
  reviewText: string;
  onSaveEdit: (newText: string) => void;
  onCycleVariation: () => void;
  onContinueToThankYou: () => void;
}

export const ScreenReviewReady: React.FC<ScreenReviewReadyProps> = ({
  rating,
  reviewText,
  onSaveEdit,
  onCycleVariation,
  onContinueToThankYou,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDraft, setEditedDraft] = useState(reviewText);
  const [hasCopied, setHasCopied] = useState(false);
  const [copyToast, setCopyToast] = useState(false);
  const [clipboardError, setClipboardError] = useState(false);

  const handleStartEdit = () => {
    setEditedDraft(reviewText);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editedDraft.trim()) {
      onSaveEdit(editedDraft.trim());
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedDraft(reviewText);
    setIsEditing(false);
  };

  const handleCopyReview = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(reviewText);
      } else {
        // Fallback for iframe restrictions
        const textArea = document.createElement('textarea');
        textArea.value = reviewText;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setHasCopied(true);
      setCopyToast(true);
      setClipboardError(false);
      setTimeout(() => setCopyToast(false), 3500);
    } catch {
      // If clipboard permission is strictly blocked in environment
      setClipboardError(true);
      setHasCopied(true);
    }
  };

  const handleOpenGoogle = () => {
    window.open(SALON_INFO.reviewUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      id="rf-screen-review-ready"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col justify-between flex-1 px-5 pt-4 pb-8 max-w-md mx-auto w-full"
    >
      <div>
        {/* Step Headings */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <h1
              id="rf-ready-heading"
              className="font-serif text-[24px] sm:text-[28px] font-normal tracking-tight text-[#1C1917] leading-tight"
            >
              Your review is ready ✨
            </h1>
          </div>
          <p
            id="rf-ready-subheading"
            className="text-[#57534E] text-[14px] leading-normal"
          >
            Take a quick look before sharing it.
          </p>
        </div>

        {/* Copy success toast notification */}
        <AnimatePresence>
          {copyToast && (
            <motion.div
              id="rf-copy-toast"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-3 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] flex items-center justify-between gap-2 shadow-xs"
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#10B981] text-white flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="text-[13px] font-medium">
                  Your review is copied.
                </span>
              </div>
              <span className="text-[11px] text-[#047857] font-medium">Ready to paste</span>
            </motion.div>
          )}
        </AnimatePresence>

        {clipboardError && (
          <div
            id="rf-clipboard-fallback"
            className="mb-4 p-3 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] text-[13px]"
          >
            Your review is ready to copy. Please select and copy the text below if automatic copy was restricted by your browser.
          </div>
        )}

        {/* Review Card or Edit Area */}
        <AnimatePresence mode="wait">
          {!isEditing ? (
            <motion.div
              key="view-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-5 sm:p-6 rounded-3xl bg-[#FAF8F5] border border-[#E5DFD5] shadow-sm mb-4 relative"
            >
              {/* Star Rating Display matching customer's rating */}
              <div className="flex items-center justify-between mb-3.5 pb-3 border-b border-[#EFE9E0]">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= rating
                          ? 'fill-[#9C826B] text-[#9C826B]'
                          : 'fill-transparent text-[#E5DFD5]'
                      }`}
                      strokeWidth={1.5}
                    />
                  ))}
                  <span className="text-[12px] font-medium text-[#78716C] ml-1.5">
                    {rating} / 5
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onCycleVariation}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-[#8C7A6B] hover:text-[#57534E] px-2 py-1 rounded-md hover:bg-[#F2ECE4] transition-colors"
                  title="Try another natural phrasing based on your inputs"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Rephrase</span>
                </button>
              </div>

              {/* Review Text */}
              <p
                id="rf-generated-review-text"
                className="text-[15px] sm:text-[16px] text-[#1C1917] leading-[1.65] font-normal select-text"
              >
                “{reviewText}”
              </p>

              <div className="mt-4 pt-3 border-t border-[#EFE9E0] flex items-center justify-between text-[11px] text-[#A8A29E]">
                <span>Ira Unisex Salon, Mumbai</span>
                <span>Ready for Google</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="edit-area"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              id="rf-editable-review-area"
              className="p-5 rounded-3xl bg-[#FAF8F5] border border-[#8C7A6B] shadow-sm mb-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-semibold text-[#57534E] uppercase tracking-wider">
                  Edit your review
                </span>
                <span className="text-[11px] text-[#78716C]">
                  {editedDraft.length} characters
                </span>
              </div>

              <textarea
                id="rf-edit-review-textarea"
                rows={5}
                value={editedDraft}
                onChange={(e) => setEditedDraft(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-white border border-[#D9CFC2] text-[#1C1917] text-[15px] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#8C7A6B]/50 resize-none mb-3"
                autoFocus
              />

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  id="rf-cancel-edit-btn"
                  onClick={handleCancelEdit}
                  className="px-4 py-2.5 rounded-xl border border-[#D9CFC2] text-[#57534E] text-[13px] font-medium hover:bg-[#F4EFEA] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  id="rf-save-changes-btn"
                  onClick={handleSaveEdit}
                  className="px-5 py-2.5 rounded-xl bg-[#1C1917] text-[#FAF8F5] text-[13px] font-medium tracking-wide hover:bg-[#2E2A27] transition-colors"
                >
                  SAVE CHANGES
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons: EDIT REVIEW & COPY REVIEW */}
        {!isEditing && (
          <div className="flex items-center gap-2.5 mb-6">
            <button
              id="rf-edit-review-btn"
              type="button"
              onClick={handleStartEdit}
              className="flex-1 py-3.5 px-4 rounded-2xl border border-[#D6CCC0] bg-[#FAF8F5] hover:bg-[#F4EFEA] text-[#44403C] text-[14px] font-medium tracking-wide transition-all active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <Edit3 className="w-4 h-4 text-[#78716C]" />
              <span>EDIT REVIEW</span>
            </button>

            <button
              id="rf-copy-review-btn"
              type="button"
              onClick={handleCopyReview}
              className={`flex-[1.4] py-3.5 px-4 rounded-2xl text-[14px] font-medium tracking-wide transition-all active:scale-[0.99] flex items-center justify-center gap-2 shadow-xs ${
                hasCopied
                  ? 'bg-[#10B981] text-white hover:bg-[#059669]'
                  : 'bg-[#1C1917] text-[#FAF8F5] hover:bg-[#2E2A27]'
              }`}
            >
              {hasCopied ? (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>✓ REVIEW COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>COPY REVIEW</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Google Handoff Section */}
        {hasCopied && !isEditing && (
          <motion.div
            id="rf-google-handoff-section"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-5 rounded-3xl bg-[#F7F3EC] border border-[#E5DFD5] mb-4"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#EFE9DF] flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-[#8C7A6B]" />
              </div>
              <div>
                <h3
                  id="rf-google-heading"
                  className="text-[16px] font-semibold text-[#1C1917] leading-snug"
                >
                  Ready to share?
                </h3>
                <p
                  id="rf-google-subheading"
                  className="text-[#57534E] text-[13px] leading-relaxed mt-0.5"
                >
                  Open Google, paste your review, and submit when you’re ready.
                </p>
              </div>
            </div>

            <a
              id="rf-continue-to-google-btn"
              href={SALON_INFO.reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleOpenGoogle}
              className="w-full py-4 px-5 rounded-2xl bg-[#1C1917] hover:bg-[#2E2A27] text-[#FAF8F5] text-[15px] font-medium tracking-wide shadow-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
            >
              <span>CONTINUE TO GOOGLE →</span>
              <ExternalLink className="w-4 h-4 opacity-80" />
            </a>

            <div className="mt-3 text-center">
              <button
                type="button"
                id="rf-finish-handoff-btn"
                onClick={onContinueToThankYou}
                className="text-[13px] text-[#8C7A6B] hover:text-[#57534E] font-medium underline underline-offset-4 py-1"
              >
                I’ve posted on Google / Complete
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Reassurance Footer */}
      <div className="pt-2 text-center text-[11px] text-[#A8A29E]">
        Your review is never posted automatically. You paste and submit directly on Google.
      </div>
    </motion.div>
  );
};
