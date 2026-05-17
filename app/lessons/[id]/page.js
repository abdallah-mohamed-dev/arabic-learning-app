import { notFound } from "next/navigation";
import Link from "next/link";
import lessonsData from "@/data/lessons.json";
import LessonImages from "@/components/LessonImages";

export default async function LessonDetailPage({ params }) {
  const { id } = await params;
  const lesson = lessonsData.lessons.find((l) => l.id === id);
  if (!lesson) notFound();

  const hasImages = lesson.images && lesson.images.length > 0;
  const hasVideos = lesson.videos && lesson.videos.length > 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-cairo text-3xl md:text-4xl font-bold text-slate-800 mb-3">
        {lesson.title}
      </h1>
      <p className="text-slate-500 mb-8 text-lg">{lesson.description}</p>

      <div className="bg-white/90 rounded-3xl border border-white/70 shadow-xl p-7 mb-8 text-slate-700 leading-relaxed whitespace-pre-line backdrop-blur-sm">
        {lesson.content}
      </div>

      {hasImages && (
        <div className="mb-8">
          <h2 className="font-cairo text-2xl font-bold text-slate-800 mb-4">
            الصور التوضيحية
          </h2>
          <LessonImages images={lesson.images} />
        </div>
      )}

      {hasVideos && (
        <div className="mb-8">
          <h2 className="font-cairo text-2xl font-bold text-slate-800 mb-4">
            الفيديوهات
          </h2>
          <div className="flex flex-col gap-4">
            {lesson.videos?.map((url, i) => {
              const videoId = url.split("youtu.be/")[1]?.split("?")[0];

              return (
                <div
                  key={i}
                  className="aspect-video w-full overflow-hidden rounded-2xl"
                >
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={`YouTube video ${i + 1}`}
                    allowFullScreen
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      <Link
        href={`/quiz/${lesson.id}`}
        className="inline-block bg-gradient-to-l from-emerald-600 to-teal-500 text-white font-bold py-3.5 px-9 rounded-2xl text-lg shadow-lg shadow-emerald-300/50"
      >
        ابدأ الاختبار 📝
      </Link>
    </div>
  );
}
