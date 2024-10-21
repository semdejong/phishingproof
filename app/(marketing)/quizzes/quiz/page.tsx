"use client"
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

// Define the types for the quiz question structure
interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    question: "Which of the following is a sign of a phishing email?",
    options: [
      "Unusual attachments",
      "Urgent language or threats",
      "A legitimate company name but a suspicious email address",
      "All of the above"
    ],
    answer: "All of the above",
  },
  {
    question: "If an email asks you to reset your password through a provided link, what should you do?",
    options: [
      "Click the link immediately to reset the password",
      "Ignore the email",
      "Verify the request by contacting the company directly using known contact methods",
      "Reply to the email for clarification"
    ],
    answer: "Verify the request by contacting the company directly using known contact methods",
  },
  {
    question: "What is the best way to protect yourself from phishing attacks?",
    options: [
      "Use two-factor authentication (2FA) wherever possible",
      "Ignore all emails from unknown senders",
      "Only use one strong password for all accounts",
      "Install antivirus software"
    ],
    answer: "Use two-factor authentication (2FA) wherever possible",
  },
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleAnswerOptionClick = (option: string) => {
    if (option === quizQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption("");
    } else {
      setShowScore(true);
    }
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  

  return (
    <>
      <div className="quiz-container flex h-auto flex-col items-center justify-center space-y-8  p-8">

        {showScore ? (
          <div className="score-section text-center text-2xl font-semibold">
            You scored {score} out of {quizQuestions.length}.{' '}
            {score === quizQuestions.length
              ? 'Great job! You are phishing aware.'
              : 'Keep learning to protect yourself from phishing.'}
          </div>
        ) : (
          <span className='rounded-lg bg-gray-100 p-16 my-10'>
            {/* Title Section */}
            <div className="w-full text-left">
                    <h1 className="text-4xl font-bold">Quiz #1</h1> {/* Title added here */}
            </div>
            <div className="question-section space-y-4 text-center">
              <div className="question-count text-xl font-medium my-8">
                <span>Question {currentQuestion + 1}</span>/{quizQuestions.length}
              </div>
              <div className="question-text text-2xl font-semibold">
                {quizQuestions[currentQuestion].question}
              </div>
            </div>
  
            <div className="answer-section my-10">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <label key={index} className="block text-xl my-4">
                  <input
                    className="mr-2"
                    type="radio"
                    name="answer"
                    value={option}
                    checked={selectedOption === option}
                    onChange={handleOptionChange}
                  />
                  {option}
                </label>
              ))}
            </div>
            <div className="flex justify-center my-10">
              <button
                className=" align-items: center rounded-full bg-[#ff4545] px-8 py-5 text-lg font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:bg-[#8d3b3b] disabled:opacity-50"
                onClick={() => handleAnswerOptionClick(selectedOption)}
                disabled={!selectedOption}
              >
                Submit Choice
              </button>
            </div>
          </span>
        )}
      </div>
    </>
  );
}

