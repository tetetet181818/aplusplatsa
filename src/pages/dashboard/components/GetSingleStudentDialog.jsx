import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogTitle,
} from "../../../components/ui/dialog";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  User,
  Mail,
  School,
  Edit3,
  Trash2,
  Upload,
  Loader,
  DollarSign,
} from "lucide-react";
export default function GetSingleStudentDialog({
  showUser,
  setShowUser,
  selectUser,
  setSelectUser,
}) {
  const infoItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };
  return (
    <Dialog open={showUser} onOpenChange={() => setShowUser(false)}>
      <DialogContent className="max-w-md">
        <DialogTitle>عرض بيانات الطالب </DialogTitle>
        <DialogDescription>قم بتحديد الطالب لعرض بياناته</DialogDescription>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full max-w-3xl mx-auto"
        >
          <Card className="shadow-lg border-gray-200 dark:border-gray-700">
            <CardHeader className="border-b border-gray-200 dark:border-gray-700 pb-4 px-4 sm:px-6">
              <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                المعلومات الشخصية
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                تفاصيل الحساب في منصة A+
              </CardDescription>
            </CardHeader>

            <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Name Field */}
              <motion.div
                variants={infoItemVariants}
                className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
              >
                <div className="p-2 rounded-full bg-primary/10 dark:bg-primary/20">
                  <User className="h-5 w-5 text-primary dark:text-primary-light" />
                </div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    الاسم الكامل
                  </p>
                  <p className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200 mt-1">
                    {selectUser?.full_name || "غير محدد"}
                  </p>
                </div>
              </motion.div>

              {/* Email Field */}
              <motion.div
                variants={infoItemVariants}
                className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
              >
                <div className="p-2 rounded-full bg-primary/10 dark:bg-primary/20">
                  <Mail className="h-5 w-5 text-primary dark:text-primary-light" />
                </div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    البريد الإلكتروني
                  </p>
                  <p className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200 mt-1">
                    {selectUser.email}
                  </p>
                </div>
              </motion.div>

              {/* University Field */}
              <motion.div
                variants={infoItemVariants}
                className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
              >
                <div className="p-2 rounded-full bg-primary/10 dark:bg-primary/20">
                  <School className="h-5 w-5 text-primary dark:text-primary-light" />
                </div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    الجامعة
                  </p>
                  <p className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200 mt-1">
                    {selectUser.university || "لم يتم التحديد"}
                  </p>
                </div>
              </motion.div>
              <motion.div
                variants={infoItemVariants}
                className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
              >
                <div className="p-2 rounded-full bg-primary/10 dark:bg-primary/20">
                  <DollarSign className="h-5 w-5 text-primary dark:text-primary-light" />
                </div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    الرصيد
                  </p>
                  <p className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200 mt-1">
                    {selectUser.balance}
                  </p>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
