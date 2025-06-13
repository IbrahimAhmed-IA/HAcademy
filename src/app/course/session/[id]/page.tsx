import VideoSession from '@/components/VideoSession';

interface SessionPageProps {
  params: {
    id: string;
  };
}

export default function SessionPage({ params }: SessionPageProps) {
  const sessionId = parseInt(params.id);
  const levelId = 1; // Currently only have level 1

  return <VideoSession sessionId={sessionId} levelId={levelId} />;
} 