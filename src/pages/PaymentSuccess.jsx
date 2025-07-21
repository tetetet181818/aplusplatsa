import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useFileStore } from "../stores/useFileStore";
import { toast } from "@/components/ui/use-toast";
import LoadingSpinner from "../components/shared/LoadingSpinner";
const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const noteId = searchParams.get("noteId");
  const userId = searchParams.get("userId");
  const invoice_id = searchParams.get("invoice_id");
  const status = searchParams.get("status");
  const message = searchParams.get("message");
  const { purchaseNote, loading } = useFileStore();
  console.log(noteId, userId, invoice_id, status, message);
  useEffect(() => {
    if (noteId && userId) {
      purchaseNote({ noteId, userId, invoice_id, status, message }).then(
        (res) => {
          if (res) {
            toast({
              title: "تم الشراء بنجاح!",
              description: "تم شراء الملخص بنجاح",
              variant: "success",
            });
          }
        }
      );
    }
  }, [noteId, userId]);

  return (
    <div className="p-6 text-center h-screen w-screen flex justify-center items-center">
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
