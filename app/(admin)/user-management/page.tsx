"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input";
import BasicTableOne from "@/components/ui/tables/BasicTableOne";
import TrashIcon from "@/public/icons/trash-icon";
import EyeIcon from "@/public/icons/eye-icon";
import PenIcon from "@/public/icons/pen-editing-icon";
import { fetchUsers } from "@/services/user-services";
import { CommonPagination } from "@/components/ui/tables/Pagination";
import { CommonSelect } from "@/components/ui/select";
const PAGE_SIZE = 6;

const selectOptions = [
  { label: "All", value: "nn" },
  { label: "Admin", value: "admin" },
  { label: "Editor", value: "editor" },
  { label: "Viewer", value: "viewer" },
];

export default function BasicTables() {
  const {
    data: fetchedUsers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["fetchedUsers"],
    queryFn: fetchUsers,
  });

  const [currentPage, setCurrentPage] = React.useState(1);

  // Paginate data
  const paginatedData = React.useMemo(() => {
    if (!fetchedUsers) return [];
    const start = (currentPage - 1) * PAGE_SIZE;
    return fetchedUsers.slice(start, start + PAGE_SIZE);
  }, [fetchedUsers, currentPage]);

  // Table columns
  const columns = [
    { header: "User name", accessor: "user_name" },
    { header: "Email", accessor: "email" },
    { header: "Phone", accessor: "phone" },
    { header: "Role", accessor: "role" },
    { header: "Create date", accessor: "create_date" },
    { header: "Status", accessor: "status" },
    {
      header: "Action",
      accessor: "action",
      render: (_: any, row: any) => (
        <div className="flex items-center justify-center gap-x-2">
          <button
            onClick={() => {
              console.log("view details");
            }}
            title="View"
          >
            <EyeIcon className="w-4 h-4 text-gray-500 hover:text-blue-500" />
          </button>
          <button
            onClick={() => {
              console.log("edit user");
            }}
            title="Edit"
          >
            <PenIcon className="w-4 h-4 text-gray-500 hover:text-green-500" />
          </button>
          <button
            onClick={() => {
              console.log("delete user");
            }}
            title="Delete"
          >
            <TrashIcon className="w-4 h-4 text-gray-500 hover:text-red-500" />
          </button>
        </div>
      ),
    },
  ];

  if (error) throw new Error("Lỗi khi tải danh sách người dùng");

  return (
    <div>
      <h1 className="ml-3 mt-5 text-xl font-bold-600 text-gray-800">
        User management
      </h1>
      <div className="topSection container mx-auto px-3 py-6">
        <div className="flex gap-x-4 items-center">
          <div className="flex-1">Total: {fetchedUsers?.length ?? 0}</div>
          <div className="flex items-center gap-x-3 ml-auto w-auto">
            <Input placeholder="Search name" className="placeholder:text-sm" />
            <CommonSelect
              placeholder="status"
              options={selectOptions}
              triggerClassName="w-[200px]"
              contentClassName="w-[200px]"
            />
            <Button
              variant="primary"
              size="md"
              onClick={() => console.log("Create User")}
              className="ml-4 mt-1"
            >
              + Add account
            </Button>
          </div>
        </div>
      </div>
      <div className="space-y-6 relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-gray-900/70 z-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div>
            <BasicTableOne data={paginatedData as any[]} columns={columns} />
            <div className="flex justify-end mt-4">
              <CommonPagination
                totalItems={fetchedUsers?.length ?? 0}
                itemsPerPage={PAGE_SIZE}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
