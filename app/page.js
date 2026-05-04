import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-[88vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl rounded-3xl border border-white/60 bg-white/75 backdrop-blur-xl shadow-2xl p-8 md:p-12 text-center">
        <span className="inline-flex rounded-full bg-blue-50 text-blue-700 font-bold text-sm px-4 py-2 mb-5">
          منصة تعليمية تفاعلية
        </span>
        <h1 className="font-cairo text-4xl md:text-6xl font-bold text-slate-800 mb-5 leading-tight">
          تعلم البرمجة بالعربي <span className="text-blue-700">بأسلوب حديث</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-9 leading-relaxed">
          دروس منظمة، محتوى مرئي، واختبارات ذكية لتثبيت مفاهيم البرمجة الكائنية بلغة C# خطوة بخطوة.
        </p>
        <Link
          href="/lessons"
          className="inline-flex items-center gap-2 bg-gradient-to-l from-blue-700 to-violet-600 hover:opacity-95 text-white font-bold py-3.5 px-9 rounded-2xl text-lg shadow-lg shadow-blue-300/50"
        >
          ابدأ التعلم الآن
          <span aria-hidden="true">←</span>
        </Link>
      </div>
    </div>
  );
}
