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
import { useDebounce } from "@/hooks/useDebounce";
import UserModal from "./userModal";

const PAGE_SIZE = 10;

const selectOptions = [
  { label: "All", value: "" },
  { label: "Active", value: 1 },
  { label: "Inactive", value: 0 },
];

export default function BasicTables() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState("all");
  const [openModal, setOpenModal] = React.useState(false);

  const debouncedSearch = useDebounce(search, 400);

  // Fetch paginated users from API
  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["fetchedUsers", currentPage, PAGE_SIZE, debouncedSearch, status],
    queryFn: () =>
      fetchUsers({
        page: currentPage,
        limit: PAGE_SIZE,
        search: debouncedSearch,
        status: status === "all" ? undefined : Number(status),
      }),
    keepPreviousData: true,
  });

  const users = data?.data || [];
  const pagination = data?.pagination || {};
  const totalItems = pagination.totalItems || 0;

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
          <div className="flex-1">Total: {totalItems}</div>
          <div className="flex items-center gap-x-3 ml-auto w-auto">
            <Input
              placeholder="Search name"
              className="placeholder:text-sm"
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
            <CommonSelect
              placeholder="status"
              options={[
                { label: "All", value: "all" },
                { label: "Active", value: "1" },
                { label: "Inactive", value: "0" },
              ]}
              triggerClassName="w-[200px]"
              contentClassName="w-[200px]"
              value={status}
              onValueChange={val => {
                setStatus(val);
                setCurrentPage(1);
              }}
            />
            <Button
              variant="primary"
              size="md"
              onClick={() => setOpenModal(true)}
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
            <BasicTableOne data={users as any[]} columns={columns} />
            <div className="flex justify-end mt-4">
              <CommonPagination
                totalItems={pagination.totalItems}
                itemsPerPage={pagination.pageSize}
                currentPage={pagination.currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        )}
      </div>
      <UserModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={(data) => {
          // handle create user logic here
          setOpenModal(false);
        }}
        mode="add"
      />
    </div>
  );
}
