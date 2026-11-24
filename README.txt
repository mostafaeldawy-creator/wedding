طريقة النشر على Vercel (مجاناً):
1) أنشئ حساباً على github.com ثم مستودعاً جديداً وارفع محتويات هذا المجلد (index.html + assets + vercel.json).
2) افتح vercel.com وسجّل الدخول بحساب GitHub، ثم Add New > Project واختر المستودع، واضغط Deploy (بدون أي إعدادات).
3) ستحصل على رابط مثل https://اسمك.vercel.app

أو من الجهاز:  npx vercel --prod

تعديلات مهمة داخل index.html (ابحث عن CFG):
- whatsapp: ضع رقمك بصيغة دولية بدون + ليعمل زر "تأكيد الحضور".

لسجل التهاني المشترك (يراه العروسان وكل الضيوف):
Vercel > مشروعك > Storage > Create Database > Upstash (Redis) > Connect to Project، ثم Redeploy.

عدّاد تأكيد الحضور: يعمل بنفس قاعدة بيانات Upstash. لمعرفة العدد افتح: رابط-موقعك/api/rsvp
