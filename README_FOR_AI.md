# 📚 تعلم البرمجة بالعربي

تطبيق تعليمي ديناميكي لتعلم مفاهيم البرمجة الكائنية (OOP) بلغة C# — باللغة العربية الكاملة.

---

## 🚀 تشغيل المشروع

```bash
# 1. تثبيت الحزم
npm install

# 2. تشغيل بيئة التطوير
npm run dev

# 3. افتح المتصفح على
http://localhost:3000
```

---

## 💡 فكرة المشروع

- تطبيق ويب تعليمي بالكامل بالعربية
- المحتوى (الدروس + الأسئلة) يُحمَّل من ملف JSON واحد
- يمكن إضافة دروس وأسئلة جديدة **بدون تعديل أي كود**
- نظام اختبار تفاعلي سؤال بسؤال
- دعم صور ومقاطع فيديو اختيارية لكل درس

---

## 🗂️ بنية ملف JSON

الملف الرئيسي للبيانات: `data/lessons.json`

### الهيكل العام

```json
{
  "lessons": [ ...مصفوفة من الدروس... ]
}
```

### حقول كل درس

| الحقل | النوع | مطلوب؟ | الوصف |
|---|---|---|---|
| `id` | string | ✅ | معرف فريد (بالإنجليزية، بدون مسافات) |
| `title` | string | ✅ | عنوان الدرس بالعربية |
| `description` | string | ✅ | وصف مختصر يظهر في البطاقة |
| `content` | string | ✅ | المحتوى الكامل للدرس (نص طويل) |
| `images` | array of strings | ❌ | روابط الصور (إذا فارغ `[]` لا يُعرض شيء) |
| `videos` | array of strings | ❌ | روابط YouTube embed (إذا فارغ `[]` لا يُعرض شيء) |
| `quiz` | array of objects | ✅ | أسئلة الاختبار |

### حقول كل سؤال في `quiz`

| الحقل | النوع | الوصف |
|---|---|---|
| `id` | number | رقم فريد للسؤال |
| `question` | string | نص السؤال |
| `options` | array of strings | قائمة الخيارات (4 خيارات مُوصى بها) |
| `answer` | number | index الإجابة الصحيحة (يبدأ من 0) |

---

## ➕ كيف تضيف درسًا جديدًا؟

افتح `data/lessons.json` وأضف عنصرًا جديدًا داخل مصفوفة `"lessons"`:

```json
{
  "id": "my-new-lesson",
  "title": "عنوان الدرس الجديد",
  "description": "وصف مختصر يظهر في البطاقة",
  "content": "المحتوى الكامل للدرس...\nيمكنك استخدام أسطر جديدة.",
  "images": [],
  "videos": [],
  "quiz": []
}
```

> ✅ لا يحتاج تعديل أي ملف آخر!

---

## 🖼️ كيف تضيف صورًا؟

أضف روابط الصور إلى حقل `images`:

```json
"images": [
  "https://example.com/image1.png",
  "https://example.com/image2.jpg"
]
```

> إذا كانت `[]` أو غير موجودة: لا يظهر أي قسم للصور في الصفحة.

---

## 🎬 كيف تضيف فيديوهات؟

أضف رابط الـ embed من YouTube إلى حقل `videos`:

```json
"videos": [
  "https://www.youtube.com/embed/VIDEO_ID"
]
```

للحصول على رابط embed من يوتيوب:
1. افتح الفيديو على YouTube
2. اضغط "مشاركة" ثم "تضمين"
3. انسخ الرابط من `src="..."` فقط

> إذا كانت `[]`: لا يظهر أي قسم للفيديوهات في الصفحة.

---

## ❓ كيف تضيف أسئلة؟

أضف كائنات إلى حقل `quiz`:

```json
"quiz": [
  {
    "id": 1,
    "question": "ما هو مبدأ الكبسلة في OOP؟",
    "options": [
      "إخفاء التفاصيل الداخلية وعرض واجهة عامة فقط",
      "وراثة خصائص الكلاس الأب",
      "تعريف دوال بنفس الاسم",
      "إنشاء نسخ متعددة من الكلاس"
    ],
    "answer": 0
  }
]
```

> `"answer": 0` يعني الإجابة الصحيحة هي **أول خيار** (index يبدأ من 0).

---

## 📄 مثال عملي كامل لدرس داخل JSON

```json
{
  "id": "csharp-polymorphism",
  "title": "تعدد الأشكال (Polymorphism) في C#",
  "description": "تعلم كيف يمكن للكائنات المختلفة الاستجابة بطريقة مختلفة لنفس الأمر",
  "content": "تعدد الأشكال هو أحد أهم مبادئ البرمجة الكائنية.\n\nيعني أن الكائنات من أنواع مختلفة يمكنها الاستجابة لنفس الرسالة بطرق مختلفة.\n\nمثال بلغة C#:\n\npublic class Animal {\n  public virtual void Speak() {\n    Console.WriteLine(\"...\");\n  }\n}\n\npublic class Dog : Animal {\n  public override void Speak() {\n    Console.WriteLine(\"Woof!\");\n  }\n}\n\npublic class Cat : Animal {\n  public override void Speak() {\n    Console.WriteLine(\"Meow!\");\n  }\n}",
  "images": [
    "https://via.placeholder.com/800x400?text=Polymorphism+Diagram"
  ],
  "videos": [
    "https://www.youtube.com/embed/dQw4w9WgXcQ"
  ],
  "quiz": [
    {
      "id": 1,
      "question": "ما معنى تعدد الأشكال (Polymorphism)؟",
      "options": [
        "قدرة الكائنات المختلفة على الاستجابة لنفس الأمر بطرق مختلفة",
        "وراثة كلاس من كلاس آخر",
        "إخفاء البيانات داخل الكلاس",
        "تعريف كلاس بدون دوال"
      ],
      "answer": 0
    },
    {
      "id": 2,
      "question": "ما الكلمة المفتاحية المستخدمة للتعديل على دالة في الكلاس الأب في C#؟",
      "options": ["extends", "override", "overload", "virtual"],
      "answer": 1
    }
  ]
}
```

---

## 🛠️ التقنيات المستخدمة

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Google Fonts**: Tajawal + Cairo
- **بدون قاعدة بيانات** — البيانات من JSON فقط
