import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, RefreshCw } from "lucide-react";
import { useNotificationsStore } from "../../stores/useNotificationsStore";

export function NotificationDemo() {
  const {
    loading,
    error,
    fetchNotifications,
    reset,
    notifications,
    getAllNotification,
  } = useNotificationsStore((state) => state);
  console.log(notifications);
  const [demoLoading, setDemoLoading] = useState({});
  useEffect(() => {
    getAllNotification();
  }, [getAllNotification]);
  // const handleDemoAction = async (key, action) => {
  //   setDemoLoading((prev) => ({ ...prev, [key]: true }));
  //   try {
  //     await action();
  //   } catch (error) {
  //     console.error("Demo action failed:", error);
  //   } finally {
  //     setDemoLoading((prev) => ({ ...prev, [key]: false }));
  //   }
  // };

  // const demoNotifications = [
  //   {
  //     key: "success",
  //     label: "نجح العملية",
  //     action: () =>
  //       showSuccess(
  //         "تم الحفظ بنجاح",
  //         "تم حفظ البيانات بنجاح في قاعدة البيانات"
  //       ),
  //     color: "bg-green-500 hover:bg-green-600",
  //   },
  //   {
  //     key: "error",
  //     label: "خطأ في النظام",
  //     action: () =>
  //       showError(
  //         "فشل في الاتصال",
  //         "تعذر الاتصال بالخادم، يرجى المحاولة مرة أخرى"
  //       ),
  //     color: "bg-red-500 hover:bg-red-600",
  //   },
  //   {
  //     key: "warning",
  //     label: "تحذير مهم",
  //     action: () =>
  //       showWarning(
  //         "مساحة التخزين منخفضة",
  //         "تبقى 15% فقط من مساحة التخزين المتاحة"
  //       ),
  //     color: "bg-yellow-500 hover:bg-yellow-600",
  //   },
  //   {
  //     key: "info",
  //     label: "معلومات عامة",
  //     action: () =>
  //       showInfo("تحديث جديد متاح", "يتوفر تحديث جديد للمنصة مع ميزات محسنة"),
  //     color: "bg-blue-500 hover:bg-blue-600",
  //   },
  //   {
  //     key: "student",
  //     label: "طالب جديد",
  //     action: () =>
  //       showStudentNotification(
  //         "انضم طالب جديد",
  //         "انضم أحمد محمد إلى دورة React المتقدمة",
  //         { name: "أحمد محمد", email: "ahmed@example.com" },
  //         {
  //           actions: [
  //             {
  //               label: "عرض الملف",
  //               variant: "default",
  //               onClick: () => console.log("View profile"),
  //             },
  //             {
  //               label: "إرسال ترحيب",
  //               variant: "outline",
  //               onClick: () => console.log("Send welcome"),
  //             },
  //           ],
  //         }
  //       ),
  //     color: "bg-purple-500 hover:bg-purple-600",
  //   },
  //   {
  //     key: "sale",
  //     label: "مبيعة جديدة",
  //     action: () =>
  //       showSaleNotification(
  //         "عملية شراء جديدة",
  //         "تم شراء دورة JavaScript بقيمة 299 ر.س من قبل فاطمة علي",
  //         {
  //           actions: [
  //             {
  //               label: "عرض التفاصيل",
  //               variant: "default",
  //               onClick: () => console.log("View details"),
  //             },
  //           ],
  //         }
  //       ),
  //     color: "bg-green-600 hover:bg-green-700",
  //   },
  //   {
  //     key: "file",
  //     label: "ملف جديد",
  //     action: () =>
  //       showFileNotification(
  //         "تم رفع ملف جديد",
  //         "تم رفع ملف 'دليل المطور.pdf' إلى مكتبة الدورات"
  //       ),
  //     color: "bg-indigo-500 hover:bg-indigo-600",
  //   },
  //   {
  //     key: "system",
  //     label: "إشعار النظام",
  //     action: () =>
  //       showSystemNotification(
  //         "صيانة مجدولة",
  //         "ستتم صيانة النظام غداً من الساعة 2:00 إلى 4:00 صباحاً"
  //       ),
  //     color: "bg-gray-500 hover:bg-gray-600",
  //   },
  // ];

  // const showMultipleNotifications = async () => {
  //   setDemoLoading((prev) => ({ ...prev, multiple: true }));
  //   try {
  //     await showStudentNotification("طالب جديد", "انضم محمد أحمد للمنصة", {
  //       name: "محمد أحمد",
  //     });
  //     setTimeout(async () => {
  //       await showSaleNotification("مبيعة جديدة", "تم شراء دورة بقيمة 199 ر.س");
  //     }, 500);
  //     setTimeout(async () => {
  //       await showSuccess("تم التحديث", "تم تحديث بيانات الطالب بنجاح");
  //     }, 1000);
  //     setTimeout(async () => {
  //       await showInfo("تذكير", "لديك 3 مهام معلقة تحتاج للمراجعة");
  //     }, 1500);
  //   } catch (error) {
  //     console.error("Multiple notifications failed:", error);
  //   } finally {
  //     setTimeout(() => {
  //       setDemoLoading((prev) => ({ ...prev, multiple: false }));
  //     }, 2000);
  //   }
  // };

  return (
    // <Card className="border-0 shadow-lg">
    //   <CardHeader className="pb-4">
    //     <div className="flex items-center justify-between">
    //       <div>
    //         <CardTitle className="text-xl font-semibold">
    //           تجربة نظام الإشعارات
    //         </CardTitle>
    //         <CardDescription>
    //           اختبر أنواع مختلفة من الإشعارات مع حالات التحميل
    //         </CardDescription>
    //       </div>
    //       <div className="flex items-center space-x-2 space-x-reverse">
    //         {Object.values(loading).some(Boolean) && (
    //           <Badge variant="secondary" className="animate-pulse">
    //             <Loader2 className="h-3 w-3 animate-spin ml-1" />
    //             جاري المعالجة
    //           </Badge>
    //         )}
    //         {error && (
    //           <Badge variant="destructive" className="text-xs">
    //             خطأ
    //           </Badge>
    //         )}
    //       </div>
    //     </div>
    //   </CardHeader>
    //   <CardContent className="space-y-4">
    //     <div className="grid gap-3 md:grid-cols-2">
    //       {demoNotifications.map((demo) => (
    //         <Button
    //           key={demo.key}
    //           onClick={() => handleDemoAction(demo.key, demo.action)}
    //           disabled={demoLoading[demo.key] || loading.adding}
    //           className={`${demo.color} text-white font-medium h-12 transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
    //         >
    //           {demoLoading[demo.key] ? (
    //             <>
    //               <Loader2 className="h-4 w-4 animate-spin ml-2" />
    //               جاري الإرسال...
    //             </>
    //           ) : (
    //             demo.label
    //           )}
    //         </Button>
    //       ))}
    //     </div>

    //     <div className="pt-4 border-t border-muted space-y-3">
    //       <Button
    //         onClick={showMultipleNotifications}
    //         disabled={demoLoading.multiple || loading.adding}
    //         variant="outline"
    //         className="w-full h-12 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold transition-all duration-200 bg-transparent disabled:opacity-50"
    //       >
    //         {demoLoading.multiple ? (
    //           <>
    //             <Loader2 className="h-4 w-4 animate-spin ml-2" />
    //             جاري إرسال الإشعارات...
    //           </>
    //         ) : (
    //           "عرض إشعارات متعددة"
    //         )}
    //       </Button>

    //       <div className="flex space-x-2 space-x-reverse">
    //         <Button
    //           onClick={fetchNotifications}
    //           disabled={loading.fetching}
    //           variant="outline"
    //           className="flex-1 h-10 bg-transparent"
    //         >
    //           {loading.fetching ? (
    //             <>
    //               <Loader2 className="h-4 w-4 animate-spin ml-2" />
    //               جاري التحميل...
    //             </>
    //           ) : (
    //             <>
    //               <RefreshCw className="h-4 w-4 ml-2" />
    //               تحميل الإشعارات
    //             </>
    //           )}
    //         </Button>

    //         <Button
    //           onClick={reset}
    //           variant="outline"
    //           className="flex-1 h-10 text-destructive hover:bg-destructive hover:text-white bg-transparent"
    //         >
    //           إعادة تعيين
    //         </Button>
    //       </div>
    //     </div>

    //     {/* Loading States Display */}
    //     <div className="pt-4 border-t border-muted">
    //       <h4 className="text-sm font-medium mb-2">حالات التحميل النشطة:</h4>
    //       <div className="grid grid-cols-2 gap-2 text-xs">
    //         {Object.entries(loading).map(([key, isLoading]) => (
    //           <div
    //             key={key}
    //             className="flex items-center justify-between p-2 bg-muted/30 rounded"
    //           >
    //             <span className="capitalize">{key}</span>
    //             {isLoading ? (
    //               <Loader2 className="h-3 w-3 animate-spin text-primary" />
    //             ) : (
    //               <div className="w-3 h-3 rounded-full bg-green-500" />
    //             )}
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </CardContent>
    // </Card>
  );
}
