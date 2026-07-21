'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Zap } from 'lucide-react';

interface StepperProps {
  currentStep: number;
}

const STEP_ROUTES: Record<number, string> = {
  1: '/pricing',
  2: '/checkout',
  3: '/checkout/payment',
  4: '/checkout/success',
};

export default function Stepper({ currentStep }: StepperProps) {
  const router = useRouter();

  const steps = [
    { number: 1, label: 'Plan' },
    { number: 2, label: 'Checkout' },
    { number: 3, label: 'Payment' },
    { number: 4, label: 'Success' },
  ];

  const handleStepClick = (stepNumber: number) => {
    // Only allow navigating to completed steps (not future steps, not current)
    if (stepNumber < currentStep) {
      router.push(STEP_ROUTES[stepNumber]);
    }
  };

  return (
    <div className="w-full flex items-center mb-10 pb-6 border-b border-[#E5E7EB] pt-4">
      {/* Brand Logo */}
      <div className="w-10 h-10 rounded-full bg-[#6D5EF8] flex items-center justify-center flex-shrink-0 mr-8 shadow-sm">
        <Zap className="w-5 h-5 text-white" />
      </div>

      {/* Steps */}
      <div className="flex-1 flex items-center max-w-2xl mx-auto">
        {steps.map((step, index) => {
          const isActive = step.number === currentStep;
          const isCompleted = step.number < currentStep;
          const isLast = index === steps.length - 1;
          const isClickable = isCompleted; // only past steps are clickable

          return (
            <React.Fragment key={step.number}>
              {/* Step Circle & Label */}
              <div className="flex flex-col items-center relative">
                <div
                  onClick={() => handleStepClick(step.number)}
                  title={isClickable ? `Go back to ${step.label}` : undefined}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-10 transition-all ${isActive
                    ? 'bg-[#6D5EF8] text-white border-2 border-[#6D5EF8] shadow-md shadow-[#6D5EF8]/30'
                    : isCompleted
                      ? 'bg-[#6D5EF8] text-white border-2 border-[#6D5EF8] cursor-pointer hover:bg-[#5A4DE0] hover:scale-110 hover:shadow-md hover:shadow-[#6D5EF8]/30'
                      : 'bg-white text-[#9CA3AF] border-2 border-[#E5E7EB] cursor-not-allowed'
                    }`}
                >
                  {step.number}
                </div>
                <span
                  className={`absolute top-10 text-[11px] sm:text-xs font-semibold whitespace-nowrap ${isActive || isCompleted ? 'text-[#111827]' : 'text-[#9CA3AF]'
                    }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connecting Line */}
              {!isLast && (
                <div className="flex-1 mx-2 sm:mx-4 relative h-0.5">
                  <div className="absolute inset-0 bg-[#E5E7EB] rounded-full"></div>
                  {isCompleted && (
                    <div className="absolute inset-0 bg-[#6D5EF8] rounded-full transition-all duration-500"></div>
                  )}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#6D5EF8] to-[#E5E7EB] rounded-full w-1/2"></div>
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
