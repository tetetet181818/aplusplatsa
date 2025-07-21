import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Users,
  UploadCloud,
  ShieldCheck,
  CreditCard,
  Book,
  UserX,
  MessageSquare,
  CheckSquare,
  AlertTriangle,
} from "lucide-react";

const TermsOfServicePage = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const ListItem = ({ icon, title, children }) => (
    <motion.div variants={sectionVariants} className="mb-8">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4 mt-1">
          {React.cloneElement(icon, {
            className: "h-7 w-7 text-primary dark:text-primary-light",
          })}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
            {title}
          </h2>
          <div className="text-gray-600 dark:text-gray-400 leading-relaxed space-y-2">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className="container mx-auto py-12 px-4 md:px-6 bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-gray-800 dark:to-gray-900 min-h-screen"
    >
      <header className="text-center mb-12">
        <motion.div
          variants={sectionVariants}
          className="inline-block p-4 bg-primary/10 dark:bg-primary-light/10 rounded-full mb-4"
        >
          <FileText className="h-12 w-12 text-primary dark:text-primary-light" />
        </motion.div>
        <motion.h1
          variants={sectionVariants}
          className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent dark:from-primary-light dark:to-accent-light mb-3"
        >
          📝 شروط الاستخدام – منصة "أ+"
        </motion.h1>
      </header>

      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl">
        <ListItem icon={<Users />} title="١. التعريفات">
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>
              <strong>المنصة:</strong> تشير إلى منصة "أ+" بجميع خدماتها
              الإلكترونية.
            </li>
            <li>
              <strong>المستخدم:</strong> كل من يتصفح المنصة أو يسجل فيها، سواء
              كمشتري أو بائع.
            </li>
            <li>
              <strong>البائع:</strong> المستخدم الذي يرفع محتوى أو ملخصات بهدف
              بيعها عبر المنصة.
            </li>
            <li>
              <strong>المشتري:</strong> المستخدم الذي يقوم بشراء المحتوى أو
              الملخصات من المنصة.
            </li>
          </ul>
        </ListItem>

        <ListItem icon={<CheckSquare />} title="٢. شروط التسجيل والاستخدام">
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>
              يجب أن يكون المستخدم طالبًا جامعيًا أو ذا علاقة بالتعليم الجامعي.
            </li>
            <li>يجب تقديم معلومات صحيحة وكاملة عند التسجيل.</li>
            <li>
              يتحمل المستخدم مسؤولية الحفاظ على سرية بيانات الدخول الخاصة
              بحسابه.
            </li>
            <li>
              يُمنع استخدام المنصة لأي أغراض غير تعليمية أو مخالفة للأخلاق أو
              القوانين.
            </li>
          </ul>
        </ListItem>

        <ListItem icon={<UploadCloud />} title="٣. رفع وبيع المحتوى">
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>يتحمل البائع المسؤولية الكاملة عن المحتوى الذي يقوم برفعه.</li>
            <li>
              يجب أن يكون المحتوى من إعداد البائع شخصيًا، أو لديه الحق القانوني
              في نشره وبيعه.
            </li>
            <li>
              يُمنع رفع أي محتوى يحتوي على سرقة أدبية، أو ينتهك حقوق الغير، أو
              يتضمن معلومات خاطئة أو مسيئة.
            </li>
            <li>
              لا تتحمل المنصة أي مسؤولية قانونية عن المحتوى المنشور من قبل
              المستخدمين.
            </li>
          </ul>
        </ListItem>

        <ListItem icon={<ShieldCheck />} title="٤. حقوق المنصة">
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>
              تحتفظ المنصة بحق حذف أو تعطيل أي حساب أو محتوى مخالف دون إشعار
              مسبق.
            </li>
            <li>
              يحق للمنصة تعديل هذه الشروط في أي وقت، ويتم إشعار المستخدمين في
              حال وجود تغييرات جوهرية.
            </li>
            <li>
              يمكن للمنصة استخدام بيانات المستخدم (دون تحديد هويته) لأغراض
              التحليل وتحسين الخدمات.
            </li>
          </ul>
        </ListItem>

        <ListItem
          icon={<CreditCard />}
          title="٥. عمليات الشراء والدفع وسحب الأرباح"
        >
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>
              تتم جميع عمليات الدفع عبر بوابات إلكترونية آمنة (مثل بوابة
              "ميسر").
            </li>
            <li>
              لا تُسترد المبالغ المدفوعة بعد إتمام عملية الشراء، إلا في حالة
              وجود خطأ واضح مثل عدم تطابق المحتوى مع الوصف.
            </li>
            <li>تخصم المنصة عمولة ثابتة بنسبة 15% من قيمة كل عملية بيع.</li>
            <li>
              بالإضافة إلى عمولة المنصة، يتم خصم رسوم إضافية من قبل بوابة الدفع
              "ميسر"، وتشمل الآتي:
              <ul className="list-disc list-inside pl-6 mt-1">
                <li>1% من قيمة العملية عند الدفع باستخدام بطاقات مدى.</li>
                <li>
                  2.75% من قيمة العملية عند الدفع باستخدام بطاقات فيزا أو
                  ماستركارد.
                </li>
                <li>1 ريال سعودي لكل عملية دفع كرسوم "إدارة احتيال".</li>
                <li>1 ريال سعودي لكل عملية استرداد (Refund).</li>
              </ul>
            </li>
            <li>
              تُخصم جميع هذه الرسوم تلقائيًا من المبلغ قبل إضافته إلى رصيد
              البائع داخل المنصة.
            </li>
            <li>
              يُشترط لسحب الأرباح أن يكون اسم صاحب الحساب البنكي مطابقًا تمامًا
              لاسم المستخدم المسجّل في المنصة.
            </li>
            <li>
              يتم تحويل الأرباح يدويًا من قبل إدارة المنصة خلال مدة أقصاها 7
              أيام من تاريخ طلب السحب.
            </li>
            <li>
              يتحمّل المستخدم كامل رسوم التحويل البنكي المفروضة من قبل البنك
              المستلم، سواء كان بنكًا محليًا أو خارجيًا.
            </li>
            <li>
              المنصة غير مسؤولة عن أي تأخير أو فشل في التحويل نتيجة معلومات
              بنكية خاطئة أو مشاكل في النظام المصرفي.
            </li>
          </ul>
        </ListItem>

        <ListItem icon={<Book />} title="٦. المحتوى والملكية الفكرية">
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>تظل جميع الحقوق محفوظة لأصحاب المحتوى.</li>
            <li>
              يُمنع إعادة نشر أو توزيع أي ملخص تم شراؤه دون موافقة خطية من
              صاحبه.
            </li>
          </ul>
        </ListItem>

        <ListItem icon={<UserX />} title="٧. الإيقاف والحذف">
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>
              يحق للمنصة إيقاف الحسابات التي تخالف الشروط أو تسيء استخدام
              الخدمة.
            </li>
            <li>
              في حال حذف الحساب، يفقد المستخدم إمكانية الوصول إلى المحتوى أو
              الأرباح المعلّقة، ما لم يكن السبب تقنيًا من جهة المنصة.
            </li>
          </ul>
        </ListItem>

        <ListItem icon={<MessageSquare />} title="٨. التواصل والدعم">
          <p>
            لأي استفسار أو ملاحظة، يمكنكم التواصل معنا عبر البريد الإلكتروني:
            <br />
            <a
              href="mailto:aplusplatform@outlook.com"
              className="text-primary dark:text-primary-light hover:underline inline-flex items-center mt-1"
            >
              📧 aplusplatform@outlook.com
            </a>
          </p>
        </ListItem>

        <ListItem icon={<AlertTriangle />} title="٩. إخلاء المسؤولية">
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>
              لا تضمن المنصة استمرارية الوصول إلى الخدمات في جميع الأوقات، ولا
              تتحمل أي مسؤولية عن الأعطال التقنية أو الانقطاعات خارج إرادتها.
            </li>
            <li>
              المستخدم يتحمل المسؤولية الكاملة عن البيانات التي يقدمها، والمحتوى
              الذي يرفعه، وأي استخدام غير قانوني أو غير مشروع للحساب الخاص به.
            </li>
            <li>
              المنصة لا تتحمل أي التزام قانوني تجاه أي نزاع ينشأ بين البائع
              والمشتري يتعلق بمحتوى الملخصات أو جودتها، ما لم يكن هناك خطأ مباشر
              من قبل إدارة المنصة.
            </li>
          </ul>
        </ListItem>

        <ListItem icon={<CheckSquare />} title="١٠. القبول والالتزام">
          <p>
            باستخدامك منصة "أ+"، فإنك تقر بأنك قرأت هذه الشروط، وفهمتها، وتوافق
            على الالتزام الكامل بها.
          </p>
        </ListItem>
      </div>
    </motion.div>
  );
};

export default TermsOfServicePage;
