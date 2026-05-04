# ⚙️ What to do first — Setup Instructions

## الخطوة 1: تثبيت Node.js

1. اذهب إلى: https://nodejs.org
2. حمّل النسخة **LTS** (مثلاً: 20.x أو أعلى)
3. ثبّتها على جهازك
4. تحقق من التثبيت:
```bash
node -v    # يجب أن تظهر نسخة مثل: v20.x.x
npm -v     # يجب أن تظهر نسخة مثل: 10.x.x
```

---

## الخطوة 2: إنشاء مشروع Next.js

```bash
npx create-next-app@latest arabic-learning-app
```

عند ظهور الأسئلة، اختر التالي:
```
✔ Would you like to use TypeScript? → No
✔ Would you like to use ESLint? → Yes
✔ Would you like to use Tailwind CSS? → Yes
✔ Would you like to use `src/` directory? → No
✔ Would you like to use App Router? → Yes
✔ Would you like to customize the default import alias? → No
```

ثم انتقل إلى مجلد المشروع:
```bash
cd arabic-learning-app
```

---

## الخطوة 3: تثبيت Dependencies

```bash
npm install
```

لا توجد مكتبات إضافية مطلوبة — المشروع يعتمد على:
- **Next.js** (App Router)
- **Tailwind CSS** (مدمج)
- **next/font** (لتحميل الخطوط)

---

## الخطوة 4: إعداد الخطوط (Tajawal + Cairo)

افتح ملف `app/layout.js` وضع المحتوى التالي:

```js
import { Tajawal, Cairo } from 'next/font/google';
import './globals.css';

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
  title: 'تعلم البرمجة',
  description: 'تطبيق تعليمي تفاعلي',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.variable} ${cairo.variable} font-tajawal`}>
        {children}
      </body>
    </html>
  );
}
```

افتح `tailwind.config.js` وأضف:

```js
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        tajawal: ['var(--font-tajawal)', 'sans-serif'],
        cairo: ['var(--font-cairo)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

---

## الخطوة 5: تجهيز المشروع للتنفيذ

أنشئ البنية الأساسية للمجلدات:

```bash
mkdir -p app/lessons
mkdir -p app/lessons/[id]
mkdir -p app/quiz/[id]
mkdir -p app/result/[id]
mkdir -p components
mkdir -p data
mkdir -p public/images
```

انسخ ملف `data/lessons.json` (الملف الجاهز المرفق في هذه الخطة) إلى مجلد `data/`.

ثم شغّل المشروع للتأكد:
```bash
npm run dev
```

افتح المتصفح على: http://localhost:3000

---

✅ المشروع جاهز للتنفيذ. انتقل الآن إلى `plan.md`.
