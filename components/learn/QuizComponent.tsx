"use client";

import React, { useState } from 'react';
import { CheckCircle2, XCircle, ChevronRight, Trophy, RotateCcw } from 'lucide-react';

export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation?: string;
};

export default function QuizComponent({ questions }: { questions: QuizQuestion[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!questions || questions.length === 0) return null;

  const currentQ = questions[currentIndex];

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === currentQ.correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const passPercentage = (score / questions.length) * 100;
    const isPass = passPercentage >= 80;

    return (
      <div className="bg-white border border-slate-200 rounded-xl p-8 text-center my-8 shadow-sm">
        <div className="flex justify-center mb-6">
          <div className={`p-4 rounded-full ${isPass ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
            <Trophy className="w-12 h-12" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          {isPass ? 'Congratulations!' : 'Keep Practicing!'}
        </h3>
        <p className="text-slate-600 mb-6">
          You scored <span className="font-bold text-slate-900">{score}</span> out of <span className="font-bold text-slate-900">{questions.length}</span> ({passPercentage}%)
        </p>
        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 my-8 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-900">Question {currentIndex + 1} of {questions.length}</h3>
        <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          Score: {score}
        </span>
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-semibold text-slate-800 mb-6 leading-relaxed">
          {currentQ.question}
        </h4>

        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all ";
            
            if (!isSubmitted) {
              btnClass += selectedOption === idx 
                ? "border-indigo-600 bg-indigo-50 text-indigo-700 font-medium" 
                : "border-slate-200 hover:border-indigo-200 hover:bg-slate-50 text-slate-700";
            } else {
              if (idx === currentQ.correctAnswerIndex) {
                btnClass += "border-emerald-500 bg-emerald-50 text-emerald-700 font-medium";
              } else if (idx === selectedOption) {
                btnClass += "border-red-500 bg-red-50 text-red-700";
              } else {
                btnClass += "border-slate-200 opacity-50";
              }
            }

            return (
              <button
                key={idx}
                disabled={isSubmitted}
                onClick={() => setSelectedOption(idx)}
                className={btnClass}
              >
                <div className="flex items-center justify-between">
                  <span>{opt}</span>
                  {isSubmitted && idx === currentQ.correctAnswerIndex && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                  {isSubmitted && idx === selectedOption && idx !== currentQ.correctAnswerIndex && <XCircle className="w-5 h-5 text-red-500" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {isSubmitted && currentQ.explanation && (
        <div className={`p-4 rounded-lg mb-6 ${selectedOption === currentQ.correctAnswerIndex ? 'bg-emerald-50 border border-emerald-100' : 'bg-amber-50 border border-amber-100'}`}>
          <p className="text-sm font-medium text-slate-800 mb-1">Explanation:</p>
          <p className="text-sm text-slate-600 leading-relaxed">{currentQ.explanation}</p>
        </div>
      )}

      <div className="flex justify-end pt-4 border-t border-slate-100">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
          >
            {currentIndex < questions.length - 1 ? 'Next Question' : 'View Results'}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
