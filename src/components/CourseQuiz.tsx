'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ESPENCourse } from '@/data/courseData';

interface QuizProps {
  levelId: number;
}

export default function CourseQuiz({ levelId }: QuizProps) {
  const [answers, setAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const level = ESPENCourse.levels[levelId - 1];
  const quiz = level.quiz;

  useEffect(() => {
    // Check if user has completed all sessions
    const completedSessions = JSON.parse(localStorage.getItem('completedSessions') || '[]');
    const levelSessions = level.sessions;

    if (completedSessions.length < levelSessions.length) {
      router.push('/course');
    }
  }, [level, router]);

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const correctAnswers = answers.filter((answer, index) => 
      answer === quiz[index].correctAnswer
    );
    const score = (correctAnswers.length / quiz.length) * 100;

    // Update course progress
    const courseProgress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    courseProgress.quizAttempts = (courseProgress.quizAttempts || 0) + 1;
    courseProgress.quizScore = score;

    if (score >= 50) {
      // Mark level as completed and passed
      courseProgress.currentLevel = levelId + 1;
      courseProgress.currentSession = 1;
      courseProgress.completedSessions = [];
      courseProgress.quizAttempts = 0;
      courseProgress.quizScore = 0;
    }

    localStorage.setItem('courseProgress', JSON.stringify(courseProgress));

    if (score >= 50) {
      // Passed the quiz
      setTimeout(() => {
        router.push('/course');
      }, 2000);
    }
  };

  const getScore = () => {
    const correctAnswers = answers.filter((answer, index) => 
      answer === quiz[index].correctAnswer
    );
    return (correctAnswers.length / quiz.length) * 100;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Level {levelId} Quiz</h1>
          <p className="text-gray-600">Test your knowledge from the completed sessions</p>
        </div>

        <div className="space-y-6">
          {quiz.map((question, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center mb-4">
                <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-700 rounded-full font-semibold mr-3">
                  {index + 1}
                </span>
                <h3 className="text-lg font-medium text-gray-800">
                  {question.question}
                </h3>
              </div>
              <div className="space-y-3">
                {question.options.map((option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      submitted
                        ? option === question.correctAnswer
                          ? 'border-green-500 bg-green-50'
                          : answers[index] === option
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200'
                        : answers[index] === option
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={answers[index] === option}
                      onChange={() => handleAnswerSelect(index, option)}
                      disabled={submitted}
                      className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-gray-700">{option}</span>
                    {submitted && option === question.correctAnswer && (
                      <svg className="w-5 h-5 ml-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {!submitted ? (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={answers.length !== quiz.length}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <span className="text-lg font-medium">Submit Quiz</span>
              <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2">
                Your Score: {getScore()}%
              </h2>
              <div className="w-48 h-48 mx-auto relative">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#eee"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={getScore() >= 50 ? "#10B981" : "#EF4444"}
                    strokeWidth="3"
                    strokeDasharray={`${getScore()}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold">{getScore()}%</span>
                </div>
              </div>
            </div>
            
            {getScore() >= 50 ? (
              <div className="text-green-600">
                <p className="text-xl font-semibold mb-4">Congratulations! You passed the quiz!</p>
                <p className="text-gray-600">You'll be redirected to the next level shortly...</p>
              </div>
            ) : (
              <div>
                <p className="text-red-600 text-xl font-semibold mb-4">You need at least 50% to pass.</p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setAnswers([]);
                  }}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 