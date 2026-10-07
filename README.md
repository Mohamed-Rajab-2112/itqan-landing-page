# منصة إتقان (Itqan Landing Page)

صفحة هبوط تسويقية عالية التحويل (High-Converting Landing Page) لمنصة PropTech/ConTech مصرية ناشئة متخصصة في الإشراف الهندسي المعتمد وتشطيب الوحدات السكنية بأعلى معايير الجودة والشفافية.

---

## 🛠 المواصفات التقنية والهوية الهندسية (Branding & Tech Stack)

- **الهيكل واللغة**: HTML5 دلالي، JavaScript (Vanilla ES6+).
- **التوجيه والخطوط**: `dir="rtl"` و `lang="ar"` مع خط **Cairo** من Google Fonts (أوزان 400، 600، 700، 800، 900).
- **الهوية البصرية للصناعة (ConTech / PropTech Alignment)**:
  - **خلفية المخططات (Blueprint CAD Grid)**: شبكة هندسية خفيفة مستوحاة من لوحات الرسم الهندسي والأوتوكاد.
  - **ختم الجودة الهندسي المعتمد (Official QC Stamp)**: كود اعتماد `ITQAN QC #2026`.
  - **مؤشر خط الليزر (Laser Level Axis Indicator)**: يبرز دقة ضبط الاستواء والتربيع للوحدة.
  - **شريط معايير وأجهزة الفحص المعتمدة**: (موازين ليزر بوش، طلمبة كبس هيدروليك 15 بار، كاشف كابلات وأقطار نحاس السويدي، ومطابقة الكود المصري للبناء).
- **باليتة الألوان المعتمدة (Industry Palettes)**:
  - اللون الأساسي: الكحلي الهندسي الموثوق `Deep Navy Blue (#1A2B4C)`
  - اللون الثانوي للإجراء (CTA): الذهبي/الخردلي المحفّز للتحويل `Mustard/Gold (#F5A623)`
  - لون الخلفية: الأوف وايت الهادئ `Clean Off-White (#F8F9FA)`
  - ألوان الاعتماد والجودة: الأخضر الزمردي المعتمد `#0D9488` والأزرق السيان للأجهزة `#38BDF8`
  - لون الخلفية: الأوف وايت الهادئ `#F8F9FA`
  - ألوان الثقة والاعتماد: الأخضر الزمردي `#0D9488`
- **التوافق التام مع الموبايل (Mobile-First)**: مصممة ومختبرة للشاشات الصغيرة لتلائم أكثر من 80% من الزيارات القادمة من إعلانات فيسبوك وإنستجرام وتيك توك.

---

## 📁 هيكل المشروع

```
Itqan-landing/
├── index.html          # الصفحة الرئيسية الكاملة بجميع الأقسام والنصوص التسويقية
├── css/
│   └── styles.css      # المؤثرات البصرية وتنسيقات الـ RTL والكبسولات التفاعلية
├── js/
│   └── app.js          # المنطق البرمجي، التحقق اللحظي من أرقام الموبايل المصرية، والنموذج
└── README.md           # دليل التشغيل والربط مع Firebase
```

---

## 🚀 طريقة التشغيل محلياً

يمكن فتح ملف `index.html` مباشرة في أي متصفح، أو تشغيل خادم محلي خفيف:

```bash
# باستخدام Python:
python3 -m http.server 8000

# أو باستخدام npx serve:
npx serve .
```
ثم فتح الرابط: `http://localhost:8000`

---

## 🔥 كيفية ربط Firebase Firestore لاحقاً

الملف `js/app.js` يحتوي بالفعل على الدالة `submitLead(data)`. لربط Firebase:

1. أضف مكتبات Firebase في `index.html` قبل إغلاق الوسم `</body>`:
```html
<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "...",
    appId: "..."
  };

  const app = initializeApp(firebaseConfig);
  window.db = getFirestore(app);
</script>
```

2. استبدل محتوى دالة `submitLead(data)` في [js/app.js](file:///Users/squadio/WebstormProjects/Itqan-landing/js/app.js) بالكود التالي:
```javascript
async function submitLead(data) {
  try {
    const docRef = await addDoc(collection(window.db, "leads"), {
      ...data,
      createdAt: serverTimestamp(),
      platform: "landing_page_mvp"
    });
    return {
      success: true,
      id: docRef.id,
      message: 'تم تسجيل طلبك بنجاح. مهندسنا هيتواصل معاك خلال 24 ساعة.'
    };
  } catch (error) {
    console.error("Firebase error:", error);
    throw error;
  }
}
```
