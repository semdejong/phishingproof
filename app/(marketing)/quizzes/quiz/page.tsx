"use client"

import React, { useState } from "react"
import Image from "next/image"

import { Icons } from "@/components/icons"

import ArticleBox from "../../components/ArticleBox"

// Define the types for the quiz question structure
interface QuizQuestion {
  question: string
  options: string[]
  answer: string
}

const quizQuestions: QuizQuestion[] = [
  {
    question: "Which of the following is a sign of a phishing email?",
    options: [
      "Unusual attachments",
      "Urgent language or threats",
      "A legitimate company name but a suspicious email address",
      "All of the above",
    ],
    answer: "All of the above",
  },
  {
    question:
      "If an email asks you to reset your password through a provided link, what should you do?",
    options: [
      "Click the link immediately to reset the password",
      "Ignore the email",
      "Verify the request by contacting the company directly using known contact methods",
      "Reply to the email for clarification",
    ],
    answer:
      "Verify the request by contacting the company directly using known contact methods",
  },
  {
    question: "What is the best way to protect yourself from phishing attacks?",
    options: [
      "Use two-factor authentication (2FA) wherever possible",
      "Ignore all emails from unknown senders",
      "Only use one strong password for all accounts",
      "Install antivirus software",
    ],
    answer: "Use two-factor authentication (2FA) wherever possible",
  },
]

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const [showScore, setShowScore] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<string>("")

  const handleAnswerOptionClick = (option: string) => {
    if (option === quizQuestions[currentQuestion].answer) {
      setScore(score + 1)
    }
    const nextQuestion = currentQuestion + 1
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion)
      setSelectedOption("")
    } else {
      setShowScore(true)
    }
  }

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value)
  }

  return (
    <>
      <div className="quiz-container flex h-auto flex-col items-center justify-center space-y-8 sm:p-8">
        {showScore ? (
          <div className="score-section text-center font-semibold ">
            <p className="hidden sm:block sm:text-4xl">
              You scored{" "}
              <span
                className={`${
                  score === quizQuestions.length
                    ? "text-green-500"
                    : "text-red-500"
                } `}
              >
                {score} out of {quizQuestions.length}
              </span>
              . {score === quizQuestions.length ? "Good job!" : "Try again!"}
            </p>

            {score === quizQuestions.length ? (
              <div className="flex flex-col items-center xl:flex-row">
                <div className="relative flex">
                  <Image
                    src={"/images/quizWin.svg"}
                    style={{ objectFit: "cover" }}
                    width={800}
                    height={100}
                    className="sm:pl-10"
                    alt="Quiz Loss"
                  />
                </div>
                <div className="max-w-4xl bg-slate-50 px-5 dark:bg-transparent lg:ml-2 lg:py-8">
                  <span className="sm:text-4xl">
                    You can read up on these following articles if you are
                    interested.
                  </span>
                  <div className="mt-5 flex flex-col space-y-4 sm:space-y-6 ">
                    {/* Render all articles related to this quiz */}
                    <ArticleBox />
                    <ArticleBox />
                    <ArticleBox />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center xl:flex-row">
                <div className="relative flex">
                  <Image
                    src={"/images/quizLoss.svg"}
                    style={{ objectFit: "cover" }}
                    width={800}
                    height={100}
                    className="sm:pl-10"
                    alt="Quiz Loss"
                  />
                </div>
                <div className="max-w-4xl bg-slate-50 px-5 dark:bg-transparent lg:ml-2 lg:pt-16">
                  <span className="sm:text-4xl">
                    You should read up on these following articles and retake
                    the quiz.
                  </span>
                  <div className="mt-5 flex flex-col space-y-4 sm:space-y-6 ">
                    {/* Render all articles related to this quiz */}
                    <ArticleBox />
                    <ArticleBox />
                    <ArticleBox />
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <span className="my-10 rounded-lg bg-slate-50 p-2 dark:bg-transparent sm:px-8 sm:pb-0 sm:pt-8">
              {/* Title Section */}
              <div className="flex w-full text-left">
                <h1 className="text-2xl font-bold sm:text-4xl">Quiz #1</h1>{" "}
                <div className="question-count ml-auto text-lg font-medium sm:text-xl">
                  <span>Question {currentQuestion + 1}</span>/
                  {quizQuestions.length}
                </div>
              </div>
              <div className="question-section space-y-4">
                <div className="question-text mt-6 text-lg font-semibold sm:mt-8 sm:text-2xl">
                  {quizQuestions[currentQuestion].question}
                </div>
              </div>

              <div className="answer-section relative my-4 sm:mb-10">
                <div className="absolute -left-64 top-40 z-10">
                  <Icons.fish className="z-0 hidden h-48 w-48 rotate-12 text-red-500 opacity-30 lg:flex lg:h-[200px] lg:w-[200px]" />
                </div>
                <div className="absolute z-10 -ml-2 hidden rotate-12  scale-x-[-1] lg:-bottom-10 lg:-right-80 lg:flex">
                  <Icons.deadFish className="z-0 h-48 w-48 text-red-500 opacity-30 lg:h-[250px] lg:w-[250px]" />
                </div>

                <div className="grid grid-cols-1 gap-x-4 gap-y-0 sm:grid-cols-2 ">
                  {quizQuestions[currentQuestion].options.map(
                    (option, index) => (
                      <div
                        key={index}
                        className={`my-4 block cursor-pointer rounded-lg border-2 p-4 text-base transition-all duration-300 ease-in-out dark:bg-transparent sm:text-xl xl:w-[580px] ${
                          selectedOption === option
                            ? "border-red-500 bg-red-500 text-white"
                            : "border-gray-300 bg-white hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800"
                        }`}
                        onClick={() => setSelectedOption(option)}
                      >
                        <input
                          className="mr-2 hidden"
                          type="radio"
                          name="answer"
                          value={option}
                          checked={selectedOption === option}
                          onChange={handleOptionChange} // Still needed to handle changes
                        />
                        {option}
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="my-4 flex justify-center sm:my-10">
                <button
                  className=" align-items: center rounded-full bg-[#ff4545] px-8 py-3.5 text-lg font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:bg-[#8d3b3b] disabled:opacity-50"
                  onClick={() => handleAnswerOptionClick(selectedOption)}
                  disabled={!selectedOption}
                >
                  Submit Choice
                </button>
              </div>
            </span>
            <div className="absolute z-10 -ml-2 hidden rotate-12  scale-x-[-1] lg:bottom-40 lg:right-96 lg:mr-56 lg:flex">
              <Icons.email className="z-0 h-48 w-48 text-red-500 opacity-30 lg:h-[125px] lg:w-[125px]" />
            </div>
          </>
        )}
      </div>
    </>
  )
}
