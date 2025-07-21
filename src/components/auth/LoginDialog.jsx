import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/stores/useAuthStore";
import { loginSchema } from "@/utils/validation/authValidation";
import { useFormik } from "formik";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import { Link } from "react-router-dom";

const LoginDialog = ({ isOpen, onClose, onSwitchToRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error, clearError, user } = useAuthStore(
    (state) => state
  );

  useEffect(() => {
    if (error) {
      toast({
        title: "فشل تسجيل الدخول",
        description: error,
        variant: "destructive",
      });
      clearError();
    }
  }, [error]);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const user = await login(values);
      if (user) {
        toast({ title: "تم تسجيل الدخول بنجاح!", variant: "success" });
        resetForm();
        onClose();
      }
      setSubmitting(false);
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>تسجيل الدخول</DialogTitle>
        <DialogDescription>
          مرحبا بعودتك قم بتسجيل الدخول للوصول للصفحة الرئيسية
        </DialogDescription>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  className="pl-10 pr-10"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500">{formik.errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type={showPassword ? "text" : "password"}
                  className="pl-10 pr-10" // Added padding for RTL
                  placeholder="**********"
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 left-0 pl-3 flex items-center outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-500">{formik.errors.password}</p>
              )}
            </div>
          </div>

          <Button
            className="w-full"
            type="submit"
            disabled={loading || formik.isSubmitting}
          >
            {loading || formik.isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                جارٍ الدخول...
              </>
            ) : (
              "تسجيل الدخول"
            )}
          </Button>
          <Link
            onClick={onClose}
            to="/forget-password"
            className="link hover:underline hover:text-blue-500 transition-colors my-10 text-center block"
          >
            نسيت كلمه المرور ؟
          </Link>
        </form>
        <GoogleLoginButton />
        <p className="text-center text-sm text-gray-500">
          لا تمتلك حساب؟{" "}
          <span
            className="text-blue-700 cursor-pointer font-semibold"
            onClick={onSwitchToRegister}
          >
            إنشاء حساب جديد
          </span>
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
