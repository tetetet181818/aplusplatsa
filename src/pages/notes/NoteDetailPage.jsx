import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertTriangle } from "lucide-react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import NoResults from "@/components/shared/NoResults";
import useNoteDetail from "@/hooks/useNoteDetail";
import {
  NoteHeader,
  NoteImage,
  NoteMeta,
  NoteDescription,
  NoteAuthorInfo,
  NoteActions,
  NotePurchaseConfirmationDialog,
  NoteDeleteConfirmationDialog,
} from "@/components/notes/NoteDetailComponents";
import NoteReviews from "@/components/notes/NoteReviews";
import ReviewDialog from "@/components/dashboard/ReviewDialog";

const NoteDetailPage = () => {
  const navigate = useNavigate();
  const {
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
    likeLoading,
    downloadLoading,
  } = useNoteDetail();

  if (!note && !error) {
    return <LoadingSpinner message="جاري تحميل الملخص..." />;
  }

  if (error || !note) {
    return (
      <NoResults
        icon={<AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />}
        title="حدث خطأ"
        message={error || "الملخص غير موجود"}
        actionButton={
          <Button onClick={() => navigate("/notes")}>
            العودة إلى قائمة الملخصات
          </Button>
        }
      />
    );
  }

  return (
    <motion.div
      className="container py-8 px-4 md:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2"
      >
        <ArrowRight className="h-4 w-4" /> العودة
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <NoteHeader
            title={note.title}
            price={note.price}
            rating={note.rating}
            loading={loading}
            noteId={note?.id}
            addNoteToLikeList={addNoteToLikeList}
            removeNoteFromLikeList={removeNoteFromLikeList}
            user={currentUser}
            likeLoading={likeLoading}
          />

          <NoteImage src={note.cover_url} alt={note.title} />
          <NoteDescription description={note.description} />
          <NoteReviews
            reviews={note.reviews || []}
            noteId={note.id}
            loading={loading}
          />
        </motion.div>

        <motion.div
          className="lg:col-span-1 space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <NoteMeta
            university={note.university}
            college={note.college}
            subject={note.subject}
            pages={note.pages_number}
            year={note.year}
            createdAt={note.created_at}
            downloads={note.downloads}
          />
          <NoteAuthorInfo
            authorId={note.owner_id}
            authorName={owner?.full_name}
            isOwner={isOwner}
          />
          <NoteActions
            isOwner={isOwner}
            hasPurchased={hasPurchased}
            price={note.price}
            onPurchase={handlePurchase}
            onEdit={() => navigate(`/add-note?edit=${note.id}`)}
            onDelete={() => setIsDeleteConfirmOpen(true)}
            onDownload={handleDownloadFile}
            downloadLoading={downloadLoading}
            onReview={handleReviewRequest}
            alreadyReviewed={alreadyReviewed}
            isAuthenticated={isAuthenticated}
            contactMethod={note.contact_method}
          />
        </motion.div>
      </div>

      <NotePurchaseConfirmationDialog
        isOpen={isPurchaseConfirmOpen}
        onOpenChange={setIsPurchaseConfirmOpen}
        onConfirm={confirmPurchase}
        noteTitle={note.title}
        notePrice={note.price}
      />

      {isOwner && (
        <NoteDeleteConfirmationDialog
          isOpen={isDeleteConfirmOpen}
          onOpenChange={setIsDeleteConfirmOpen}
          onConfirm={confirmDelete}
          noteTitle={note.title}
        />
      )}

      {isReviewDialogOpen && (
        <ReviewDialog
          isOpen={isReviewDialogOpen}
          onOpenChange={setIsReviewDialogOpen}
          noteTitle={note.title}
          currentUser={currentUser}
          onSubmit={() => true}
          existingReview={note.reviews?.find(
            (r) => r.userId === currentUser?.id
          )}
          noteId={note.id}
          addReviewToNote={addReviewToNote}
        />
      )}
    </motion.div>
  );
};

export default NoteDetailPage;
