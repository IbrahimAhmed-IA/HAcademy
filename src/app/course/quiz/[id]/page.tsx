import CourseQuiz from '@/components/CourseQuiz';

interface QuizPageProps {
  params: {
    id: string;
  };
}

export default function QuizPage({ params }: QuizPageProps) {
  const levelId = parseInt(params.id);

  return <CourseQuiz levelId={levelId} />;
} 