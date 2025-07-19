import { TableCell, TableRow } from "@/components/ui/table";
export default function TableRowSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <div className="h-4 w-32 bg-gray-200 rounded" />
      </TableCell>
      <TableCell>
        <div className="h-4 w-24 bg-gray-200 rounded" />
      </TableCell>
      <TableCell>
        <div className="h-4 w-16 bg-gray-200 rounded" />
      </TableCell>
      <TableCell>
        <div className="h-4 w-28 bg-gray-200 rounded" />
      </TableCell>
      <TableCell>
        <div className="h-4 w-12 bg-gray-200 rounded" />
      </TableCell>
    </TableRow>
  );
}
