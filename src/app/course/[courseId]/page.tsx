'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import CourseAccess from '@/components/CourseAccess';
import CourseProgress from '@/components/CourseProgress';

export default function CoursePage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
      setLoading(false);
      return;
    }

    checkAccess(deviceId);
  }, [courseId]);

  const checkAccess = async (deviceId: string) => {
    try {
      const response = await fetch('/api/verify-code', {
        method: 'GET',
        headers: { 'x-device-id': deviceId }
      });

      if (response.ok) {
        setIsVerified(true);
      }
    } catch (error) {
      console.error('Error checking course access:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!isVerified) {
    return <CourseAccess />;
  }

  return <CourseProgress />;
} 