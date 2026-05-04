'use client';
import { use, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import lessonsData from '@/data/lessons.json';
import ResultCard from '@/components/ResultCard';

export default function ResultPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const lessonIndex = lessonsData.lessons.findIndex((l) => l.id === id);
  const lesson = lessonsData.lessons.find((l) => l.id === id);
  const nextLesson = lessonIndex >= 0 ? lessonsData.lessons[lessonIndex + 1] : null;

  const result = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const stored = sessionStorage.getItem(`result_${id}`);
    return stored ? JSON.parse(stored) : null;
  }, [id]);

  useEffect(() => {
    if (typeof window !== 'undefined' && !result) {
      router.push('/lessons');
    }
  }, [result, router]);

  if (!result || !lesson) return null;

  return (
    <div className="max-w-lg mx-auto px-4 py-20">
      <ResultCard
        score={result.score}
        total={result.total}
        lessonId={lesson.id}
        lessonTitle={lesson.title}
        nextLessonId={nextLesson?.id || null}
      />
    </div>
  );
}
