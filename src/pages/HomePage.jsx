import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CallToActionSection from "@/components/home/CallToActionSection";
import { motion } from "framer-motion";
import BuyerSellerSection from "../components/home/BuyerSellerSection";
import { useAuthStore } from "@/stores/useAuthStore";
const HomePage = ({ setIsRegisterDialogOpen }) => {
  const { user } = useAuthStore((state) => state);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-b from-sky-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900"
    >
      <HeroSection />
      <FeaturesSection />
      <BuyerSellerSection />
      <CallToActionSection />
    </motion.div>
  );
};

export default HomePage;
