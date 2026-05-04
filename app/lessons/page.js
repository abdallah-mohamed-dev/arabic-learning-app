import lessonsData from '@/data/lessons.json';
import LessonCard from '@/components/LessonCard';

export default function LessonsPage() {
  const { lessons } = lessonsData;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="font-cairo text-3xl md:text-4xl font-bold text-slate-800 mb-2">الدروس المتاحة</h1>
        <p className="text-slate-500">اختر درسًا لتبدأ رحلة التعلم</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
}
