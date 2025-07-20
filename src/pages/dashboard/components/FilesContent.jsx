import {
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
  Search,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useFileStore } from "@/stores/useFileStore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SectionHeader from "@/components/ui/SectionHeader";
import TableRowSkeleton from "@/components/skeletons/TableRowSkeleton";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";

// Helper function to truncate text
const truncateText = (text, maxLength = 20) => {
  if (!text) return "N/A";
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export default function FilesContent() {
  const itemsPerPage = parseInt(import.meta.env.VITE_ITEMS_PER_PAGE) || 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    university: "",
    college: "",
    subject: "",
    year: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const {
    getPaginatedNotes,
    loading,
    error,
    notes,
    downloadNote,
    getUniversities,
    getCollegesByUniversity,
    getNotesCount,
    downloadLoading,
  } = useFileStore();

  const [universities, setUniversities] = useState([]);
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    fetchNotes(currentPage);
    fetchUniversities();
  }, [currentPage, debouncedSearchQuery, filters]);

  useEffect(() => {
    if (filters.university) {
      fetchColleges(filters.university);
    } else {
      setColleges([]);
      setFilters((prev) => ({ ...prev, college: "" }));
    }
  }, [filters.university]);

  const fetchNotes = async (page) => {
    const result = await getPaginatedNotes(page, itemsPerPage, {
      search: debouncedSearchQuery,
      ...filters,
    });
    if (result) {
      setTotalItems(result.totalItems);
    }
  };

  const fetchUniversities = async () => {
    const data = await getUniversities();
    setUniversities(data);
  };

  const fetchColleges = async (university) => {
    const data = await getCollegesByUniversity(university);
    setColleges(data);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(totalItems / itemsPerPage)) {
      setCurrentPage(newPage);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      university: "",
      college: "",
      subject: "",
      year: "",
    });
    setSearchQuery("");
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const columns = [
    {
      header: "العنوان",
      accessor: "title",
      label: "العنوان",
      customRender: (title) => truncateText(title),
    },
    {
      header: "الوصف",
      accessor: "description",
      label: "الوصف",
      customRender: (description) => truncateText(description),
    },
    {
      header: "الجامعة",
      accessor: "university",
      label: "الجامعة",
      customRender: (university) => truncateText(university),
    },
    {
      header: "الكلية",
      accessor: "college",
      label: "الكلية",
      customRender: (college) => truncateText(college),
    },
    {
      header: "المادة",
      accessor: "subject",
      label: "المادة",
      customRender: (subject) => truncateText(subject),
    },
    {
      header: "السنة",
      accessor: "year",
      label: "السنة",
    },
    {
      header: "السعر",
      accessor: "price",
      label: "السعر",
      customRender: (price) => `${price} ر.س`,
    },
    {
      header: "تاريخ الإضافة",
      accessor: "created_at",
      label: "تاريخ الإضافة",
      customRender: (date) => new Date(date).toLocaleDateString(),
    },
    {
      header: "الإجراءات",
      customRender: (item) => (
        <div className="flex gap-2 justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => downloadNote({ filePath: item.file_path })}
            title="تنزيل"
            disabled={downloadLoading}
          >
            {downloadLoading ? (
              <Loader2 className="animate-spin h-4 w-4" />
            ) : (
              <Download className="h-4 w-4" />
            )}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="الملاحظات الدراسية"
        description="قائمة بجميع الملاحظات المرفوعة على المنصة"
      />

      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-semibold">الملاحظات</CardTitle>
            <CardDescription>
              {debouncedSearchQuery || Object.values(filters).some(Boolean)
                ? "نتائج البحث"
                : "جميع الملاحظات المتاحة"}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-4 w-full sm:w-auto">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="ابحث عن ملاحظة..."
                  className="pl-10 pr-4 py-2 text-sm w-full"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  disabled={loading}
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? "إخفاء الفلاتر" : "عرض الفلاتر"}
              </Button>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                <select
                  className="border rounded-md p-2 text-sm"
                  value={filters.university}
                  onChange={(e) =>
                    handleFilterChange("university", e.target.value)
                  }
                >
                  <option value="">كل الجامعات</option>
                  {universities.map((uni) => (
                    <option key={uni} value={uni}>
                      {uni}
                    </option>
                  ))}
                </select>

                <select
                  className="border rounded-md p-2 text-sm"
                  value={filters.college}
                  onChange={(e) =>
                    handleFilterChange("college", e.target.value)
                  }
                  disabled={!filters.university}
                >
                  <option value="">كل الكليات</option>
                  {colleges.map((college) => (
                    <option key={college} value={college}>
                      {college}
                    </option>
                  ))}
                </select>

                <Input
                  type="number"
                  placeholder="السنة"
                  className="p-2 text-sm"
                  value={filters.year}
                  onChange={(e) => handleFilterChange("year", e.target.value)}
                />

                {(filters.university ||
                  filters.college ||
                  filters.subject ||
                  filters.year) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500"
                    onClick={resetFilters}
                  >
                    مسح الفلاتر
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <div className="block md:hidden">
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <Card key={index} className="mb-4 animate-pulse">
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div className="h-4 w-3/4 bg-gray-200 rounded" />
                      <div className="h-4 w-1/2 bg-gray-200 rounded" />
                      <div className="h-4 w-2/3 bg-gray-200 rounded" />
                      <div className="h-4 w-1/3 bg-gray-200 rounded" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : error ? (
              <Card className="mb-4">
                <CardContent className="pt-4 text-center text-red-500">
                  {error}
                </CardContent>
              </Card>
            ) : notes?.length === 0 ? (
              <Card className="mb-4">
                <CardContent className="pt-4 text-center">
                  {debouncedSearchQuery || Object.values(filters).some(Boolean)
                    ? "لا توجد نتائج مطابقة للبحث"
                    : "لا توجد ملاحظات لعرضها"}
                </CardContent>
              </Card>
            ) : (
              notes?.map((note, index) => (
                <Card
                  key={note.id}
                  className="mb-4 border-muted/30 animate-slide-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      {columns
                        .filter((col) => col.accessor)
                        .map((column, colIndex) => (
                          <div key={colIndex} className="flex justify-between">
                            <span className="font-medium text-right">
                              {column.label}:
                            </span>
                            <span className="text-muted-foreground text-right line-clamp-1">
                              {column.customRender
                                ? column.customRender(note[column.accessor])
                                : note[column.accessor] || "N/A"}
                            </span>
                          </div>
                        ))}
                      <div className="flex justify-end gap-2 pt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            downloadNote({ filePath: note.file_path })
                          }
                          title="تنزيل"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-muted/50">
                  {columns.map((column, index) => (
                    <TableHead key={index} className="font-semibold text-right">
                      {column.header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRowSkeleton key={index} />
                  ))
                ) : error ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="text-center text-red-500 py-4"
                    >
                      {error}
                    </TableCell>
                  </TableRow>
                ) : notes?.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="text-center py-4"
                    >
                      {debouncedSearchQuery ||
                      Object.values(filters).some(Boolean)
                        ? "لا توجد نتائج مطابقة للبحث"
                        : "لا توجد ملاحظات لعرضها"}
                    </TableCell>
                  </TableRow>
                ) : (
                  notes?.map((note, index) => (
                    <TableRow
                      key={note.id}
                      className="border-b border-muted/30 hover:bg-muted/30 transition-colors animate-slide-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {columns.map((column, colIndex) => (
                        <TableCell key={colIndex} className="text-right">
                          {column.customRender
                            ? column.customRender(note[column.accessor] || note)
                            : note[column.accessor] || "N/A"}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-muted-foreground">
                {loading ? (
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                ) : (
                  `عرض ${(currentPage - 1) * itemsPerPage + 1}-${Math.min(
                    currentPage * itemsPerPage,
                    totalItems
                  )} من ${totalItems} ملاحظة`
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1 || loading}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <span className="text-sm">
                  {loading ? (
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                  ) : (
                    `الصفحة ${currentPage} من ${totalPages}`
                  )}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage >= totalPages || loading}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
