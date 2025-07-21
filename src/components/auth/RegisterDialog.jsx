import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { registerSchema } from "@/utils/validation/authValidation";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import {
  Building2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import GoogleLoginButton from "./GoogleLoginButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { universities } from "../../constants/index";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

const RegisterDialog = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { register, loading, error, clearError } = useAuthStore(
    (state) => state
  );

  useEffect(() => {
    if (error) {
      toast({
        title: "فشل التسجيل",
        description: error,
        variant: "destructive",
      });
      clearError();
    }
  }, [error, clearError]);

  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      password: "",
      university: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!termsAccepted) {
        toast({
          title: "يجب الموافقة على الشروط والأحكام",
          variant: "destructive",
        });
        return;
      }

      const user = await register(values);
      if (user) {
        toast({ title: "تم إنشاء الحساب بنجاح" });
        resetForm();
        onClose();
      }
    },
  });

  const handleUniversityChange = (value) => {
    formik.setFieldValue("university", value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogTitle>إنشاء حساب جديد</DialogTitle>
        <DialogDescription>
          قم بإنشاء حساب جديد للوصول إلى كافة الميزات
        </DialogDescription>

        <form onSubmit={formik.handleSubmit} className="mt-4 space-y-4">
          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="full_name_field">اسم المستخدم</Label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                className="pr-10"
                id="full_name_field"
                name="full_name"
                value={formik.values.full_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.full_name && formik.errors.full_name && (
              <p className="text-sm text-red-500">{formik.errors.full_name}</p>
            )}
          </div>

          {/* Email */}
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
                className="pr-10"
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
            <Label htmlFor="university">الجامعة</Label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Building2 className="h-5 w-5 text-gray-400" />
              </div>
              <Select
                name="university"
                value={formik.values.university}
                onValueChange={handleUniversityChange}
                onBlur={() => formik.setFieldTouched("university", true)}
                className="pr-10"
              >
                <SelectTrigger
                  id="university"
                  className={
                    !formik.values.university ? "text-muted-foreground" : ""
                  }
                >
                  <SelectValue placeholder="اختر الجامعة" />
                </SelectTrigger>
                <SelectContent>
                  {universities?.map((uni) => (
                    <SelectItem key={uni} value={uni}>
                      {uni}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {formik.touched.university && formik.errors.university && (
              <p className="text-sm text-red-500">{formik.errors.university}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">كلمة المرور</Label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type={showPassword ? "text" : "password"}
                className="pr-10"
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

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-2 space-x-reverse">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked)}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                أوافق على{" "}
                <Link
                  to="/terms-of-service"
                  className="text-primary hover:underline"
                  target="_blank"
                >
                  الشروط والأحكام
                </Link>{" "}
                و{" "}
                <Link
                  to="/privacy-policy"
                  className="text-primary hover:underline"
                  target="_blank"
                >
                  سياسة الخصوصية
                </Link>
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || formik.isSubmitting || !termsAccepted}
            className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark transition flex items-center justify-center disabled:opacity-70"
          >
            {loading || formik.isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin ml-2" />
                جاري التسجيل...
              </>
            ) : (
              "إنشاء حساب"
            )}
          </button>
        </form>

        <Link
          to="/forget-password"
          className="link hover:underline hover:text-blue-500 transition-colors"
        >
          نسيت كلمه المرور
        </Link>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-gray-500">أو</span>
          </div>
        </div>

        <GoogleLoginButton />

        <div className="mt-6 text-center text-sm">
          لديك حساب؟{" "}
          <button
            type="button"
            className="font-semibold text-primary hover:underline"
            onClick={onSwitchToLogin}
          >
            تسجيل الدخول
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;
