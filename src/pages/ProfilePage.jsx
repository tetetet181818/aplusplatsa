import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/stores/useAuthStore";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { User, Edit, LogOut, Trash, AlertTriangle } from "lucide-react";

import UserProfileSummaryCard from "@/components/profile/UserProfileSummaryCard";
import EditProfileFormDialog from "@/components/profile/EditProfileFormDialog";
import UserNotesList from "@/components/profile/UserNotesList";
import PurchasedItemsDisplay from "@/components/profile/PurchasedItemsDisplay";
import DeleteConfirmationDialog from "@/components/dashboard/DeleteConfirmationDialog";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { universities } from "../data/universityData";
import { useFileStore } from "@/stores/useFileStore";
const ProfilePage = () => {
  const navigate = useNavigate();
  const {
    user,
    updateProfile,
    logout,
    isAuthenticated,
    loading: authLoading,
  } = useAuthStore();
  const { getSellerNotes } = useFileStore((state) => state);
  const { toast } = useToast();

  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const [userNotes, setUserNotes] = useState([]);
  const universitiesList = universities();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/");
      toast({
        title: "الرجاء تسجيل الدخول",
        description: "يجب عليك تسجيل الدخول لعرض هذه الصفحة.",
        variant: "destructive",
      });
    }
  }, [isAuthenticated, authLoading, navigate, toast]);

  useEffect(() => {
    if (isAuthenticated && user) {
      setUserNotes(getUserNotes(user.id));
    }
  }, [isAuthenticated, user, getUserNotes]);

  useEffect(() => {
    const getUserNotes = async () => {
      let res = await getSellerNotes({ sellerId: user.id });
      if (res) {
        setUserNotes(res);
      }
      console.log(res);
    };
    getUserNotes();
  }, []);
  const handleProfileUpdate = (profileData) => {
    if (updateProfile(profileData)) {
      setIsEditMode(false);
    }
  };

  const handleLogout = () => {
    if (logout()) {
      navigate("/");
    }
  };

  const handleDeleteNoteConfirmed = () => {
    if (noteToDelete && deleteNote(noteToDelete.id)) {
      setUserNotes((prev) => prev.filter((n) => n.id !== noteToDelete.id));
      toast({
        title: "نجاح",
        description: `تم حذف الملخص "${noteToDelete.title}" بنجاح.`,
      });
    } else if (noteToDelete) {
      toast({
        title: "خطأ",
        description: "فشل حذف الملخص. حاول مرة أخرى.",
        variant: "destructive",
      });
    }
    setIsDeleteDialogOpen(false);
    setNoteToDelete(null);
  };

  const requestDeleteNote = (note) => {
    setNoteToDelete(note);
    setIsDeleteDialogOpen(true);
  };

  if (authLoading || notesLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="container py-12 px-4 md:px-6 flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <User className="h-16 w-16 mx-auto text-primary mb-4" />
            <CardTitle className="text-2xl">مطلوب تسجيل الدخول</CardTitle>
            <CardDescription>
              يجب عليك تسجيل الدخول لعرض صفحة الملف الشخصي.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              يرجى تسجيل الدخول أو إنشاء حساب جديد للوصول إلى هذه الصفحة.
            </p>
            <Button onClick={() => navigate("/")} className="w-full">
              العودة إلى الرئيسية
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-12 px-4 md:px-6">
      <motion.h1
        className="text-4xl font-extrabold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 dark:from-sky-400 dark:to-blue-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        الملف الشخصي
      </motion.h1>

      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <UserProfileSummaryCard
            user={user}
            onEdit={() => setIsEditMode(true)}
            onLogout={handleLogout}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        >
          <Tabs
            defaultValue="my-notes"
            className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-900/50">
              <TabsTrigger
                value="my-notes"
                className="py-3 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
              >
                ملخصاتي
              </TabsTrigger>
              <TabsTrigger
                value="purchases"
                className="py-3 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
              >
                مشترياتي
              </TabsTrigger>
            </TabsList>

            <TabsContent value="my-notes" className="p-6">
              <UserNotesList
                userNotes={userNotes}
                onNavigate={navigate}
                onDeleteRequest={requestDeleteNote}
              />
            </TabsContent>

            <TabsContent value="purchases" className="p-6">
              <PurchasedItemsDisplay onNavigate={navigate} />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {isEditMode && (
        <EditProfileFormDialog
          isOpen={isEditMode}
          onOpenChange={setIsEditMode}
          user={user}
          onUpdateProfile={handleProfileUpdate}
          universities={universitiesList}
        />
      )}

      {isDeleteDialogOpen && noteToDelete && (
        <DeleteConfirmationDialog
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={handleDeleteNoteConfirmed}
          noteTitle={noteToDelete.title}
        />
      )}
    </div>
  );
};

export default ProfilePage;
