import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Clock, Info, AlertTriangle, Send } from 'lucide-react';

const ContactUsPage = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className="container mx-auto py-12 px-4 md:px-6 bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-gray-800 dark:to-gray-900 min-h-screen"
    >
      <header className="text-center mb-12">
        <motion.h1
          variants={cardVariants}
          className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent dark:from-primary-light dark:to-accent-light mb-4"
        >
          📞 اتصل بنا
        </motion.h1>
        <motion.p
          variants={cardVariants}
          className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          هل لديك سؤال، تواجه مشكلة، أو ترغب في تقديم اقتراح؟
          <br />
          نحن في منصة أ+ نرحّب بك دائمًا ونسعد بخدمتك.
        </motion.p>
      </header>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <motion.div
          variants={cardVariants}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl space-y-6 transform hover:scale-105 transition-transform duration-300"
        >
          <div className="flex items-center">
            <Mail className="h-8 w-8 text-primary dark:text-primary-light mr-4" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-1">البريد الإلكتروني للدعم الفني</h2>
              <a
                href="mailto:aplusplatform@outlook.com"
                className="text-lg text-accent dark:text-accent-light hover:underline break-all"
              >
                aplusplatform@outlook.com
              </a>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            يرجى إرسال رسالتك مع توضيح نوع المشكلة أو الاستفسار، وذكر اسم المادة أو الملخص إن وُجد.
          </p>
          <a
            href="mailto:aplusplatform@outlook.com"
            className="inline-flex items-center justify-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark dark:bg-primary-light dark:text-gray-900 dark:hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            <Send className="h-5 w-5 ml-2" />
            إرسال بريد إلكتروني الآن
          </a>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl space-y-6 transform hover:scale-105 transition-transform duration-300"
        >
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-primary dark:text-primary-light mr-4" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-1">أوقات الرد</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">من الأحد إلى الخميس</p>
              <p className="text-lg text-gray-700 dark:text-gray-300">من الساعة 10 صباحًا حتى 6 مساءً (بتوقيت السعودية)</p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            <AlertTriangle className="inline h-5 w-5 text-yellow-500 mr-1" />
            يتم الرد خلال 24 إلى 48 ساعة كحد أقصى.
          </p>
        </motion.div>
      </div>

      <motion.div
        variants={cardVariants}
        className="mt-12 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 p-8 rounded-xl shadow-2xl"
      >
        <div className="flex items-center mb-4">
          <Info className="h-8 w-8 text-primary dark:text-primary-light mr-4" />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">ملاحظات هامة</h2>
        </div>
        <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
          <li>تأكد من كتابة عنوان واضح للرسالة لتسهيل الرد.</li>
          <li>لا يوجد حالياً دعم عبر وسائل التواصل الاجتماعي أو الدردشة المباشرة.</li>
          <li>جميع الرسائل يتم التعامل معها بسرية واهتمام.</li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default ContactUsPage;