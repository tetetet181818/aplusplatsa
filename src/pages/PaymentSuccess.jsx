import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useFileStore } from "../stores/useFileStore";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const noteId = searchParams.get("noteId");
  const userId = searchParams.get("userId");

  const { purchaseNote, loading } = useFileStore();

  useEffect(() => {
    if (noteId && userId) {
      purchaseNote({ noteId, userId }).then((res) => {
        if (res.success) {
          toast({
            title: "تم الشراء بنجاح!",
            description: "تم شراء الملخص بنجاح",
            variant: "success",
          });
        } else {
          toast({
            title: "فشل شراء الملخص",
            description: "فشل شراء الملخص برجاء المحاوله لاحقا",
            variant: "destructive",
          });
        }
      });
    }
  }, [noteId, userId]);

  return (
    <div className="p-6 text-center">
      {loading ? (
        <>
          <Loader2 className="size-5 animate-spin" />
          "جاري تأكيد الدفع..."
        </>
      ) : (
        <>
          <Link
            className="bg-blue-700 text-white p-5 rounded-sm text-xl  hover:underline hover:text-black transition-colors my-20"
            to={`/notes/${noteId}`}
          >
            الذهاب الي الملخص
          </Link>
        </>
      )}
    </div>
  );
};

export default PaymentSuccess;
