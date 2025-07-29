import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import UserMenu from "./UserMenu";
import { NotificationBell } from "../notifications/NotificationBell";

const DesktopNav = ({
  isAuthenticated,
  user,
  onLoginOpen,
  onRegisterOpen,
  onLogOutOpen,
}) => {
  return (
    <div className="hidden md:flex items-center gap-3">
      <Link to="/notes">
        <Button variant="ghost" className="text-base hover:bg-primary/10">
          تصفح الملخصات
        </Button>
      </Link>

      {isAuthenticated && user ? (
        <>
          <Link to="/add-note">
            <Button className="text-base bg-primary hover:bg-primary/90">
              <PlusCircle size={18} className="ml-2" /> إضافة ملخص
            </Button>
          </Link>
          <UserMenu onLogOutOpen={onLogOutOpen} user={user} />
        </>
      ) : (
        <>
          <Button
            variant="outline"
            onClick={onLoginOpen}
            className="text-base border-primary text-primary hover:bg-primary/10 hover:text-primary"
          >
            تسجيل الدخول
          </Button>
          <Button
            onClick={onRegisterOpen}
            className="text-base bg-primary hover:bg-primary/90"
          >
            إنشاء حساب
          </Button>
        </>
      )}
      {isAuthenticated && <NotificationBell />}
    </div>
  );
};

export default DesktopNav;
