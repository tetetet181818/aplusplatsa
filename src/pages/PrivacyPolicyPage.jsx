import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  FileText,
  User,
  Database,
  CreditCard,
  Share2,
  CheckCircle,
  Edit,
  Cookie,
  RefreshCcw,
} from "lucide-react";

const PrivacyPolicyPage = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const ListItem = ({ icon, title, children }) => (
    <motion.div variants={sectionVariants} className="mb-6">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4 mt-1">
          {React.cloneElement(icon, {
            className: "h-6 w-6 text-primary dark:text-primary-light",
          })}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
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
          <Shield className="h-12 w-12 text-primary dark:text-primary-light" />
        </motion.div>
        <motion.h1
          variants={sectionVariants}
          className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent dark:from-primary-light dark:to-accent-light mb-3"
        >
          سياسة الخصوصية – منصة أ+
        </motion.h1>

        <motion.p
          variants={sectionVariants}
          className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
        >
          في منصة أ+، نولي خصوصيتك أهمية قصوى ونسعى لحماية جميع بياناتك الشخصية
          التي تزودنا بها أثناء استخدامك للمنصة. توضح هذه السياسة كيفية جمع
          المعلومات واستخدامها وحمايتها، إضافة إلى حقوقك كمستخدم.
        </motion.p>
      </header>

      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl">
        <ListItem icon={<User />} title="١. المعلومات التي نجمعها">
          <p>عند استخدام المنصة، قد نقوم بجمع المعلومات التالية:</p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>
              <strong>معلومات الحساب:</strong> مثل الاسم، البريد الإلكتروني،
              الجامعة، التخصص، وكلمة المرور{" "}
            </li>
            <li>
              <strong>معلومات الدفع:</strong> لا نقوم بتخزين بيانات البطاقات
              البنكية، حيث تُعالج عمليات الدفع من خلال بوابات إلكترونية آمنة
              (مثل “ميسر”)
            </li>
            <li>
              <strong>الملخصات والمحتوى:</strong> الملفات التي تقوم برفعها أو
              عرضها للبيع من خلال حسابك
            </li>
            <li>
              <strong>بيانات الاستخدام:</strong> مثل الصفحات التي تزورها، عمليات
              الشراء والبيع، وسلوكك داخل المنصة
            </li>
          </ul>
        </ListItem>

        <ListItem icon={<FileText />} title="٢. كيفية استخدام المعلومات">
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>التواصل معك عند الحاجة (دعم – تنبيهات – إشعارات).</li>
            <li>التواصل معك عند الحاجة للدعم أو التحديثات.</li>
            <li>حماية المنصة من الاستخدام غير القانوني أو المخالف.</li>
          </ul>
        </ListItem>

        <ListItem icon={<Database />} title="٣. حماية البيانات">
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>نستخدم تقنيات تشفير لحماية البيانات أثناء النقل.</li>
            <li>أنظمة حماية داخلية ضد الاختراقات.</li>
            <li>تقييد صلاحيات الوصول للبيانات الحساسة داخل الفريق التقني.</li>
          </ul>
        </ListItem>

        <ListItem icon={<Share2 />} title="٤. مشاركة المعلومات">
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>لا نبيع أو نشارك بياناتك مع جهات تجارية.</li>
            <li>نشارك فقط ما يلزم مع بوابات الدفع لإتمام المعاملات بأمان.</li>
          </ul>
        </ListItem>

        <ListItem icon={<CheckCircle />} title="٥. حقوق المستخدم">
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>يحق لك الاطلاع على بياناتك، وتعديلها أو حذفها.</li>
            <li>يمكنك إغلاق حسابك في أي وقت.</li>
            <li>
              للتواصل حول خصوصيتك:{" "}
              <a href="mailto:aplusplatform@outlook.com">
                aplusplatform@outlook.com
              </a>
            </li>
          </ul>
          <p>
            للتواصل معنا بشأن هذه الحقوق، يمكنك مراسلتنا عبر البريد التالي:{" "}
            <a
              href="mailto:aplusplatform@outlook.com"
              className="text-primary dark:text-primary-light hover:underline"
            >
              aplusplatform@outlook.com
            </a>
          </p>
        </ListItem>

        <ListItem icon={<Cookie />} title="٦. ملفات تعريف الارتباط (الكوكيز)">
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>نستخدم الكوكيز لتحسين الأداء وتخصيص التجربة.</li>
            <li>يمكنك إيقاف الكوكيز من إعدادات متصفحك في أي وقت.</li>
          </ul>
        </ListItem>

        <ListItem icon={<RefreshCcw />} title="٧. التعديلات على سياسة الخصوصية">
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>قد نقوم بتحديث هذه السياسة حسب الحاجة.</li>
            <li>
              سيتم إشعارك داخل المنصة أو عبر بريدك المسجّل في حال وجود تغييرات
              جوهرية.
            </li>
          </ul>
        </ListItem>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicyPage;
