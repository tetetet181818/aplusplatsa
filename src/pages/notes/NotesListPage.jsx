import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useFileStore } from "@/stores/useFileStore";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import NotesListHeader from "./NotesListHeader";
import NotesSearchBar from "./NotesSearchBar";
import NotesSortDropdown from "./NotesSortDropdown";
import NotesFilterSection from "./NotesFilterSection";
import NotesResultsSection from "./NotesResultsSection";
import Pagination from "@/components/ui/Pagination";
import { universityData } from "@/data/universityData";
import { universities } from "../../constants/index";
const NotesListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [showFilters, setShowFilters] = useState(
    Boolean(
      searchParams.get("university") ||
        searchParams.get("college") ||
        searchParams.get("subject") ||
        searchParams.get("year") ||
        searchParams.get("maxPrice")
    )
  );

  const [isTyping, setIsTyping] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1
  );
  const itemsPerPage = 10;

  const {
    files: notes,
    loading: isLoadingNotes,
    searchNotes,
    universities,
    getCollegesByUniversity,
    totalNotes,
  } = useFileStore((state) => state);

  const [filters, setFilters] = useState({
    university: searchParams.get("university") || "",
    college: searchParams.get("college") || "",
    subject: searchParams.get("subject") || "",
    year: searchParams.get("year") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    sortBy: searchParams.get("sortBy") || "default",
  });

  const [filteredNotes, setFilteredNotes] = useState([]);
  const searchTimeoutRef = useRef(null);

  // Toggle filters visibility
  const toggleFilters = useCallback(() => {
    setShowFilters((prev) => !prev);
  }, []);

  useEffect(() => {
    const performSearch = async () => {
      try {
        const results = await searchNotes(
          searchQuery,
          filters,
          currentPage,
          itemsPerPage
        );
        setFilteredNotes(results?.data || []);
        setError(null);
      } catch (err) {
        setError("Failed to load notes");
        console.error("Error:", err);
      } finally {
        setIsTyping(false);
      }
    };

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    setIsTyping(true);
    searchTimeoutRef.current = setTimeout(performSearch, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, filters, currentPage, searchNotes, itemsPerPage]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (searchQuery) params.set("search", searchQuery);
    if (currentPage > 1) params.set("page", currentPage);

    Object.entries(filters).forEach(([key, value]) => {
      if (value && (key !== "sortBy" || value !== "default")) {
        params.set(key, value);
      }
    });

    setSearchParams(params, { replace: true });
  }, [searchQuery, filters, currentPage, setSearchParams]);

  useEffect(() => {
    const fetchColleges = async () => {
      if (!filters.university) {
        return;
      }

      try {
        const colleges = await getCollegesByUniversity(filters.university);
      } catch (err) {
        console.error("Error fetching colleges:", err);
      }
    };

    fetchColleges();
  }, [filters.university, getCollegesByUniversity]);

  const subjects = useMemo(
    () =>
      [
        ...new Set(filteredNotes.map((note) => note.subject).filter(Boolean)),
      ].sort(),
    [filteredNotes]
  );

  const years = useMemo(
    () =>
      [...new Set(filteredNotes.map((note) => note.year).filter(Boolean))].sort(
        (a, b) => b - a
      ),
    [filteredNotes]
  );

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "university" && { college: "" }), // Reset college when university changes
    }));
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback(
    (value) => handleFilterChange("sortBy", value),
    [handleFilterChange]
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = useCallback(() => {
    setFilters({
      university: "",
      college: "",
      subject: "",
      year: "",
      maxPrice: "",
      sortBy: "default",
    });
    setSearchQuery("");
    setCurrentPage(1);
    setShowFilters(false); // Also hide filters when clearing
  }, []);

  const hasActiveFilters = useMemo(
    () =>
      Object.entries(filters).some(
        ([key, value]) => value && (key !== "sortBy" || value !== "default")
      ) || searchQuery,
    [filters, searchQuery]
  );

  if (isLoadingNotes && !isTyping) {
    return <LoadingSpinner message="Loading notes..." />;
  }

  if (error && !isTyping) {
    return (
      <div className="container py-12 px-4 md:px-6">
        <div className="text-red-500 p-4 bg-red-50 rounded-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="container py-12 px-4 md:px-6">
      <NotesListHeader
        onToggleFilters={toggleFilters} // Use the toggle function here
        showFilters={showFilters}
        itemCount={filteredNotes.length}
        totalCount={totalNotes || 0}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
      />
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <NotesSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isLoading={isTyping}
        />
        <NotesSortDropdown
          sortBy={filters.sortBy}
          onSortChange={handleSortChange}
        />
      </div>
      {showFilters && (
        <div className="mb-6 transition-all duration-300 ease-in-out">
          <NotesFilterSection
            showFilters={showFilters}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
            universities={universities}
            subjects={subjects}
            years={years}
          />
        </div>
      )}
      {isTyping || isLoadingNotes ? (
        <LoadingSpinner message="جاري التحميل..." />
      ) : (
        <NotesResultsSection
          filteredNotes={filteredNotes}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
        />
      )}
      {totalNotes > itemsPerPage && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalNotes / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default NotesListPage;
