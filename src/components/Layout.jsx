import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const Layout = ({
  children,
  isRegisterDialogOpen,
  setIsRegisterDialogOpen,
}) => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        isRegisterDialogOpen={isRegisterDialogOpen}
        setIsRegisterDialogOpen={setIsRegisterDialogOpen}
      />
      <AnimatePresence mode="wait">
        <motion.main
          className="flex-grow"
          key={location?.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default Layout;
