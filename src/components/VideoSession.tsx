'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ESPENCourse } from '@/data/courseData';

interface VideoSessionProps {
  sessionId: number;
  levelId: number;
}

export default function VideoSession({ sessionId, levelId }: VideoSessionProps) {
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const level = ESPENCourse.levels[levelId - 1];
  const session = level.sessions[sessionId - 1];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check if user has access to this session
    const completedSessions = JSON.parse(localStorage.getItem('completedSessions') || '[]');
    
    // Allow access to first session or if previous session is completed
    if (sessionId > 1 && !completedSessions.includes(sessionId - 1)) {
      router.push('/course');
      return;
    }

    // Check if session is already completed
    if (completedSessions.includes(sessionId)) {
      setIsComplete(true);
    }

    // Calculate progress
    const totalSessions = level.sessions.length;
    const completedCount = completedSessions.filter((id: number) => 
      level.sessions.some(s => s.id === id)
    ).length;
    setProgress((completedCount / totalSessions) * 100);
  }, [sessionId, router, level]);

  const handleVideoComplete = () => {
    if (typeof window === 'undefined') return;
    
    setIsComplete(true);
    
    // Update completed sessions
    const completedSessions = JSON.parse(localStorage.getItem('completedSessions') || '[]');
    if (!completedSessions.includes(sessionId)) {
      completedSessions.push(sessionId);
      localStorage.setItem('completedSessions', JSON.stringify(completedSessions));
      
      // Update progress
      const totalSessions = level.sessions.length;
      const completedCount = completedSessions.filter((id: number) => 
        level.sessions.some(s => s.id === id)
      ).length;
      setProgress((completedCount / totalSessions) * 100);
    }
  };

  const handleContinue = () => {
    if (sessionId < level.sessions.length) {
      router.push(`/course/session/${sessionId + 1}`);
    } else {
      router.push('/course');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-800">{session.title}</h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Level {levelId}</span>
                <span className="text-sm text-gray-500">Session {sessionId}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Watch the entire video to mark this session as complete</span>
              </div>
              <div className="flex items-center">
                <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                  <div 
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>

          {/* Video Player */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="w-full" style={{ height: '80vh' }}>
              <iframe
                src={`https://www.youtube.com/embed/${session.videoUrl.split('v=')[1]?.split('&')[0]}`}
                title={session.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>

          {/* Action Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {isComplete ? (
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Session Completed!</h2>
                  <p className="text-gray-600">Great job! You've completed this session.</p>
                </div>
                <button
                  onClick={handleContinue}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center mx-auto"
                >
                  <span className="text-lg font-medium">
                    {sessionId < level.sessions.length ? 'Continue to Next Session' : 'Return to Course'}
                  </span>
                  <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Mark as Complete</h2>
                  <p className="text-gray-600">Click the button below after watching the entire video</p>
                </div>
                <button
                  onClick={handleVideoComplete}
                  className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center justify-center mx-auto"
                >
                  <span className="text-lg font-medium">Mark Session as Complete</span>
                  <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={() => router.push('/course')}
              className="text-gray-600 hover:text-gray-800 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Course
            </button>
            {sessionId > 1 && (
              <button
                onClick={() => router.push(`/course/session/${sessionId - 1}`)}
                className="text-gray-600 hover:text-gray-800 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous Session
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 