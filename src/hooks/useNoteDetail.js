import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/stores/useAuthStore";
import { useFileStore } from "@/stores/useFileStore";

const useNoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    user: currentUser,
    isAuthenticated,
    getUserById,
    seller,
    addNoteToLikeList,
    removeNoteFromLikeList,
    likeLoading,
  } = useAuthStore((state) => state);

  const {
    getSingleNote,
    note,
    deleteNote,
    downloadNote,
    addReviewToNote,
    loading,
    downloadLoading,
  } = useFileStore((state) => state);

  const [isPurchaseConfirmOpen, setIsPurchaseConfirmOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [error, setError] = useState(null);
  const [owner, setOwner] = useState(seller);

  const fetchNote = useCallback(async () => {
    if (!id) return setError("معرف الملخص غير صالح");
    try {
      await getSingleNote(id);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch note:", err);
    }
  }, [id, getSingleNote]);

  useEffect(() => {
    if (!id) return;
    fetchNote();
  }, [fetchNote]);
  useEffect(() => {
    if (!note?.owner_id) return;
    const handleGetUser = async () => {
      let res = await getUserById({ id: note?.owner_id });
    };
    handleGetUser();
  }, [note?.owner_id, getUserById]);

  const isOwner = currentUser?.id === note?.owner_id;
  const hasPurchased = note?.purchased_by?.includes(currentUser?.id);
  const alreadyReviewed = note?.reviews?.some(
    (r) => r.userId === currentUser?.id
  );

  const handlePurchase = () => {
    if (!isAuthenticated) {
      toast({
        title: "مطلوب تسجيل الدخول",
        description: "يرجى تسجيل الدخول أولاً لإتمام عملية الشراء",
        variant: "destructive",
      });
      return navigate("/login", { state: { from: `/notes/${id}` } });
    }
    setIsPurchaseConfirmOpen(true);
  };

  const confirmPurchase = () => {
    navigate(
      `/checkout?noteId=${note.id}&userId=${currentUser.id}&amount=${note.price}`
    );
  };

  const confirmDelete = async () => {
    try {
      const success = await deleteNote({ id: note.id });
      if (!success) throw new Error("فشل حذف الملخص");

      toast({
        title: "تم الحذف بنجاح",
        description: `تم حذف ملخص "${note.title}" بنجاح`,
      });
      navigate("/notes");
    } catch (err) {
      console.error("Delete failed:", err);
      toast({
        title: "فشل في الحذف",
        description: err.message || "حدث خطأ أثناء حذف الملخص",
        variant: "destructive",
      });
    } finally {
      setIsDeleteConfirmOpen(false);
    }
  };

  const handleReviewRequest = () => {
    if (!isAuthenticated) {
      toast({
        title: "مطلوب تسجيل الدخول",
        description: "يرجى تسجيل الدخول لتقييم الملخص",
        variant: "destructive",
      });
      return navigate("/login", { state: { from: `/notes/${id}` } });
    }
    if (!hasPurchased) {
      toast({
        title: "غير مسموح بالتقييم",
        description: "يجب شراء الملخص أولاً لتتمكن من تقييمه",
        variant: "destructive",
      });
      return;
    }
    setIsReviewDialogOpen(true);
  };

  const handleDownloadFile = useCallback(async () => {
    try {
      await downloadNote({ filePath: note.file_path });
    } catch (err) {
      console.error("Download error:", err);
    }
  }, [note?.file_path, downloadNote]);
  console.log();
  return {
    id,
    note,
    currentUser,
    owner,
    isOwner,
    hasPurchased,
    alreadyReviewed,
    isAuthenticated,
    isPurchaseConfirmOpen,
    isDeleteConfirmOpen,
    isReviewDialogOpen,
    setIsPurchaseConfirmOpen,
    setIsDeleteConfirmOpen,
    setIsReviewDialogOpen,
    handlePurchase,
    confirmPurchase,
    confirmDelete,
    handleReviewRequest,
    handleDownloadFile,
    addReviewToNote,
    error,
    loading,
    addNoteToLikeList,
    removeNoteFromLikeList,
    downloadLoading,
  };
};

export default useNoteDetail;
