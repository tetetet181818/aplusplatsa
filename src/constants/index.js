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
    "كلية الإدارة والأعمال",
    "كلية الهندسة",
    "كلية القانون",
    "كلية الطب",
  ],
  "جامعة الملك عبدالعزيز": [
    "كلية الإدارة والأعمال",
    "كلية الهندسة",
    "كلية القانون",
    "كلية الطب",
  ],
  "جامعة الإمام محمد بن سعود ": [
    "كلية الإدارة والأعمال",
    "كلية الهندسة",
    "كلية القانون",
    "كلية الطب",
  ],
  "جامعة الملك فهد للبترول والمعادن": [
    "كلية الإدارة والأعمال",
    "كلية الهندسة",
    "كلية القانون",
    "كلية الطب",
  ],

  "جامعة الملك خالد": [
    "كلية الإدارة والأعمال",
    "كلية الهندسة",
    "كلية القانون",
    "كلية الطب",
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
