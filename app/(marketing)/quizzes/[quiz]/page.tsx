"use client"
import { Quiz } from '@/types/quiz';
import { useParams } from 'next/navigation';
import React from 'react'

const quizData: Record<string, Quiz> = {
    PhishingQuiz1: {
        title: "Phishing Quiz 1",
        description: "Test your knowledge of phishing attacks.",
        questions: [
            {
                question: "What is phishing?",
                options: ["A type of fishing", "A type of scam", "A type of malware", "A type of hacking"],
                correctAnswer: 1,
            },
            {
                question: "What is the purpose of phishing?",
                options: ["To steal personal information", "To install malware", "To hack into a system", "To spread fake news"],
                correctAnswer: 0,
            },
        ],
    },
    VishingQuiz2: {
        title: "Vishing Quiz 2",
        description: "Test your knowledge of vishing attacks.",
        questions: [
            {
                question: "What is vishing?",
                options: ["A type of fishing", "A type of scam", "A type of malware", "A type of hacking"],
                correctAnswer: 1,
            },
            {
                question: "What is the purpose of vishing?",
                options: ["To steal personal information", "To install malware", "To hack into a system", "To spread fake news"],
                correctAnswer: 0,
            },
        ],
    },
};

export default function QuizPage() {
    
    // const { quiz } = useParams(); // Use useParams to get the dynamic route parameter
    // const quizDetails = quizData[quiz as string];

    // if (!quizDetails) {
    //     return <p>Quiz not found.</p>;
    // }
  return (
    <div>
      
    </div>
  )
}

