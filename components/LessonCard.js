import Link from 'next/link';

export default function LessonCard({ lesson }) {
  return (
    <div className="group relative overflow-hidden bg-white/85 rounded-3xl shadow-lg hover:shadow-2xl p-6 border border-white/70 backdrop-blur-sm transition-all hover:-translate-y-1">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-blue-700 to-violet-600" />
      <h2 className="font-cairo text-xl font-bold text-slate-800 mb-2 leading-snug">{lesson.title}</h2>
      <p className="text-slate-500 text-sm mb-5 leading-relaxed min-h-12">{lesson.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-violet-700 font-bold bg-violet-50 px-3 py-1 rounded-full">
          {lesson.quiz?.length || 0} سؤال
        </span>
        <Link
          href={`/lessons/${lesson.id}`}
          className="bg-gradient-to-l from-blue-700 to-violet-600 text-white text-sm font-bold py-2.5 px-5 rounded-xl shadow-md group-hover:shadow-lg"
        >
          عرض الدرس
        </Link>
      </div>
    </div>
  );
}
