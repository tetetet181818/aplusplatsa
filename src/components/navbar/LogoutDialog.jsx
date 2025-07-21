import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useState } from "react";
import { Eye, EyeOff, Loader, Lock, LogOut } from "lucide-react";
import { Input } from "../ui/input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuthStore } from "../../stores/useAuthStore";

export default function LogoutDialog({ openDialog, onClose }) {
  const { logout, loading } = useAuthStore((state) => state);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
        .required("كلمة المرور مطلوبة"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("values", { password: values.password });
      logout({ password: values.password });
      resetForm();
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Dialog open={openDialog} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LogOut className="h-5 w-5 text-destructive" />
            تأكيد تسجيل الخروج
          </DialogTitle>
          <DialogDescription>
            هل أنت متأكد أنك تريد تسجيل الخروج من حسابك؟
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="relative">
            {/* Lock icon */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>

            {/* Password input */}
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="أدخل كلمة المرور"
              className="px-10"
            />

            {/* Eye toggle button */}
            <button
              type="button"
              className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 hover:text-gray-600"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Validation error message */}
          {formik.touched.password && formik.errors.password ? (
            <div className="text-sm text-red-600">{formik.errors.password}</div>
          ) : null}

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <Loader className="size-5 animate-spin" />
                <span>جاري تسجيل الخروج....</span>
              </div>
            ) : (
              "تأكيد"
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
