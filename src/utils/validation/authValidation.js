import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("البريد الإلكتروني غير صالح")
    .trim()
    .required("البريد الإلكتروني مطلوب"),
  password: Yup.string()
    .trim()
    .min(8, "يجب أن لا تقل كلمة المرور عن 8 أحرف")
    .required("كلمة المرور مطلوبة"),
});

export const registerSchema = Yup.object({
  full_name: Yup.string()
    .required("اسم المستخدم مطلوب")
    .trim()
    .min(3, "يجب أن يكون اسم المستخدم 3 أحرف على الأقل"),
  email: Yup.string()
    .email("البريد الإلكتروني غير صالح")
    .trim()
    .required("البريد الإلكتروني مطلوب"),
  password: Yup.string()
    .trim()
    .required("كلمة المرور مطلوبة")
    .min(6, "يجب أن تكون كلمة المرور 6 أحرف على الأقل"),
  university: Yup.string().optional(),
});

export const updateSchema = Yup.object({
  full_name: Yup.string()
    .min(2, "الاسم الأول يجب أن يكون على الأقل حرفين")
    .max(50, "الاسم الأول يجب أن يكون أقل من 50 حرف")
    .required("الاسم الأول مطلوب"),
  email: Yup.string()
    .email("البريد الإلكتروني غير صحيح")
    .required("البريد الإلكتروني مطلوب"),
});
export const passwordSchema = Yup.object({
  password: Yup.string().required("كلمه المرور مطلوبه"),
  confirmPassword: Yup.string().required("تاكيد كلمه المرور مطلوب "),
});
export const resetPasswordValidation = Yup.object({
  email: Yup.string().required("البريد الإلكتروني مطلوب"),
  password: Yup.string()
    .min(6, "كلمة المرور يجب أن تتكون من 6 أحرف على الأقل")
    .required("كلمة المرور مطلوبة"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "كلمتا المرور غير متطابقتين")
    .required("تأكيد كلمة المرور مطلوب"),
});

export const validationForgetPassword = Yup.object({
  email: Yup.string()
    .email("يرجى إدخال بريد إلكتروني صحيح")
    .required("البريد الإلكتروني مطلوب"),
});
