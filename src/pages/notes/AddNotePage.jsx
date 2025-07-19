import { motion } from "framer-motion";
import AddNoteForm from "@/components/add-note/AddNoteForm";
import AddNoteInstructions from "@/components/add-note/AddNoteInstructions";
import AddNoteLoginPrompt from "@/components/add-note/AddNoteLoginPrompt";
import AddNotePageHeader from "@/components/add-note/AddNotePageHeader";
import { universities } from "@/data/universityData";
import { useNavigate } from "react-router-dom";
const AddNotePage = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const userNotesCount = 0;
  if (!isAuthenticated) {
    return <AddNoteLoginPrompt onNavigate={navigate} />;
  }

  return (
    <div className="container py-12 px-4 md:px-6 bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
      <AddNotePageHeader onBack={() => navigate(-1)} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AddNoteForm
            universities={universities}
            userNotesCount={userNotesCount}
          />
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AddNoteInstructions />
        </motion.div>
      </div>
    </div>
  );
};

export default AddNotePage;
