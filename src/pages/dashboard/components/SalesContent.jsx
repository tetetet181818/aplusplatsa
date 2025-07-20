import {
  DollarSign,
  TrendingUp,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Search,
  Calendar,
} from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import SectionHeader from "@/components/ui/SectionHeader";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSalesStore } from "@/stores/useSalesStore";
import { useEffect, useState, useCallback } from "react";
import formatArabicDate from "@/config/formateTime";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StatCardSkeleton = () => (
  <Card className="animate-pulse">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-4 w-24 rounded" />
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-8 w-32 rounded" />
        <Skeleton className="h-4 w-20 rounded" />
      </div>
    </CardContent>
  </Card>
);

const statusOptions = [
  { value: "all", label: "جميع الحالات" },
  { value: "completed", label: "مكتمل" },
  { value: "pending", label: "قيد الانتظار" },
  { value: "failed", label: "فشل" },
];

export default function SalesContent() {
  const { toast } = useToast();
  const {
    sales,
    loading,
    error,
    totalSales,
    currentPage,
    itemsPerPage,
    getSales,
    getSalesStatistics,
    clearError,
    setCurrentPage,
    setItemsPerPage,
  } = useSalesStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const totalPages = Math.ceil(totalSales / itemsPerPage);

  const fetchData = useCallback(async () => {
    try {
      const filters = {
        search: searchQuery,
        ...(statusFilter !== "all" && { status: statusFilter }),
        ...(dateFrom && { dateFrom: dateFrom.toISOString() }),
        ...(dateTo && { dateTo: dateTo.toISOString() }),
      };

      await Promise.all([
        getSalesStatistics(),
        getSales(currentPage, itemsPerPage, filters),
      ]);
    } catch (err) {
      toast({
        title: "خطأ",
        description: "فشل في تحميل بيانات المبيعات",
        variant: "destructive",
      });
    }
  }, [
    currentPage,
    itemsPerPage,
    searchQuery,
    statusFilter,
    dateFrom,
    dateTo,
    getSales,
    getSalesStatistics,
  ]);

  useEffect(() => {
    fetchData();
    if (error) {
      toast({
        title: "خطأ",
        description: error,
        variant: "destructive",
      });
      clearError();
    }
  }, [fetchData, error, clearError]);

  const handlePageChange = useCallback(
    (newPage) => {
      if (newPage > 0 && newPage <= totalPages && !loading) {
        setCurrentPage(newPage);
        getSales(newPage, itemsPerPage, {
          search: searchQuery,
          ...(statusFilter !== "all" && { status: statusFilter }),
          ...(dateFrom && { dateFrom: dateFrom.toISOString() }),
          ...(dateTo && { dateTo: dateTo.toISOString() }),
        });
      }
    },
    [
      totalPages,
      loading,
      setCurrentPage,
      getSales,
      itemsPerPage,
      searchQuery,
      statusFilter,
      dateFrom,
      dateTo,
    ]
  );

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    setSearchTimeout(
      setTimeout(() => {
        setCurrentPage(1);
        getSales(1, itemsPerPage, {
          search: query,
          ...(statusFilter !== "all" && { status: statusFilter }),
          ...(dateFrom && { dateFrom: dateFrom.toISOString() }),
          ...(dateTo && { dateTo: dateTo.toISOString() }),
        });
      }, 300)
    );
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
    getSales(1, itemsPerPage, {
      search: searchQuery,
      ...(value !== "all" && { status: value }),
      ...(dateFrom && { dateFrom: dateFrom.toISOString() }),
      ...(dateTo && { dateTo: dateTo.toISOString() }),
    });
  };

  const handleItemsPerPageChange = (value) => {
    const newItemsPerPage = Number(value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    getSales(1, newItemsPerPage, {
      search: searchQuery,
      ...(statusFilter !== "all" && { status: statusFilter }),
      ...(dateFrom && { dateFrom: dateFrom.toISOString() }),
      ...(dateTo && { dateTo: dateTo.toISOString() }),
    });
  };

  /***
   *         invoice_id: invoice_id,
            status: status,
            message: message,
   */
  const columns = [
    {
      header: "الدورة",
      accessor: "files.title",
      label: "الدورة",
    },
    {
      header: "الطالب",
      accessor: "users.full_name",
      label: "الطالب",
    },
    {
      header: "رقم العملية",
      accessor: "invoice_id",
      label: "رقم العملية",
    },
    {
      header: "رساله الدفع",
      accessor: "message",
      label: "رساله الدفع",
    },

    {
      header: "المبلغ",
      accessor: "amount",
      label: "المبلغ",
      customRender: (amount) => `${amount?.toLocaleString() || 0} ر.س`,
    },
    {
      header: "التاريخ",
      accessor: "created_at",
      label: "التاريخ",
      customRender: (date) => formatArabicDate(date, { hijri: true }),
    },
    {
      header: "الحالة",
      accessor: "status",
      label: "الحالة",
      customRender: (status) => {
        const variantMap = {
          completed: "default",
          pending: "secondary",
          failed: "destructive",
        };
        const labelMap = {
          completed: "مكتمل",
          pending: "قيد الانتظار",
          failed: "فشل",
        };

        return (
          <Badge variant={variantMap[status] || "secondary"}>
            {labelMap[status] || status}
          </Badge>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
            <div>
              <CardTitle className="text-xl font-semibold">
                المبيعات الحديثة
              </CardTitle>
              <CardDescription>أحدث مشتريات الدورات والمعاملات</CardDescription>
            </div>
            <div className="flex flex-col gap-3 w-full sm:w-auto sm:flex-row">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="ابحث عن مبيعات..."
                  className="w-full pl-9"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  disabled={loading}
                />
              </div>
              <Select
                value={statusFilter}
                onValueChange={handleStatusFilterChange}
                disabled={loading}
              >
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="حالة البيع" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Desktop Table View */}
          <div className="hidden md:block rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead key={column.accessor}>{column.header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="h-8 w-8 animate-spin" />
                        <p>جاري تحميل البيانات...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : sales?.length > 0 ? (
                  sales.map((sale) => (
                    <TableRow key={sale.id}>
                      {columns.map((column) => (
                        <TableCell key={`${sale.id}-${column.accessor}`}>
                          {column.customRender
                            ? column.customRender(
                                column.accessor.includes(".")
                                  ? column.accessor
                                      .split(".")
                                      .reduce((obj, key) => obj?.[key], sale)
                                  : sale[column.accessor]
                              )
                            : column.accessor.includes(".")
                            ? column.accessor
                                .split(".")
                                .reduce((obj, key) => obj?.[key], sale)
                            : sale[column.accessor]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <p>لا توجد بيانات متاحة</p>
                        {searchQuery ||
                        statusFilter !== "all" ||
                        dateFrom ||
                        dateTo ? (
                          <Button
                            variant="ghost"
                            onClick={() => {
                              setSearchQuery("");
                              setStatusFilter("all");
                              setDateFrom(null);
                              setDateTo(null);
                              setCurrentPage(1);
                            }}
                          >
                            إعادة تعيين الفلتر
                          </Button>
                        ) : null}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {loading ? (
              <div className="rounded-md border p-4">
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <p>جاري تحميل البيانات...</p>
                </div>
              </div>
            ) : sales?.length > 0 ? (
              sales.map((sale) => (
                <div key={sale.id} className="rounded-md border p-4">
                  {columns.map((column) => (
                    <div
                      key={`${sale.id}-${column.accessor}`}
                      className="grid grid-cols-2 gap-2 py-2"
                    >
                      <div className="font-medium text-sm text-muted-foreground">
                        {column.header}
                      </div>
                      <div className="text-sm">
                        {column.customRender
                          ? column.customRender(
                              column.accessor.includes(".")
                                ? column.accessor
                                    .split(".")
                                    .reduce((obj, key) => obj?.[key], sale)
                                : sale[column.accessor]
                            )
                          : column.accessor.includes(".")
                          ? column.accessor
                              .split(".")
                              .reduce((obj, key) => obj?.[key], sale)
                          : sale[column.accessor]}
                      </div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className="rounded-md border p-4 h-24 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <p>لا توجد بيانات متاحة</p>
                  {searchQuery ||
                  statusFilter !== "all" ||
                  dateFrom ||
                  dateTo ? (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setSearchQuery("");
                        setStatusFilter("all");
                        setDateFrom(null);
                        setDateTo(null);
                        setCurrentPage(1);
                      }}
                    >
                      إعادة تعيين الفلتر
                    </Button>
                  ) : null}
                </div>
              </div>
            )}
          </div>

          {/* Pagination - Works for both views */}
          {totalPages > 1 && (
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mt-4">
              <div className="flex items-center gap-4">
                <div className="text-sm text-muted-foreground">
                  {loading ? (
                    <Skeleton className="h-4 w-48" />
                  ) : (
                    `عرض ${(currentPage - 1) * itemsPerPage + 1}-${Math.min(
                      currentPage * itemsPerPage,
                      totalSales
                    )} من ${totalSales?.toLocaleString() || 0} عملية بيع`
                  )}
                </div>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={handleItemsPerPageChange}
                  disabled={loading}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 10, 20, 50].map((size) => (
                      <SelectItem key={size} value={size.toString()}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1 || loading}
                  onClick={() => handlePageChange(1)}
                >
                  الأولى
                </Button>
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
                    <Skeleton className="h-4 w-16" />
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
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage >= totalPages || loading}
                  onClick={() => handlePageChange(totalPages)}
                >
                  الأخيرة
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
