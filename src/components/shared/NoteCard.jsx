import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, BookOpen, Layers, Download } from "lucide-react";
import { motion } from "framer-motion";
import MyImage from "../LazyLoadingImage";

const NoteCard = ({ note }) => {
  const cardVariants = {
    rest: { scale: 1, boxShadow: "0 4px 6px rgba(0,0,0,0.05)" },
    hover: {
      scale: 1.03,
      boxShadow:
        "0 10px 20px rgba(59, 130, 246, 0.1), 0 6px 6px rgba(59, 130, 246, 0.07)",
      transition: { duration: 0.2, ease: "circOut" },
    },
  };

  const imageVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2, ease: "circOut" } },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="h-full rounded-xl overflow-hidden"
    >
      <Link to={`/notes/${note.id}`} className="block h-full group">
        <Card className="h-full flex flex-col border border-gray-200 dark:border-gray-700 transition-all duration-300 bg-white dark:bg-gray-800 rounded-xl">
          <div className="relative aspect-[16/10] overflow-hidden">
            <motion.div variants={imageVariants} className="w-full h-full">
              <MyImage
                alt={note.title}
                className="w-full h-full object-cover"
                src={note.cover_url}
              />
            </motion.div>
            <div className="absolute top-2 right-2">
              <Badge className="bg-gradient-to-tr from-primary to-blue-500 text-white px-3 py-1.5 text-xs font-semibold shadow-lg rounded-md">
                {note.price > 0 ? `${note.price} ريال` : "مجاني"}
              </Badge>
            </div>
            {note.rating > 0 && (
              <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-xs flex items-center gap-1 shadow-md">
                <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold">{note.rating.toFixed(1)}</span>
              </div>
            )}
          </div>

          <CardContent className="p-4 flex flex-col flex-grow">
            <h3 className="font-bold text-md mb-1.5 line-clamp-2 text-gray-800 dark:text-white group-hover:text-primary transition-colors duration-200">
              {note.title}
            </h3>

            <div className="flex flex-wrap gap-1.5 mb-2.5">
              <Badge
                variant="outline"
                className="text-xs py-0.5 px-2 border-blue-300 text-blue-700 dark:border-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/40 rounded-full flex items-center gap-1"
              >
                <Layers className="h-3 w-3" /> {note.university}
              </Badge>
              <Badge
                variant="outline"
                className="text-xs py-0.5 px-2 border-green-300 text-green-700 dark:border-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/40 rounded-full flex items-center gap-1"
              >
                <BookOpen className="h-3 w-3" /> {note.subject}
              </Badge>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-xs mb-3 line-clamp-2 flex-grow">
              {note.description}
            </p>

            <div className="mt-auto pt-2 border-t border-gray-100 dark:border-gray-700/50">
              <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>{note.pages_number || "N/A"} صفحة</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="h-3.5 w-3.5" />
                  <span>{note.downloads || 0} تحميل</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default NoteCard;
