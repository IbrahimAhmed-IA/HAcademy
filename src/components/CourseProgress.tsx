'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ESPENCourse, Level, Session } from '@/data/courseData';

interface CourseProgress {
  currentLevel: number;
  currentSession: number;
  completedSessions: number[];
  quizAttempts: number;
  quizScore: number;
}

export default function CourseProgress() {
  const [progress, setProgress] = useState<CourseProgress>({
    currentLevel: 1,
    currentSession: 1,
    completedSessions: [],
    quizAttempts: 0,
    quizScore: 0
  });
  const [deviceId, setDeviceId] = useState('');
  const [completedCount, setCompletedCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const savedProgress = localStorage.getItem('courseProgress');
    if (savedProgress) {
      const parsedProgress = JSON.parse(savedProgress);
      // Ensure completedSessions is always an array
      if (!Array.isArray(parsedProgress.completedSessions)) {
        parsedProgress.completedSessions = [];
      }
      setProgress(parsedProgress);
    }

    // Get completed sessions count
    const completedSessions = JSON.parse(localStorage.getItem('completedSessions') || '[]');
    const currentLevelSessions = getCurrentLevel().sessions;
    const count = completedSessions.filter((id: number) => 
      currentLevelSessions.some(s => s.id === id)
    ).length;
    setCompletedCount(count);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Ensure we're saving a valid progress object
    const progressToSave = {
      ...progress,
      completedSessions: Array.isArray(progress.completedSessions) ? progress.completedSessions : []
    };
    localStorage.setItem('courseProgress', JSON.stringify(progressToSave));
  }, [progress]);

  useEffect(() => {
    // Get or generate device ID
    const storedDeviceId = localStorage.getItem('deviceId');
    if (storedDeviceId) {
      setDeviceId(storedDeviceId);
      checkAccess(storedDeviceId);
    } else {
      const newDeviceId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('deviceId', newDeviceId);
      setDeviceId(newDeviceId);
    }
  }, []);

  const checkAccess = async (id: string) => {
    try {
      const response = await fetch('/api/verify-code', {
        method: 'GET',
        headers: { 'x-device-id': id }
      });

      if (!response.ok) {
        router.push('/course-access');
      }
    } catch (error) {
      console.error('Error checking access:', error);
      router.push('/course-access');
    }
  };

  const getCurrentLevel = (): Level => {
    return ESPENCourse.levels[progress.currentLevel - 1];
  };

  const getCurrentSession = (): Session => {
    const level = getCurrentLevel();
    return level.sessions[progress.currentSession - 1];
  };

  const canAccessSession = (sessionId: number): boolean => {
    if (sessionId === 1) return true;
    if (typeof window === 'undefined') return false;
    const completedSessions = JSON.parse(localStorage.getItem('completedSessions') || '[]');
    // Check if the previous session is completed
    return completedSessions.includes(sessionId - 1);
  };

  const isLevelComplete = (): boolean => {
    if (typeof window === 'undefined') return false;
    const level = getCurrentLevel();
    const completedSessions = JSON.parse(localStorage.getItem('completedSessions') || '[]');
    // Check if all sessions in the current level are completed
    return level.sessions.every(session => completedSessions.includes(session.id));
  };

  const markSessionComplete = async (sessionId: number) => {
    if (typeof window === 'undefined') return;
    if (!progress.completedSessions.includes(sessionId)) {
      const newCompletedSessions = [...progress.completedSessions, sessionId];
      setProgress(prev => ({
        ...prev,
        completedSessions: newCompletedSessions,
        currentSession: sessionId + 1
      }));
    }
  };

  const handleQuizSubmit = async (answers: string[]) => {
    const level = getCurrentLevel();
    const correctAnswers = answers.filter((answer, index) => 
      answer === level.quiz[index].correctAnswer
    );
    const score = (correctAnswers.length / level.quiz.length) * 100;

    setProgress(prev => ({
      ...prev,
      quizAttempts: prev.quizAttempts + 1,
      quizScore: score
    }));

    if (score >= 50) {
      // Mark level as completed and passed
      const newLevel = progress.currentLevel + 1;
      setProgress(prev => ({
        ...prev,
        currentLevel: newLevel,
        currentSession: 1,
        completedSessions: [],
        quizAttempts: 0,
        quizScore: 0
      }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-800">{ESPENCourse.title}</h1>
          <div className="flex items-center text-gray-600 mb-6">
            <span className="mr-4">Level {progress.currentLevel}</span>
            <div className="h-2 w-48 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ 
                  width: `${(completedCount / getCurrentLevel().sessions.length) * 100}%` 
                }}
              />
            </div>
            <span className="ml-4">
              {completedCount} / {getCurrentLevel().sessions.length} Sessions
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getCurrentLevel().sessions.map((session) => (
            <div
              key={session.id}
              className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${
                canAccessSession(session.id)
                  ? 'border-2 border-green-500'
                  : 'border-2 border-gray-200'
              }`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{session.title}</h3>
                  {canAccessSession(session.id) && (
                    <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                      Available
                    </span>
                  )}
                </div>
                
                {canAccessSession(session.id) ? (
                  <button
                    onClick={() => router.push(`/course/session/${session.id}`)}
                    className="w-full mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
                  >
                    <span>Watch Session</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                ) : (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Complete previous session to unlock
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {typeof window !== 'undefined' && isLevelComplete() && (
          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Level Quiz</h2>
              {progress.quizAttempts > 0 && (
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
                  Previous Score: {progress.quizScore}%
                </span>
              )}
            </div>
            <p className="text-gray-600 mb-6">
              {progress.quizAttempts > 0
                ? 'You can retake the quiz to improve your score'
                : 'Complete the quiz to proceed to the next level'}
            </p>
            <button
              onClick={() => {
                const completedSessions = JSON.parse(localStorage.getItem('completedSessions') || '[]');
                if (completedSessions.length === getCurrentLevel().sessions.length) {
                  router.push(`/course/quiz/${progress.currentLevel}`);
                }
              }}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
            >
              <span className="text-lg font-medium">Take Quiz</span>
              <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 