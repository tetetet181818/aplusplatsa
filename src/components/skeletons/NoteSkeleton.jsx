const NoteSkeleton = () => {
  return (
    <div className="note-skeleton border rounded-lg p-4 bg-white shadow-sm animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div> {/* Title */}
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div> {/* Subject */}
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div> {/* Year */}
      <div className="h-4 bg-gray-200 rounded w-1/4"></div> {/* Price */}
    </div>
  );
};

export default NoteSkeleton;
