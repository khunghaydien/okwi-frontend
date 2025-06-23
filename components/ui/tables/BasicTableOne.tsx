import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/tables/table";

interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: any, row: T) => React.ReactNode;
}

interface BasicTableOneProps<T> {
  data: T[];
  columns: Column<T>[];
}

export default function BasicTableOne<T>({
  data,
  columns,
}: BasicTableOneProps<T>) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="">
          <Table>
            {/* Table Header */}
            <TableHeader>
              <TableRow className="bg-[#2F3033]">
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    isHeader
                    className="px-4 py-2 text-[16px] font-light text-white text-center border border-gray-200"
                  >
                    {column.header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex} className="border border-gray-200">
                  {columns.map((column, colIndex) => (
                    <TableCell
                      key={colIndex}
                      className="px-4 py-3 font-light text-[15px] text-gray-700 text-center border border-gray-200"
                    >
                      {column.render
                        ? column.render(row[column.accessor], row)
                        : (row[column.accessor] as React.ReactNode)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
