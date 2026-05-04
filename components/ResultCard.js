import Link from 'next/link';

export default function ResultCard({ score, total, lessonId, lessonTitle, nextLessonId }) {
  const percentage = Math.round((score / total) * 100);
  const isPassed = percentage >= 60;
  let message = '';
  let color = '';

  if (percentage >= 80) {
    message = 'ممتاز! أنت متقن لهذا الدرس 🎉';
    color = 'text-green-600';
  } else if (percentage >= 60) {
    message = 'جيد! يمكنك المراجعة مرة أخرى 👍';
    color = 'text-yellow-600';
  } else {
    message = 'راجع الدرس وحاول مرة أخرى 💪';
    color = 'text-red-500';
  }

  return (
    <div className="bg-white/90 rounded-3xl border border-white/70 shadow-2xl p-8 max-w-md mx-auto text-center backdrop-blur-sm">
      <h2 className="font-cairo text-2xl md:text-3xl font-bold text-slate-800 mb-2">نتيجتك</h2>
      <p className="text-slate-500 text-sm mb-7">{lessonTitle}</p>

      <div
        className="text-6xl font-bold mb-3 font-cairo"
        style={{ color: isPassed ? '#16a34a' : '#dc2626' }}
      >
        {percentage}%
      </div>
      <p className="text-slate-600 mb-1">
        أجبت على <span className="font-bold text-blue-700">{score}</span> من{' '}
        <span className="font-bold">{total}</span> سؤال
      </p>
      <p className={`font-bold text-lg my-4 ${color}`}>{message}</p>

      <div className="flex flex-col gap-3 mt-6">
        {isPassed ? (
          nextLessonId ? (
            <Link
              href={`/lessons/${nextLessonId}`}
              className="bg-gradient-to-l from-emerald-600 to-teal-500 text-white font-bold py-3 px-6 rounded-2xl shadow-md"
            >
              الانتقال للدرس التالي ⏭️
            </Link>
          ) : (
            <Link
              href="/lessons"
              className="bg-gradient-to-l from-emerald-600 to-teal-500 text-white font-bold py-3 px-6 rounded-2xl shadow-md"
            >
              إنهاء المسار والعودة للدروس ✅
            </Link>
          )
        ) : (
          <Link
            href={`/lessons/${lessonId}`}
            className="bg-gradient-to-l from-amber-500 to-orange-500 text-white font-bold py-3 px-6 rounded-2xl shadow-md"
          >
            مراجعة الدرس الحالي 📘
          </Link>
        )}

        <Link
          href={`/quiz/${lessonId}`}
          className="bg-gradient-to-l from-blue-700 to-violet-600 text-white font-bold py-3 px-6 rounded-2xl shadow-md"
        >
          إعادة الاختبار 🔄
        </Link>
        <Link
          href="/lessons"
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-2xl"
        >
          العودة للدروس
        </Link>
      </div>
    </div>
  );
}
