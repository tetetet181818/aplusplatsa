import React from "react";
import { Link } from "react-router-dom";
import { Award, Mail, Phone, MapPin } from "lucide-react";
import PaymentMethodsSection from "@/components/home/PaymentMethodsSection";
import sudia_busniess_center from "../../public/sudia_busniess_center.jpeg";
import MyImage from "./LazyLoadingImage";
const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t dark:bg-gray-900 dark:border-gray-700">
      <div className="container py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-2">
              <Award className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-gray-800 dark:text-white">
                منصة A+
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              منصة لبيع وشراء الملخصات الجامعية بين الطلاب، وفر وقتك واستفد من
              خبرات زملائك
            </p>
            <div>
              <MyImage
                src={sudia_busniess_center}
                alt={"sudia busniess center image"}
              />
              <h1 className="text-2xl font-bold text-center mt-4">
                7050237267
              </h1>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-700 dark:text-gray-200">
              روابط سريعة
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                >
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  to="/notes"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                >
                  تصفح الملخصات
                </Link>
              </li>
              <li>
                <Link
                  to="/add-note"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                >
                  إضافة ملخص
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                >
                  الملف الشخصي
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-700 dark:text-gray-200">
              المساعدة
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/faq"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                >
                  الأسئلة الشائعة
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                >
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                >
                  شروط الاستخدام
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                >
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 lg:col-span-1">
            <PaymentMethodsSection />
          </div>
        </div>

        <div className="border-t dark:border-gray-700 mt-12 pt-6 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} منصة A+. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
