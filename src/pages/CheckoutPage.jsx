import { useFileStore } from "@/stores/useFileStore";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
const CheckoutPage = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const { createPaymentLink } = useFileStore((state) => state);

  const noteId = searchParams.get("noteId");
  const userId = searchParams.get("userId");
  const amount = searchParams.get("amount");

  const handlePay = async () => {
    setLoading(true);
    const res = await createPaymentLink({ noteId, userId, amount });

    if (res && res.url) {
      toast({
        title: "تم انشاء الرابط",
        description: "تم انشاء الرابط وسوف يتم تحويلك الان",
        variant: "success",
      });
      window.location.href = res.url;
    } else {
      toast({
        title: "فشل في إنشاء رابط الدفع",
        description: "فشل في إنشاء رابط الدفع. حاول مره اخري ",
        variant: "destructive",
      });

      console.log(res.error);
    }

    setLoading(false);
  };

  return (
    <div className="p-8 max-w-xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">إتمام عملية الشراء</h2>
      <p className="mb-4">سيتم تحويلك إلى بوابة الدفع لإتمام شراء الملخص.</p>
      <Button onClick={handlePay} disabled={loading}>
        {loading ? "جاري التحويل..." : `ادفع الآن (${amount} ريال)`}
      </Button>
    </div>
  );
};

export default CheckoutPage;
