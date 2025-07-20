import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useFileStore } from "../stores/useFileStore";
import { toast } from "@/components/ui/use-toast";
import LoadingSpinner from "../components/shared/LoadingSpinner";
const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const noteId = searchParams.get("noteId");
  const userId = searchParams.get("userId");

  const { purchaseNote, loading } = useFileStore();

  useEffect(() => {
    if (noteId && userId) {
      purchaseNote({ noteId, userId }).then((res) => {
        if (res) {
          toast({
            title: "تم الشراء بنجاح!",
            description: "تم شراء الملخص بنجاح",
            variant: "success",
          });
        }
      });
    }
  }, [noteId, userId]);

  return (
    <div className="p-6 text-center">
      {loading ? (
        <LoadingSpinner message="جاري تاكيد عمليه الدفع " />
      ) : (
        <>
          <Link
            className="bg-blue-700 text-white p-5 rounded-sm text-xl  hover:underline transition-colors my-20"
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
