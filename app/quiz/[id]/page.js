'use client';
import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import lessonsData from '@/data/lessons.json';
import QuestionCard from '@/components/QuestionCard';

export default function QuizPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const lesson = lessonsData.lessons.find((l) => l.id === id);
  const questions = lesson?.quiz || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  if (!lesson || questions.length === 0) {
    return (
      <div className="text-center py-24 text-slate-500 text-lg font-semibold">
        لا توجد أسئلة لهذا الدرس
      </div>
    );
  }

  const isLast = currentIndex === questions.length - 1;

  const handleSelect = (index) => setSelectedAnswer(index);

  const handleNext = () => {
    const newAnswers = [...answers, selectedAnswer];

    if (isLast) {
      let score = 0;
      newAnswers.forEach((ans, i) => {
        if (ans === questions[i].answer) score++;
      });

      sessionStorage.setItem(`result_${lesson.id}`, JSON.stringify({ score, total: questions.length }));
      router.push(`/result/${lesson.id}`);
    } else {
      setAnswers(newAnswers);
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-cairo text-2xl md:text-3xl font-bold text-slate-800 text-center mb-7">
        اختبار: {lesson.title}
      </h1>

      <QuestionCard
        question={questions[currentIndex]}
        questionNumber={currentIndex + 1}
        totalQuestions={questions.length}
        selectedAnswer={selectedAnswer}
        onSelect={handleSelect}
      />

      <div className="text-center mt-6">
        <button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className="bg-gradient-to-l from-blue-700 to-violet-600 hover:opacity-95 disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed text-white font-bold py-3.5 px-11 rounded-2xl text-lg shadow-lg shadow-blue-300/40"
        >
          {isLast ? 'إنهاء الاختبار ✅' : 'التالي ←'}
        </button>
      </div>
    </div>
  );
}
