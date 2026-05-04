'use client';

import { useState } from 'react';

export default function LessonImages({ images }) {
  const [failed, setFailed] = useState({});

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {images.map((src, i) => {
        const isFailed = failed[i];

        if (isFailed) {
          return (
            <div
              key={i}
              className="rounded-2xl min-h-40 w-full border border-slate-200 bg-slate-100 text-slate-500 flex items-center justify-center text-sm font-semibold"
            >
              تعذر تحميل الصورة
            </div>
          );
        }

        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src}
            alt={`صورة ${i + 1}`}
            className="rounded-2xl w-full object-cover shadow-lg border border-white/60 min-h-40"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setFailed((prev) => ({ ...prev, [i]: true }))}
          />
        );
      })}
    </div>
  );
}
