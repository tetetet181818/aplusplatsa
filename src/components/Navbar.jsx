import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import { Menu, X, Award } from "lucide-react";
import DesktopNav from "@/components/navbar/DesktopNav";
import MobileMenu from "@/components/navbar/MobileMenu";
import LoginDialog from "@/components/auth/LoginDialog";
import RegisterDialog from "@/components/auth/RegisterDialog";
const Navbar = ({ isRegisterDialogOpen, setIsRegisterDialogOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuthStore((state) => state);
  const [searchQuery, setSearchQuery] = useState("");
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const switchToRegister = () => {
    setIsLoginDialogOpen(false);
    setIsRegisterDialogOpen(true);
  };

  const switchToLogin = () => {
    setIsRegisterDialogOpen(false);
    setIsLoginDialogOpen(true);
  };
  const handleLogout = async () => {
    await logout();
  };
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => setIsMenuOpen(false)}
        >
          <Award className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-gray-800 dark:text-white">
            منصة A+
          </span>
        </Link>

        <DesktopNav
          isAuthenticated={isAuthenticated}
          user={user}
          onLoginOpen={() => setIsLoginDialogOpen(true)}
          onRegisterOpen={() => setIsRegisterDialogOpen(true)}
          handleLogout={handleLogout}
        />

        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        searchQuery={searchQuery}
        onSearchQueryChange={(e) => setSearchQuery(e.target.value)}
        isAuthenticated={isAuthenticated}
        user={user}
        onLoginOpen={() => {
          setIsLoginDialogOpen(true);
          setIsMenuOpen(false);
        }}
        onRegisterOpen={() => {
          setIsRegisterDialogOpen(true);
          setIsMenuOpen(false);
        }}
        handleLogout={handleLogout}
      />

      <LoginDialog
        isOpen={isLoginDialogOpen}
        onOpenChange={setIsLoginDialogOpen}
        onSwitchToRegister={switchToRegister}
        onClose={() => setIsLoginDialogOpen(false)}
      />

      <RegisterDialog
        isOpen={isRegisterDialogOpen}
        onOpenChange={setIsRegisterDialogOpen}
        onSwitchToLogin={switchToLogin}
        onClose={() => setIsRegisterDialogOpen(false)}
      />
    </header>
  );
};

export default Navbar;
