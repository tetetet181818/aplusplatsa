import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { HelpCircle, ShoppingCart, User, BookOpen, Shield, Server, Palette, Award } from "lucide-react";
import { Link } from "react-router-dom";

const faqData = [
  {
    category: "عام",
    icon: <HelpCircle className="h-5 w-5 mr-2 text-primary" />,
    questions: [
      {
        question: "ما هي فكرة منصة أ+؟",
        answer: "منصة أ+ تتيح للطلاب رفع ملخصاتهم الدراسية وبيعها لزملائهم، كما يمكنهم شراء ملخصات جاهزة من طلاب آخرين لتسهيل المذاكرة وتوفير الوقت.",
      },
      {
        question: "هل منصة أ+ معتمدة من جهة رسمية؟",
        answer: "لسنا جهة تعليمية رسمية، ولكننا نوفر بيئة آمنة لتبادل المحتوى الدراسي بين الطلاب بشكل قانوني.",
      },
      {
        question: "هل يمكنني استخدام منصة أ+ إذا كنت طالبًا من جامعة مختلفة؟",
        answer: "نعم، منصة أ+ تدعم جميع الجامعات والتخصصات، مع إمكانية تصفح الملخصات حسب اسم الجامعة والمادة.",
      },
    ],
  },
  {
    category: "للطلاب المشترين",
    icon: <ShoppingCart className="h-5 w-5 mr-2 text-primary" />,
    questions: [
      {
        question: "كيف أشتري ملخص؟",
        answer: "قم بتسجيل الدخول، ابحث عن الملخص الذي تحتاجه، اضغط على \"شراء\"، واختر وسيلة الدفع المناسبة.",
      },
      {
        question: "هل أستطيع معاينة الملخص قبل الشراء؟",
        answer: "نعم، يمكنك عرض جزء صغير من كل ملخص (مثل الصفحة الأولى أو جدول المحتويات) قبل اتخاذ قرار الشراء.",
      },
      {
        question: "ماذا لو كان الملخص سيئ الجودة أو غير مفيد؟",
        answer: "يمكنك تقييم المحتوى وكتابة ملاحظتك، وفي حال وجود مشكلة كبيرة أو تضليل، يمكنك تقديم بلاغ وسيتم النظر فيه سريعًا.",
      },
      {
        question: "هل المحتوى يكون بصيغة قابلة للتعديل؟",
        answer: "جميع الملخصات تُرفع بصيغة PDF لحفظ حقوق البائع، ولا يمكن تعديلها.",
      },
    ],
  },
  {
    category: "للطلاب البائعين",
    icon: <User className="h-5 w-5 mr-2 text-primary" />,
    questions: [
      {
        question: "كيف يمكنني بيع ملخصاتي؟",
        answer: "سجّل الدخول، اختر \"رفع ملخص\"، واملأ البيانات المطلوبة مثل اسم المادة، الجامعة، السعر، وصف الملخص، ثم ارفع الملف بصيغة PDF.",
      },
      {
        question: "كم أربح من كل عملية بيع؟",
        answer: "تأخذ منصة أ+ نسبة عمولة ثابتة (مثلاً 15%) من كل عملية، ويتم تحويل الأرباح المتبقية إلى محفظتك داخل الحساب.",
      },
      {
        question: "متى أستلم أرباحي؟",
        answer: "تُحوّل الأرباح مباشرة بعد عملية الشراء ويمكنك سحبها متى ما تجاوزت الحد الأدنى للسحب.",
      },
      {
        question: "هل أستطيع بيع نفس الملخص لأكثر من طالب؟",
        answer: "نعم، يمكنك بيع نفس الملخص لعدد غير محدود من الطلاب طالما هو من إعدادك الشخصي وليس منسوخًا.",
      },
      {
        question: "هل يمكن حذف الملخص بعد رفعه؟",
        answer: "نعم، يمكنك حذف الملخص من خلال حسابك بشرط عدم وجود عمليات شراء معلقة عليه.",
      },
    ],
  },
  {
    category: "المحتوى والجودة",
    icon: <BookOpen className="h-5 w-5 mr-2 text-primary" />,
    questions: [
      {
        question: "هل أستطيع الإبلاغ عن ملخص مسروق أو غير أخلاقي؟",
        answer: "بالتأكيد. يمكن لأي مستخدم الإبلاغ عن محتوى مخالف أو منسوخ، وسيتم التحقق منه واتخاذ الإجراء المناسب.",
      },
      {
        question: "هل هناك حد أدنى أو أقصى لعدد الصفحات؟",
        answer: "لا يوجد حد معين، ولكن ننصح ألا يقل الملخص عن 3 صفحات وأن يكون منسقًا ليسهل على الطلاب قراءته.",
      },
    ],
  },
  {
    category: "التقنية والدعم",
    icon: <Server className="h-5 w-5 mr-2 text-primary" />,
    questions: [
      {
        question: "ما هي وسائل الدفع المتاحة؟",
        answer: "ندعم وسائل متعددة مثل: مدى، فيزا/ماستر كارد، Apple Pay، STC Pay.",
      },
      {
        question: "هل هناك تطبيق للموبايل؟",
        answer: "التطبيق قيد التطوير وسيتوفر قريبًا على Android و iOS.",
      },
      {
        question: "ماذا أفعل إذا واجهت مشكلة تقنية؟",
        answer: "يمكنك التواصل مع الدعم الفني من خلال صفحة \"اتصل بنا\" أو المحادثة المباشرة، وسنرد خلال أقل من 24 ساعة.",
      },
    ],
  },
  {
    category: "الخصوصية والأمان",
    icon: <Shield className="h-5 w-5 mr-2 text-primary" />,
    questions: [
      {
        question: "هل بياناتي الشخصية محمية؟",
        answer: "نعم، نلتزم بسياسات خصوصية صارمة، ولا نشارك بياناتك مع أي جهة خارجية.",
      },
      {
        question: "هل الملخصات التي أشتريها تظل محفوظة؟",
        answer: "نعم، تبقى الملخصات التي تشتريها في مكتبتك داخل الحساب ويمكنك تحميلها في أي وقت.",
      },
    ],
  },
];

const FAQPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12 px-4 md:px-6 bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-gray-800 dark:to-gray-900 min-h-screen"
    >
      <div className="text-center mb-12">
        <motion.h1 
          className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent dark:from-primary-light dark:to-accent-light mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          الأسئلة الشائعة
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          نجيب هنا على أكثر الأسئلة شيوعًا حول منصة أ+. إذا لم تجد إجابتك، لا تتردد في الاتصال بنا.
        </motion.p>
      </div>

      {faqData.map((categoryItem, index) => (
        <motion.div 
          key={index} 
          className="mb-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 * (index + 2), duration: 0.6 }}
        >
          <div className="flex items-center mb-6">
            {React.cloneElement(categoryItem.icon, { className: "h-8 w-8 mr-3 text-primary dark:text-primary-light" })}
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white">
              {categoryItem.category}
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2">
            {categoryItem.questions.map((faq, qIndex) => (
              <AccordionItem value={`item-${index}-${qIndex}`} key={qIndex} className="border-b-0 last:border-b-0">
                <AccordionTrigger className="text-base md:text-lg hover:bg-gray-50 dark:hover:bg-gray-700 px-4 rounded-md">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 text-sm md:text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      ))}
       <motion.div
        className="mt-16 text-center p-8 bg-white dark:bg-gray-800 shadow-xl rounded-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 * (faqData.length + 2), duration: 0.7 }}
      >
        <Palette className="h-12 w-12 text-accent dark:text-accent-light mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
          لم تجد إجابتك؟
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          فريق الدعم لدينا جاهز لمساعدتك. تواصل معنا عبر صفحة "اتصل بنا" وسنكون سعداء بالرد على استفساراتك.
        </p>
        <Link
          to="/contact-us" 
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark dark:bg-primary-light dark:text-gray-900 dark:hover:bg-primary transition-transform transform hover:scale-105"
        >
          اتصل بنا الآن
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default FAQPage;