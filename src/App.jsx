import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import HomePage from "@/pages/HomePage";
import UserDashboardPage from "@/pages/UserDashboardPage";
import SellerProfilePage from "@/pages/SellerProfilePage";
import FAQPage from "@/pages/FAQPage";
import ContactUsPage from "@/pages/ContactUsPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import TermsOfServicePage from "@/pages/TermsOfServicePage";
import Layout from "@/components/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import NotesListPage from "./pages/notes/NotesListPage";
import NoteDetailPage from "@/pages/notes/NoteDetailPage";
import AddNotePage from "@/pages/notes/AddNotePage";
import { useAuthStore } from "./stores/useAuthStore";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentSuccess from "./pages/PaymentSuccess";
import ForgetPassword from "./components/auth/ForgetPassword";
import ResetPassword from "./components/auth/ResetPassword";
import { NotificationPanel } from "./components/notifications/NotificationBell";
import { useWithdrawalsStore } from "./stores/useWithdrawalsStore";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const { getUser, user } = useAuthStore((state) => state);
  const isAuthenticated = !!user;
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Layout
        isRegisterDialogOpen={isRegisterDialogOpen}
        setIsRegisterDialogOpen={setIsRegisterDialogOpen}
      >
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage setIsRegisterDialogOpen={setIsRegisterDialogOpen} />
            }
          />
          <Route path="/notes" element={<NotesListPage />} />
          <Route path="/notes/:id" element={<NoteDetailPage />} />
          <Route
            path="/add-note"
            element={<AddNotePage isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/add-note/:edit"
            element={<AddNotePage isAuthenticated={isAuthenticated} />}
          />
          <Route path="/profile" element={<UserDashboardPage />} />
          <Route path="/seller/:userId" element={<SellerProfilePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          {user?.role === "admin" && (
            <Route path="/dashboard" element={<Dashboard />} />
          )}
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Layout>
      <Toaster position="top-center" reverseOrder={false} />
      <NotificationPanel />
    </Router>
  );
}

export default App;
