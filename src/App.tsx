import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { ScreenStep } from './types';
import { Header } from './components/Header';
import { ScreenWelcome } from './components/ScreenWelcome';
import { ScreenService } from './components/ScreenService';
import { ScreenRating } from './components/ScreenRating';
import { ScreenExperience } from './components/ScreenExperience';
import { ScreenGenerating } from './components/ScreenGenerating';
import { ScreenReviewReady } from './components/ScreenReviewReady';
import { ScreenThankYou } from './components/ScreenThankYou';
import { generateCustomerReview } from './utils/reviewGenerator';

export default function App() {
  const [currentStep, setCurrentStep] = useState<ScreenStep>('welcome');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [customService, setCustomService] = useState<string>('');
  const [rating, setRating] = useState<number | null>(null);
  const [standouts, setStandouts] = useState<string[]>([]);
  const [otherNotes, setOtherNotes] = useState<string>('');
  const [generatedReview, setGeneratedReview] = useState<string>('');
  const [variationIndex, setVariationIndex] = useState<number>(0);
  const [userHasManuallyEdited, setUserHasManuallyEdited] = useState<boolean>(false);

  // Generate review based on current state
  const handleTriggerGeneration = () => {
    setCurrentStep('generating');
  };

  const handleGenerationComplete = () => {
    if (!userHasManuallyEdited || !generatedReview) {
      const review = generateCustomerReview({
        services: selectedServices,
        customService,
        rating: rating || 5,
        standouts,
        otherNotes,
        variation: variationIndex,
      });
      setGeneratedReview(review);
    }
    setCurrentStep('review-ready');
  };

  const handleCycleVariation = () => {
    const nextVar = variationIndex + 1;
    setVariationIndex(nextVar);
    const updated = generateCustomerReview({
      services: selectedServices,
      customService,
      rating: rating || 5,
      standouts,
      otherNotes,
      variation: nextVar,
    });
    setGeneratedReview(updated);
    setUserHasManuallyEdited(false);
  };

  const handleSaveEdit = (newText: string) => {
    setGeneratedReview(newText);
    setUserHasManuallyEdited(true);
  };

  const handleRestart = () => {
    setSelectedServices([]);
    setCustomService('');
    setRating(null);
    setStandouts([]);
    setOtherNotes('');
    setGeneratedReview('');
    setVariationIndex(0);
    setUserHasManuallyEdited(false);
    setCurrentStep('welcome');
  };

  const handleBack = () => {
    if (currentStep === 'service') {
      setCurrentStep('welcome');
    } else if (currentStep === 'rating') {
      setCurrentStep('service');
    } else if (currentStep === 'experience') {
      setCurrentStep('rating');
    } else if (currentStep === 'review-ready') {
      setCurrentStep('experience');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col justify-between selection:bg-[#E5DFD5]">
      {/* Centered Mobile Container */}
      <div className="w-full max-w-[420px] mx-auto min-h-screen flex flex-col justify-between bg-[#FAF8F5] border-x border-[#EDE8E0] shadow-sm">
        {/* Top Header */}
        <Header currentStep={currentStep} onBack={handleBack} />

        {/* Dynamic Screen Transitions */}
        <main className="flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            {currentStep === 'welcome' && (
              <ScreenWelcome
                key="welcome"
                onStart={() => setCurrentStep('service')}
              />
            )}

            {currentStep === 'service' && (
              <ScreenService
                key="service"
                selectedServices={selectedServices}
                customService={customService}
                onUpdateServices={(services, custom) => {
                  setSelectedServices(services);
                  setCustomService(custom);
                  setUserHasManuallyEdited(false);
                }}
                onContinue={() => setCurrentStep('rating')}
              />
            )}

            {currentStep === 'rating' && (
              <ScreenRating
                key="rating"
                rating={rating}
                onSelectRating={(newRating) => {
                  setRating(newRating);
                  setUserHasManuallyEdited(false);
                }}
                onContinue={() => setCurrentStep('experience')}
              />
            )}

            {currentStep === 'experience' && (
              <ScreenExperience
                key="experience"
                standouts={standouts}
                otherNotes={otherNotes}
                onUpdateExperience={(newStandouts, notes) => {
                  setStandouts(newStandouts);
                  setOtherNotes(notes);
                  setUserHasManuallyEdited(false);
                }}
                onSubmit={handleTriggerGeneration}
              />
            )}

            {currentStep === 'generating' && (
              <ScreenGenerating
                key="generating"
                onComplete={handleGenerationComplete}
              />
            )}

            {currentStep === 'review-ready' && (
              <ScreenReviewReady
                key="review-ready"
                rating={rating || 5}
                reviewText={generatedReview}
                onSaveEdit={handleSaveEdit}
                onCycleVariation={handleCycleVariation}
                onContinueToThankYou={() => setCurrentStep('thank-you')}
              />
            )}

            {currentStep === 'thank-you' && (
              <ScreenThankYou key="thank-you" onRestart={handleRestart} />
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
