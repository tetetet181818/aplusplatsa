import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Users, UploadCloud, ShieldCheck, CreditCard, Book, UserX, MessageSquare, CheckSquare } from 'lucide-react';

const TermsOfServicePage = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const ListItem = ({ icon, title, children }) => (
    <motion.div variants={sectionVariants} className="mb-8">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4 mt-1">
          {React.cloneElement(icon, { className: "h-7 w-7 text-primary dark:text-primary-light" })}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">{title}</h2>
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
        <motion.div variants={sectionVariants} className="inline-block p-4 bg-primary/10 dark:bg-primary-light/10 rounded-full mb-4">
          <FileText className="h-12 w-12 text-primary dark:text-primary-light" />
        </motion.div>
        <motion.h1
          variants={sectionVariants}
          className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent dark:from-primary-light dark:to-accent-light mb-3"
        >
          📜 شروط الاستخدام – منصة أ+
        </motion.h1>
        <motion.p
          variants={sectionVariants}
          className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
        >
          مرحبًا بك في منصة أ+! يرجى قراءة هذه الشروط بعناية قبل استخدام المنصة. باستخدامك لمنصة أ+، فإنك توافق على الالتزام الكامل بجميع ما ورد في هذه الوثيقة.
        </motion.p>
      </header>

      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl">
        <ListItem icon={<Users />} title="١. التعريفات">
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li><strong>المنصة:</strong> تعني منصة أ+، بجميع خدماتها الإلكترونية.</li>
            <li><strong>المستخدم:</strong> هو كل من يقوم بتصفح المنصة، أو التسجيل فيها، سواء كمشتري أو كبائع.</li>
            <li><strong>البائع:</strong> هو المستخدم الذي يقوم برفع محتوى أو ملخصات بهدف بيعها.</li>
            <li><strong>المشتري:</strong> هو المستخدم الذي يقوم بشراء محتوى أو ملخصات من المنصة.</li>
          </ul>
        </ListItem>

        <ListItem icon={<CheckSquare />} title="٢. شروط التسجيل والاستخدام">
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>يجب أن يكون المستخدم طالبًا جامعيًا أو شخصًا ذا علاقة بالتعليم الجامعي.</li>
            <li>يجب تقديم معلومات صحيحة وكاملة عند التسجيل.</li>
            <li>يتحمل المستخدم مسؤولية الحفاظ على سرية بيانات الدخول إلى حسابه.</li>
            <li>يُمنع استخدام المنصة لأغراض غير تعليمية أو مخالفة للأخلاق أو القانون.</li>
          </ul>
        </ListItem>

        <ListItem icon={<UploadCloud />} title="٣. رفع وبيع المحتوى">
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>يتحمل البائع المسؤولية الكاملة عن أي ملخص أو ملف يقوم برفعه.</li>
            <li>يجب أن يكون المحتوى من إعداد البائع نفسه، أو لديه الحق في نشره وبيعه.</li>
            <li>يُمنع رفع أي محتوى يحتوي على سرقة أدبية، أو ينتهك حقوق الآخرين، أو يحتوي على معلومات خاطئة أو مسيئة.</li>
            <li>لا تتحمل المنصة أي مسؤولية قانونية عن المحتوى المنشور من قبل المستخدمين.</li>
          </ul>
        </ListItem>
        
        <ListItem icon={<ShieldCheck />} title="٤. حقوق المنصة">
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>يحق لإدارة المنصة حذف أو تعطيل أي حساب أو محتوى مخالف دون إشعار مسبق.</li>
            <li>تحتفظ المنصة بحق تعديل الشروط في أي وقت، ويتم إعلام المستخدمين في حال وجود تغييرات جوهرية.</li>
            <li>يحق للمنصة استخدام بعض البيانات (دون تحديد هوية المستخدم) لأغراض التحليل وتطوير الخدمات.</li>
          </ul>
        </ListItem>

        <ListItem icon={<CreditCard />} title="٥. عمليات الشراء والدفع">
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>يتم الدفع عبر بوابات إلكترونية آمنة.</li>
            <li>لا تسترد المبالغ المدفوعة بعد إتمام عملية الشراء إلا في حال وجود خطأ واضح مثل عدم تطابق الملف مع الوصف.</li>
            <li>رسوم المنصة تخصم تلقائيًا من قيمة كل عملية بيع، وتُوضح نسبة العمولة ضمن النظام.</li>
          </ul>
        </ListItem>

        <ListItem icon={<Book />} title="٦. المحتوى والملكية الفكرية">
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>جميع الحقوق محفوظة لأصحاب المحتوى.</li>
            <li>يمنع إعادة نشر أو توزيع أي ملخص تم شراؤه إلا بموافقة خطية من صاحبه.</li>
          </ul>
        </ListItem>

        <ListItem icon={<UserX />} title="٧. الإيقاف أو الحذف">
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>للمنصة الحق في إيقاف الحسابات التي تخالف الشروط أو تسيء استخدام الخدمة.</li>
            <li>في حال تم حذف الحساب، تفقد إمكانية الوصول للمحتوى أو الأرباح المعلقة ما لم يكن السبب تقنيًا من المنصة.</li>
          </ul>
        </ListItem>

        <ListItem icon={<MessageSquare />} title="٨. التواصل والدعم">
          <p>لأي استفسار أو ملاحظة، يمكنك التواصل معنا عبر البريد التالي: <a href="mailto:aplusplatform@outlook.com" className="text-primary dark:text-primary-light hover:underline">aplusplatform@outlook.com</a></p>
        </ListItem>

        <ListItem icon={<CheckSquare />} title="٩. القبول والالتزام">
          <p>باستخدامك لمنصة أ+، فإنك تقر بأنك قرأت هذه الشروط وفهمتها وتوافق على الالتزام بها.</p>
        </ListItem>
      </div>
    </motion.div>
  );
};

export default TermsOfServicePage;