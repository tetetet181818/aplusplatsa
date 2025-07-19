import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  User,
  LogOut,
  LogIn,
  UserPlus,
  BookOpen,
  PlusCircle,
  ShoppingBag,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import { motion } from "framer-motion";
import { NotificationBell } from "../notifications/NotificationBell";

const MobileMenu = ({
  isOpen,
  onClose,
  searchQuery,
  onSearchQueryChange,
  onSearchSubmit,
  isAuthenticated,
  onLogout,
  onLoginOpen,
  onRegisterOpen,
  user,
}) => {
  if (!isOpen) return null;

  const linkAction = (action) => () => {
    if (action) action();
    onClose();
  };

  return (
    <motion.div
      className="md:hidden absolute top-full left-0 right-0 bg-background shadow-lg border-t z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <div className="container py-4 px-5 space-y-4">
        <form onSubmit={onSearchSubmit} className="relative w-full">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="ابحث عن ملخصات..."
            className="w-full pr-10 pl-4 h-11"
            value={searchQuery}
            onChange={onSearchQueryChange}
          />
        </form>

        <div className="flex flex-col space-y-2">
          <Link to="/notes" onClick={linkAction()}>
            <Button
              variant="ghost"
              className="w-full justify-start text-base py-3"
            >
              <BookOpen className="ml-3 h-5 w-5 text-muted-foreground" />
              تصفح الملخصات
            </Button>
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/add-note" onClick={linkAction()}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-base py-3"
                >
                  <PlusCircle className="ml-3 h-5 w-5 text-muted-foreground" />
                  إضافة ملخص
                </Button>
              </Link>
              {user?.role === "admin" && (
                <Link
                  to="/dashboard"
                  className="cursor-pointer w-full flex items-center py-2 text-sm space-x-2"
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-base py-3"
                  >
                    <LayoutDashboard className="ml-2 h-4 w-4 text-muted-foreground" />
                    <span>لوحة التحكم</span>
                  </Button>
                </Link>
              )}
              <Link to="/profile" onClick={linkAction()}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-base py-3"
                >
                  <Settings className="ml-3 h-5 w-5 text-muted-foreground" />
                  إدارة الحساب
                </Button>
              </Link>
              <Link to="/profile?tab=purchased" onClick={linkAction()}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-base py-3"
                >
                  <ShoppingBag className="ml-3 h-5 w-5 text-muted-foreground" />
                  مشترياتي
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 dark:text-red-400 text-base py-3"
                onClick={linkAction(onLogout)}
              >
                <LogOut className="ml-3 h-5 w-5" />
                تسجيل الخروج
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                className="w-full justify-start text-base py-3"
                onClick={linkAction(onLoginOpen)}
              >
                <LogIn className="ml-3 h-5 w-5 text-muted-foreground" />
                تسجيل الدخول
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-base py-3"
                onClick={linkAction(onRegisterOpen)}
              >
                <UserPlus className="ml-3 h-5 w-5 text-muted-foreground" />
                إنشاء حساب
              </Button>
            </>
          )}
          {isAuthenticated && <NotificationBell />}
        </div>
      </div>
    </motion.div>
  );
};

export default MobileMenu;
