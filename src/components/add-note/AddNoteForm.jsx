// AddNoteForm.jsx
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  FileText,
  AlertCircle,
  ImageDown as ImageUp,
  CopyCheck as Checkbox,
  Loader,
} from "lucide-react";
import {
  MAX_NOTES_PER_USER,
  MAX_FILE_SIZE_MB,
  MAX_PAGES_PER_NOTE,
  ALLOWED_FILE_TYPES_STRING,
} from "@/constants/index.js";
import { addNoteSchema } from "../../utils/validation/fileValidation";
import { universityColleges } from "@/constants/index";
import { useFileStore } from "../../stores/useFileStore";
import { toast } from "@/components/ui/use-toast";

const AddNoteForm = ({ universities, userNotesCount }) => {
  const { createNote, loading } = useFileStore((state) => state);
  const canAddMoreNotes = userNotesCount < MAX_NOTES_PER_USER;
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [availableColleges, setAvailableColleges] = useState([]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: 0,
      university: "",
      college: "",
      subject: "",
      pagesNumber: 0,
      year: new Date().getFullYear(),
      contactMethod: "",
      file: null,
      imageFile: null,
    },
    validationSchema: addNoteSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await createNote(values);
        resetForm();
      } catch (err) {
        toast({
          title: "خطأ في إضافة الملخص",
          description: err.message || "حدث خطأ أثناء إضافة الملخص.",
          variant: "destructive",
        });
        console.error("Error adding note:", err);
      }
    },
  });

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (e.target.name === "file") {
      setIsUploadingFile(true);
      formik.setFieldValue("file", file);
      setIsUploadingFile(false);
    } else if (e.target.name === "imageFile") {
      setIsUploadingImage(true);
      formik.setFieldValue("imageFile", file);
      setIsUploadingImage(false);
    }
  };

  const handleSelectChange = (name, value) => {
    formik.setFieldValue(name, value);
    if (name === "university") {
      formik.setFieldValue("college", "");
    }
  };

  const handleUniversityChange = (value) => {
    formik.setFieldValue("university", value);
    formik.setFieldValue("college", "");
    setAvailableColleges(universityColleges[value] || []);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>معلومات الملخص</CardTitle>
        <CardDescription>
          أدخل معلومات الملخص الذي ترغب في بيعه.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!canAddMoreNotes && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-300 rounded-md text-yellow-700 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <span>
              لقد وصلت إلى الحد الأقصى لعدد الملخصات المسموح به (
              {MAX_NOTES_PER_USER} ملخص). لا يمكنك إضافة المزيد.
            </span>
          </div>
        )}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان الملخص *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="أدخل عنوان الملخص"
                  disabled={!canAddMoreNotes}
                />
                {formik.touched.title && formik.errors.title && (
                  <p className="text-sm text-red-500">{formik.errors.title}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">السعر (ريال) *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="أدخل سعر الملخص"
                  min="0"
                  step="0.01"
                  disabled={!canAddMoreNotes}
                />
                {formik.touched.price && formik.errors.price && (
                  <p className="text-sm text-red-500">{formik.errors.price}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">وصف الملخص *</Label>
              <Textarea
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="أدخل وصفاً تفصيلياً للملخص"
                rows={4}
                disabled={!canAddMoreNotes}
              />
              {formik.touched.description && formik.errors.description && (
                <p className="text-sm text-red-500">
                  {formik.errors.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="university">الجامعة *</Label>
                <Select
                  name="university"
                  value={formik.values.university}
                  onValueChange={handleUniversityChange}
                  disabled={!canAddMoreNotes}
                >
                  <SelectTrigger
                    id="university"
                    className={
                      !formik.values.university ? "text-muted-foreground" : ""
                    }
                  >
                    <SelectValue
                      placeholder={
                        <span className="text-gray-400">اختر الجامعة</span>
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {universities.map((uni) => (
                      <SelectItem key={uni} value={uni}>
                        {uni}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.university && formik.errors.university && (
                  <p className="text-sm text-red-500">
                    {formik.errors.university}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="college">الكلية *</Label>
                <Select
                  name="college"
                  value={formik.values.college}
                  onValueChange={(value) =>
                    handleSelectChange("college", value)
                  }
                  disabled={
                    !formik.values.university ||
                    availableColleges.length === 0 ||
                    !canAddMoreNotes
                  }
                >
                  <SelectTrigger id="college">
                    <SelectValue placeholder="اختر الكلية" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableColleges.map((col) => (
                      <SelectItem key={col} value={col}>
                        {col}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.college && formik.errors.college && (
                  <p className="text-sm text-red-500">
                    {formik.errors.college}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">المادة *</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="أدخل اسم المادة"
                  disabled={!canAddMoreNotes}
                />
                {formik.touched.subject && formik.errors.subject && (
                  <p className="text-sm text-red-500">
                    {formik.errors.subject}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="pagesNumber">
                  عدد الصفحات (الحد الأقصى: {MAX_PAGES_PER_NOTE})
                </Label>
                <Input
                  id="pagesNumber"
                  name="pagesNumber"
                  type="number"
                  value={formik.values.pagesNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="أدخل عدد الصفحات"
                  min="1"
                  max={MAX_PAGES_PER_NOTE}
                  disabled={!canAddMoreNotes}
                />
                {formik.touched.pagesNumber && formik.errors.pagesNumber && (
                  <p className="text-sm text-red-500">
                    {formik.errors.pagesNumber}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">السنة</Label>
                <Input
                  id="year"
                  name="year"
                  type="number"
                  value={formik.values.year}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="أدخل السنة"
                  min="2000"
                  max={new Date().getFullYear() + 5}
                  disabled={!canAddMoreNotes}
                />
                {formik.touched.year && formik.errors.year && (
                  <p className="text-sm text-red-500">{formik.errors.year}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactMethod">
                طريقة التواصل (واتساب/إيميل) *
              </Label>
              <Input
                id="contactMethod"
                name="contactMethod"
                value={formik.values.contactMethod}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="مثال: 05xxxxxxx أو example@mail.com"
                disabled={!canAddMoreNotes}
              />
              {formik.touched.contactMethod && formik.errors.contactMethod && (
                <p className="text-sm text-red-500">
                  {formik.errors.contactMethod}
                </p>
              )}
              <p className="text-xs text-gray-500">
                سيتم عرض هذه الوسيلة للمشترين للتواصل معك.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">
                ملف الملخص ({ALLOWED_FILE_TYPES_STRING}، الحد الأقصى:{" "}
                {MAX_FILE_SIZE_MB}MB) {"*"}
              </Label>
              <Input
                id="file"
                name="file"
                type="file"
                onChange={handleFileChange}
                accept={ALLOWED_FILE_TYPES_STRING}
                disabled={
                  !canAddMoreNotes ||
                  formik.values.removeFile ||
                  isUploadingFile
                }
                className={isUploadingFile ? "opacity-50" : ""}
              />
              {isUploadingFile && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 rounded-md">
                  <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                </div>
              )}

              {formik.values.file && (
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-primary" />
                  <span>
                    {formik.values.file.name} (
                    {(formik.values.file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
              )}
              {formik.values.fileName &&
                !formik.values.file &&
                !formik.values.removeFile && (
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-primary" />
                      <span>الملف الحالي: {formik.values.fileName}</span>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="removeFile"
                        name="removeFile"
                        checked={formik.values.removeFile}
                        onCheckedChange={(checked) =>
                          formik.setFieldValue("removeFile", checked)
                        }
                        className="ml-2"
                      />
                      <Label
                        htmlFor="removeFile"
                        className="text-xs text-red-500 cursor-pointer"
                      >
                        حذف الملف الحالي (يتطلب رفع ملف جديد)
                      </Label>
                    </div>
                  </div>
                )}
              {formik.touched.file && formik.errors.file && (
                <p className="text-sm text-red-500">{formik.errors.file}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageFile">
                صورة الغلاف (اختياري، JPG/PNG، حد أقصى 2MB)
              </Label>
              <Input
                id="imageFile"
                name="imageFile"
                type="file"
                onChange={handleFileChange}
                accept="image/jpeg, image/png"
                disabled={
                  !canAddMoreNotes ||
                  formik.values.removePreviewImage ||
                  isUploadingImage
                }
                className={isUploadingImage ? "opacity-50" : ""}
              />
              {isUploadingImage && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 rounded-md">
                  <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                </div>
              )}
              {formik.values.imageFile && (
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex items-center">
                  <ImageUp className="h-4 w-4 mr-2 text-primary" />
                  <span>
                    {formik.values.imageFile.name} (
                    {(formik.values.imageFile.size / 1024 / 1024).toFixed(2)}{" "}
                    MB)
                  </span>
                </div>
              )}
              {formik.values.previewImage &&
                !formik.values.imageFile &&
                !formik.values.removePreviewImage &&
                typeof formik.values.previewImage === "string" && (
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center">
                      <ImageUp className="h-4 w-4 mr-2 text-primary" />
                      <span>
                        صورة الغلاف الحالية:{" "}
                        <a
                          href={formik.values.previewImage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          عرض
                        </a>
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="removePreviewImage"
                        name="removePreviewImage"
                        checked={formik.values.removePreviewImage}
                        onCheckedChange={(checked) =>
                          formik.setFieldValue("removePreviewImage", checked)
                        }
                        className="ml-2"
                      />
                      <Label
                        htmlFor="removePreviewImage"
                        className="text-xs text-red-500 cursor-pointer"
                      >
                        حذف الصورة الحالية
                      </Label>
                    </div>
                  </div>
                )}
              {formik.touched.imageFile && formik.errors.imageFile && (
                <p className="text-sm text-red-500">
                  {formik.errors.imageFile}
                </p>
              )}
              <p className="text-xs text-gray-500">
                إذا لم تقم بإضافة صورة، سيتم استخدام صورة افتراضية.
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="flex items-center gap-2"
              disabled={loading || !canAddMoreNotes}
            >
              {loading ? (
                <>
                  <Loader className="size-5 animate-spin" />
                  <span>جاري التحميل...</span>
                </>
              ) : (
                <>
                  <Upload className="size-4" />
                  <span> إضافة الملخص</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddNoteForm;
