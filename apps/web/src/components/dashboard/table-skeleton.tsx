import {
  CardFrame,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui";

export const TableSkeleton = () => {
  return (
    <CardFrame className="bg-surface-primary w-full">
      <Table variant="card" className="table-fixed">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {Array.from({ length: 5 }).map((_, i) => (
              <TableHead key={i}>
                <Skeleton className="h-4 w-full rounded-2xl" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: 9 }).map((_, row) => (
            <TableRow key={row}>
              {Array.from({ length: 5 }).map((_, col) => (
                <TableCell key={col}>
                  <Skeleton className="h-6 w-full rounded-xl" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardFrame>
  );
};
