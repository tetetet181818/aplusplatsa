import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import {
  BookOpen,
  School,
  Star,
  UserCircle,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import NoteCard from "@/components/shared/NoteCard";
import { useFileStore } from "../stores/useFileStore";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const SellerProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    getUserById,
    loading: sellerLoading,
    seller,
    error: sellerError,
    clearError: clearSellerError,
  } = useAuthStore();

  const {
    getSellerNotes,
    loading: notesLoading,
    error: notesError,
    clearError: clearNotesError,
  } = useFileStore();

  const [sellerNotes, setSellerNotes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRetrying, setIsRetrying] = useState(false);

  const fetchSellerData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      clearSellerError();
      clearNotesError();

      const sellerData = await getUserById(userId);
      if (!sellerData) {
        throw new Error("لم يتم العثور على البائع");
      }
      return sellerData;
    } catch (err) {
      throw err;
    }
  }, [userId, getUserById, clearSellerError, clearNotesError]);

  const fetchSellerNotes = useCallback(
    async (sellerId) => {
      try {
        const notes = await getSellerNotes(sellerId);
        return notes || [];
      } catch (err) {
        throw err;
      }
    },
    [getSellerNotes]
  );

  const loadData = useCallback(async () => {
    try {
      const sellerData = await fetchSellerData();
      const notes = await fetchSellerNotes(sellerData.id);
      setSellerNotes(notes);
    } catch (err) {
      console.error("Error loading data:", err);
      setError(err.message || "حدث خطأ أثناء جلب البيانات");
      toast({
        title: "خطأ",
        description: err.message || "حدث خطأ أثناء جلب البيانات",
        variant: "destructive",
      });

      if (err.message.includes("لم يتم العثور")) {
        setTimeout(() => navigate("/notes"), 2000);
      }
    } finally {
      setIsLoading(false);
      setIsRetrying(false);
    }
  }, [fetchSellerData, fetchSellerNotes, toast, navigate]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (sellerError || notesError) {
      setError(sellerError || notesError);
      toast({
        title: "خطأ",
        description: sellerError || notesError,
        variant: "destructive",
      });
    }
  }, [sellerError, notesError, toast]);

  const handleRetry = () => {
    setIsRetrying(true);
    loadData();
  };

  if (isLoading || sellerLoading || isRetrying) {
    return (
      <div className="container py-12 px-4 md:px-6 flex flex-col items-center justify-center min-h-[60vh]">
        <LoadingSpinner
          message={
            isRetrying
              ? "جاري إعادة المحاولة..."
              : "جاري تحميل بيانات البائع..."
          }
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12 px-4 md:px-6 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <div className="max-w-md">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">حدث خطأ</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={handleRetry}
              variant="outline"
              disabled={isRetrying}
            >
              {isRetrying ? (
                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              إعادة المحاولة
            </Button>
            <Link to="/notes">
              <Button>العودة إلى الملخصات</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="container py-12 px-4 md:px-6 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <div className="max-w-md">
          <UserCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">لم يتم العثور على البائع</h2>
          <p className="text-gray-600 mb-6">
            عفواً، لا يمكننا العثور على معلومات البائع المطلوب.
          </p>
          <Link to="/notes">
            <Button variant="outline">العودة إلى الملخصات</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 px-4 md:px-6">
      {/* Seller Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-8 overflow-hidden shadow-lg">
          <div className="h-40 bg-gradient-to-r from-primary to-blue-500"></div>
          <CardContent className="p-6 pt-0 -mt-16">
            <div className="flex flex-col items-center md:flex-row md:items-end md:space-x-6">
              <Avatar className="h-32 w-32 border-4 border-background shadow-md">
                <AvatarImage
                  src={seller.avatar || ""}
                  alt={seller.full_name}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <AvatarFallback className="text-4xl bg-gray-200">
                  {seller?.full_name?.charAt(0) || "?"}
                </AvatarFallback>
              </Avatar>
              <div className="mt-4 md:mt-0 text-center md:text-left">
                <h1 className="text-3xl font-bold">
                  {seller.full_name || "بائع غير معروف"}
                </h1>
                {seller.university && (
                  <p className="text-gray-600 flex items-center justify-center md:justify-start mt-2">
                    <School className="ml-2 h-5 w-5 text-primary" />
                    {seller.university}
                  </p>
                )}
                <div className="flex items-center justify-center md:justify-start mt-4 space-x-4">
                  <Badge variant="secondary" className="px-3 py-1">
                    <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
                    {seller.rating || "غير متوفر"}
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1">
                    {sellerNotes.length} ملخص
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Seller Notes Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6">ملخصات {seller.full_name}</h2>

        {notesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-0">
                  <Skeleton className="h-40 w-full rounded-t-lg" />
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-6 w-3/4 rounded" />
                    <Skeleton className="h-4 w-1/2 rounded" />
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-2/3 rounded" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : sellerNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sellerNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={{
                  ...note,
                  author: seller.full_name,
                  authorId: seller.id,
                  avatar: seller.avatar,
                }}
              />
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-100 p-4 rounded-full">
                <BookOpen className="h-8 w-8 text-gray-400" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">لا توجد ملخصات</h3>
            <p className="text-gray-600">
              هذا البائع لم يقم بإضافة أي ملخصات بعد.
            </p>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default SellerProfilePage;
