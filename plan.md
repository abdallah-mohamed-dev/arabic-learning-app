# 📋 plan.md — خطة التنفيذ الكاملة

> هذه الخطة مصممة ليتم تنفيذها حرفيًا بواسطة AI Agent.
> كل Task مستقل وواضح. نفّذها بالترتيب دون تخطي أي خطوة.

---

## 🗂️ بنية المشروع النهائية المطلوبة

```
arabic-learning-app/
├── app/
│   ├── layout.js
│   ├── globals.css
│   ├── page.js                          ← الصفحة الرئيسية
│   ├── lessons/
│   │   ├── page.js                      ← قائمة الدروس
│   │   └── [id]/
│   │       └── page.js                  ← تفاصيل الدرس
│   ├── quiz/
│   │   └── [id]/
│   │       └── page.js                  ← صفحة الاختبار
│   └── result/
│       └── [id]/
│           └── page.js                  ← صفحة النتيجة
├── components/
│   ├── Navbar.js
│   ├── LessonCard.js
│   ├── QuestionCard.js
│   └── ResultCard.js
├── data/
│   └── lessons.json
├── public/
│   └── images/
├── tailwind.config.js
└── package.json
```

---

## ✅ TASK 1 — إعداد `app/globals.css`

**الملف:** `app/globals.css`

**المحتوى المطلوب:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary: #1d4ed8;
  --color-secondary: #7c3aed;
  --color-accent: #f59e0b;
  --color-bg: #f8fafc;
  --color-text: #1e293b;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-tajawal), sans-serif;
}

h1, h2, h3 {
  font-family: var(--font-cairo), sans-serif;
}
```

---

## ✅ TASK 2 — إنشاء ملف البيانات `data/lessons.json`

**الملف:** `data/lessons.json`

**الهيكل المطلوب (انسخ الملف `lessons.json` المرفق في هذه الخطة):**

```json
{
  "lessons": [
    {
      "id": "oop-intro",
      "title": "...",
      "description": "...",
      "content": "...",
      "images": ["url1", "url2"],
      "videos": ["youtube_url"],
      "quiz": [
        {
          "id": 1,
          "question": "...",
          "options": ["أ", "ب", "ج", "د"],
          "answer": 0
        }
      ]
    }
  ]
}
```

> ⚠️ الحقول `images` و `videos` اختيارية. إذا كانت فارغة `[]` لا تُعرض أي عناصر.

---

## ✅ TASK 3 — إنشاء `app/layout.js`

**الملف:** `app/layout.js`

```js
import { Tajawal, Cairo } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-tajawal',
});

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '600', '700'],
  variable: '--font-cairo',
});

export const metadata = {
  title: 'تعلم البرمجة بالعربي',
  description: 'تطبيق تعليمي تفاعلي لتعلم البرمجة باللغة العربية',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.variable} ${cairo.variable} font-tajawal min-h-screen`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
```

---

## ✅ TASK 4 — إنشاء `components/Navbar.js`

**الملف:** `components/Navbar.js`

**المتطلبات:**
- شريط تنقل علوي
- يحتوي على: اسم التطبيق (يسار/يمين حسب RTL) + روابط: الرئيسية، الدروس
- استخدم `Link` من `next/link`
- تصميم: خلفية زرقاء داكنة، نص أبيض، responsive

```js
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const links = [
    { href: '/', label: 'الرئيسية' },
    { href: '/lessons', label: 'الدروس' },
  ];

  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <span className="font-cairo font-bold text-xl">تعلم البرمجة</span>
        <div className="flex gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium hover:text-yellow-300 transition-colors ${
                pathname === link.href ? 'text-yellow-300 underline' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
```

---

## ✅ TASK 5 — إنشاء الصفحة الرئيسية `app/page.js`

**الملف:** `app/page.js`

**المتطلبات:**
- عنوان ترحيبي كبير
- وصف مختصر للتطبيق
- زر "ابدأ التعلم" يوجه إلى `/lessons`
- تصميم جذاب ومتوسط الصفحة (hero section)

```js
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <h1 className="font-cairo text-4xl md:text-5xl font-bold text-blue-800 mb-4 leading-tight">
        تعلم البرمجة بالعربي 🚀
      </h1>
      <p className="text-lg text-slate-600 max-w-xl mb-8 leading-relaxed">
        دروس مبسطة وتفاعلية لتعلم مفاهيم البرمجة الكائنية بلغة C# من الصفر
      </p>
      <Link
        href="/lessons"
        className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-xl text-lg transition-colors shadow-lg"
      >
        ابدأ التعلم الآن
      </Link>
    </div>
  );
}
```

---

## ✅ TASK 6 — إنشاء `components/LessonCard.js`

**الملف:** `components/LessonCard.js`

**المتطلبات:**
- يستقبل props: `lesson` (object)
- يعرض: العنوان، الوصف، عدد الأسئلة
- زر "عرض الدرس" يوجه إلى `/lessons/[id]`

```js
import Link from 'next/link';

export default function LessonCard({ lesson }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 border border-slate-100">
      <h2 className="font-cairo text-xl font-bold text-blue-800 mb-2">{lesson.title}</h2>
      <p className="text-slate-500 text-sm mb-4 leading-relaxed">{lesson.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-purple-600 font-medium bg-purple-50 px-3 py-1 rounded-full">
          {lesson.quiz?.length || 0} سؤال
        </span>
        <Link
          href={`/lessons/${lesson.id}`}
          className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold py-2 px-5 rounded-lg transition-colors"
        >
          عرض الدرس
        </Link>
      </div>
    </div>
  );
}
```

---

## ✅ TASK 7 — إنشاء صفحة قائمة الدروس `app/lessons/page.js`

**الملف:** `app/lessons/page.js`

**المتطلبات:**
- قراءة البيانات من `data/lessons.json` مباشرة (Server Component)
- عرض شبكة من `LessonCard`
- عنوان الصفحة: "الدروس المتاحة"

```js
import lessonsData from '@/data/lessons.json';
import LessonCard from '@/components/LessonCard';

export default function LessonsPage() {
  const { lessons } = lessonsData;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="font-cairo text-3xl font-bold text-blue-800 mb-2">الدروس المتاحة</h1>
      <p className="text-slate-500 mb-8">اختر درسًا لتبدأ التعلم</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
}
```

---

## ✅ TASK 8 — إنشاء صفحة تفاصيل الدرس `app/lessons/[id]/page.js`

**الملف:** `app/lessons/[id]/page.js`

**المتطلبات:**
- Server Component
- قراءة `id` من params
- البحث عن الدرس في `lessons.json`
- إذا لم يوجد: عرض رسالة خطأ (notFound)
- عرض:
  - العنوان
  - المحتوى (نص طويل بـ `whitespace-pre-line`)
  - الصور: **فقط إذا كانت `images.length > 0`** — عرضها في grid
  - الفيديوهات: **فقط إذا كانت `videos.length > 0`** — عرضها كـ iframe أو رابط
  - زر "ابدأ الاختبار" يوجه إلى `/quiz/[id]`

```js
import { notFound } from 'next/navigation';
import Link from 'next/link';
import lessonsData from '@/data/lessons.json';

export default function LessonDetailPage({ params }) {
  const lesson = lessonsData.lessons.find((l) => l.id === params.id);
  if (!lesson) notFound();

  const hasImages = lesson.images && lesson.images.length > 0;
  const hasVideos = lesson.videos && lesson.videos.length > 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="font-cairo text-3xl font-bold text-blue-800 mb-3">{lesson.title}</h1>
      <p className="text-slate-500 mb-6">{lesson.description}</p>

      <div className="bg-white rounded-2xl shadow p-6 mb-6 text-slate-700 leading-relaxed whitespace-pre-line">
        {lesson.content}
      </div>

      {hasImages && (
        <div className="mb-6">
          <h2 className="font-cairo text-xl font-bold text-purple-700 mb-3">الصور التوضيحية</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {lesson.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`صورة ${i + 1}`}
                className="rounded-xl w-full object-cover shadow"
              />
            ))}
          </div>
        </div>
      )}

      {hasVideos && (
        <div className="mb-6">
          <h2 className="font-cairo text-xl font-bold text-purple-700 mb-3">الفيديوهات</h2>
          <div className="flex flex-col gap-4">
            {lesson.videos.map((url, i) => (
              <div key={i} className="aspect-video w-full">
                <iframe
                  src={url}
                  title={`فيديو ${i + 1}`}
                  className="w-full h-full rounded-xl shadow"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <Link
        href={`/quiz/${lesson.id}`}
        className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl text-lg transition-colors shadow"
      >
        ابدأ الاختبار 📝
      </Link>
    </div>
  );
}
```

---

## ✅ TASK 9 — إنشاء `components/QuestionCard.js`

**الملف:** `components/QuestionCard.js`

**المتطلبات:**
- يستقبل props:
  - `question` (object: {id, question, options, answer})
  - `questionNumber` (رقم السؤال الحالي)
  - `totalQuestions` (العدد الكلي)
  - `selectedAnswer` (null أو رقم)
  - `onSelect` (دالة تستقبل index الخيار)
- يعرض:
  - شريط تقدم (progress bar)
  - رقم السؤال
  - نص السؤال
  - قائمة الخيارات (زر لكل خيار)
  - تمييز الخيار المحدد

```js
export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelect,
}) {
  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
      <div className="mb-4">
        <div className="flex justify-between text-sm text-slate-500 mb-1">
          <span>السؤال {questionNumber} من {totalQuestions}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h2 className="font-cairo text-xl font-bold text-slate-800 mb-5 leading-relaxed">
        {question.question}
      </h2>

      <div className="flex flex-col gap-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`text-right py-3 px-5 rounded-xl border-2 font-medium transition-all text-sm
              ${
                selectedAnswer === index
                  ? 'border-blue-600 bg-blue-50 text-blue-800'
                  : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700'
              }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
```

---

## ✅ TASK 10 — إنشاء صفحة الاختبار `app/quiz/[id]/page.js`

**الملف:** `app/quiz/[id]/page.js`

**المتطلبات:**
- **Client Component** (`'use client'`)
- قراءة الدرس من `lessons.json` عبر `params.id`
- إدارة الحالة:
  - `currentIndex` — السؤال الحالي (يبدأ من 0)
  - `answers` — مصفوفة تخزن إجابة المستخدم لكل سؤال
  - `selectedAnswer` — الإجابة المختارة حاليًا (null أو رقم)
- منطق الاختبار:
  - عرض `QuestionCard`
  - زر "التالي": يُفعّل فقط إذا تم اختيار إجابة
  - في آخر سؤال: زر "إنهاء الاختبار"
  - عند الإنهاء: حساب النتيجة وحفظها في `sessionStorage` → توجيه إلى `/result/[id]`
- إذا لم توجد أسئلة: عرض رسالة

```js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import lessonsData from '@/data/lessons.json';
import QuestionCard from '@/components/QuestionCard';

export default function QuizPage({ params }) {
  const router = useRouter();
  const lesson = lessonsData.lessons.find((l) => l.id === params.id);
  const questions = lesson?.quiz || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  if (!lesson || questions.length === 0) {
    return (
      <div className="text-center py-20 text-slate-500">
        لا توجد أسئلة لهذا الدرس
      </div>
    );
  }

  const isLast = currentIndex === questions.length - 1;

  const handleSelect = (index) => setSelectedAnswer(index);

  const handleNext = () => {
    const newAnswers = [...answers, selectedAnswer];

    if (isLast) {
      // حساب النتيجة
      let score = 0;
      newAnswers.forEach((ans, i) => {
        if (ans === questions[i].answer) score++;
      });
      sessionStorage.setItem(
        `result_${lesson.id}`,
        JSON.stringify({ score, total: questions.length })
      );
      router.push(`/result/${lesson.id}`);
    } else {
      setAnswers(newAnswers);
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="font-cairo text-2xl font-bold text-blue-800 text-center mb-6">
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
          className="bg-blue-700 hover:bg-blue-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3 px-10 rounded-xl text-lg transition-colors"
        >
          {isLast ? 'إنهاء الاختبار ✅' : 'التالي ←'}
        </button>
      </div>
    </div>
  );
}
```

---

## ✅ TASK 11 — إنشاء `components/ResultCard.js`

**الملف:** `components/ResultCard.js`

**المتطلبات:**
- يستقبل props: `score`, `total`, `lessonId`, `lessonTitle`
- يعرض:
  - نسبة النجاح كنص وكدائرة ملونة
  - رسالة تشجيعية بناءً على النتيجة
  - زر "إعادة الاختبار" → `/quiz/[lessonId]`
  - زر "العودة للدروس" → `/lessons`

```js
import Link from 'next/link';

export default function ResultCard({ score, total, lessonId, lessonTitle }) {
  const percentage = Math.round((score / total) * 100);
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
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto text-center">
      <h2 className="font-cairo text-2xl font-bold text-blue-800 mb-2">نتيجتك</h2>
      <p className="text-slate-500 text-sm mb-6">{lessonTitle}</p>

      <div className="text-6xl font-bold mb-2 font-cairo" style={{ color: percentage >= 60 ? '#16a34a' : '#dc2626' }}>
        {percentage}%
      </div>
      <p className="text-slate-600 mb-1">
        أجبت على <span className="font-bold text-blue-700">{score}</span> من{' '}
        <span className="font-bold">{total}</span> سؤال
      </p>
      <p className={`font-bold text-lg my-4 ${color}`}>{message}</p>

      <div className="flex flex-col gap-3 mt-6">
        <Link
          href={`/quiz/${lessonId}`}
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl transition-colors"
        >
          إعادة الاختبار 🔄
        </Link>
        <Link
          href="/lessons"
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-xl transition-colors"
        >
          العودة للدروس
        </Link>
      </div>
    </div>
  );
}
```

---

## ✅ TASK 12 — إنشاء صفحة النتيجة `app/result/[id]/page.js`

**الملف:** `app/result/[id]/page.js`

**المتطلبات:**
- **Client Component** (`'use client'`)
- قراءة النتيجة من `sessionStorage` بمفتاح `result_[id]`
- إذا لم توجد نتيجة: توجيه إلى `/lessons`
- عرض `ResultCard`

```js
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import lessonsData from '@/data/lessons.json';
import ResultCard from '@/components/ResultCard';

export default function ResultPage({ params }) {
  const router = useRouter();
  const [result, setResult] = useState(null);
  const lesson = lessonsData.lessons.find((l) => l.id === params.id);

  useEffect(() => {
    const stored = sessionStorage.getItem(`result_${params.id}`);
    if (!stored) {
      router.push('/lessons');
    } else {
      setResult(JSON.parse(stored));
    }
  }, [params.id, router]);

  if (!result || !lesson) return null;

  return (
    <div className="max-w-lg mx-auto px-4 py-16">
      <ResultCard
        score={result.score}
        total={result.total}
        lessonId={lesson.id}
        lessonTitle={lesson.title}
      />
    </div>
  );
}
```

---

## ✅ TASK 13 — التحقق النهائي

بعد إنشاء كل الملفات، نفّذ:

```bash
npm run dev
```

تحقق من الصفحات التالية:
1. `http://localhost:3000` → الصفحة الرئيسية
2. `http://localhost:3000/lessons` → قائمة الدروس
3. `http://localhost:3000/lessons/oop-intro` → تفاصيل درس
4. `http://localhost:3000/quiz/oop-intro` → صفحة الاختبار
5. (بعد إنهاء اختبار) `/result/oop-intro` → النتيجة

---

## ✅ TASK 14 — Build للإنتاج (اختياري)

```bash
npm run build
npm run start
```

---

## 📌 ملاحظات مهمة للـ AI Agent

- ❌ لا تنشئ أي ملفات خارج البنية المحددة أعلاه
- ❌ لا تستخدم `useState` في Server Components
- ✅ كل component يستخدم `'use client'` إذا احتاج لـ hooks
- ✅ الصور والفيديوهات تُعرض **فقط** إذا كانت المصفوفة غير فارغة
- ✅ جميع النصوص باللغة العربية
- ✅ استخدم `font-cairo` للعناوين و`font-tajawal` للنصوص
