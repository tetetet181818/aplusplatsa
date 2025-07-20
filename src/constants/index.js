import { Users, FileText, DollarSign, Download, BarChart3 } from "lucide-react";

export const universities = [
  "جامعة الملك سعود",
  "جامعة الإمام محمد بن سعود ",
  "جامعة الملك فهد للبترول والمعادن",
  "جامعة الملك عبدالعزيز",
  "جامعة الملك خالد",
];

export const universityColleges = {
  "جامعة الملك سعود": [
    "كلية الطب",
    "كلية الهندسة",
    "كلية علوم الحاسب",
    "كلية الصيدلة",
    "كلية إدارة الأعمال",
    "كلية النشاط البدني والرياضي",
    "كلية العمارة والتخطيط",
  ],
  "جامعة الملك فهد للبترول والمعادن": [
    "كلية الهندسة الكيميائية",
    "كلية الهندسة الكهربائية",
    "كلية الهندسة الميكانيكية",
    "كلية هندسة الحاسب",
    "كلية الهندسة المدنية",
    "كلية الهندسة الصناعية",
    "كلية علوم الحاسب",
    "كلية إدارة الأعمال",
    "كلية العلوم",
  ],
  "جامعة الملك عبدالعزيز": [
    "كلية الطب",
    "كلية الهندسة",
    "كلية علوم الحاسب",
    "كلية الصيدلة",
    "كلية إدارة الأعمال",
    "كلية الإعلام",
    "كلية الآداب",
  ],
  "جامعة الإمام محمد بن سعود": [
    "كلية الشريعة",
    "كلية أصول الدين",
    "كلية الطب",
    "كلية القانون",
    "كلية إدارة الأعمال",
    "كلية الهندسة",
    "كلية الإعلام",
  ],
  "جامعة الملك خالد": [
    "كلية الطب",
    "كلية الهندسة",
    "كلية الحاسب الآلي",
    "كلية إدارة الأعمال",
    "كلية الصيدلة",
    "كلية العلوم الطبية التطبيقية",
    "كلية الهندسة",
    "كلية التربية",
  ],
};

export const navigationItems = [
  { title: "لوحة التحكم", icon: BarChart3, id: "dashboard" },
  { title: "الطلاب", icon: Users, id: "students" },
  { title: "الملفات", icon: FileText, id: "files" },
  { title: "المبيعات", icon: DollarSign, id: "sales" },
  { title: "السحوبات", icon: Download, id: "withdrawals" },
];

export const MAX_NOTES_PER_USER = 50;
export const MAX_FILE_SIZE_MB = 30;
export const MAX_PAGES_PER_NOTE = 300;
export const ALLOWED_FILE_TYPES = ["application/pdf"];
export const ALLOWED_FILE_TYPES_STRING = "application/pdf";

export const SAUDI_BANKS = [
  { name: "البنك الأهلي التجاري", code: "NCB" },
  { name: "مصرف الراجحي", code: "RJHI" },
  { name: "البنك السعودي البريطاني", code: "SABB" },
  { name: "البنك السعودي الفرنسي", code: "BSF" },
  { name: "البنك السعودي للاستثمار", code: "SAIB" },
  { name: "بنك الرياض", code: "RIBL" },
  { name: "البنك العربي الوطني", code: "ANB" },
  { name: "بنك البلاد", code: "BLAD" },
  { name: "بنك الجزيرة", code: "JAZIRA" },
  { name: "بنك الإنماء", code: "INMA" },
  { name: "بنك الخليج الدولي", code: "GIB" },
  { name: "بنك سامبا", code: "SAMBA" },
];
