import React, { useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import Input from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CommonSelect } from "@/components/ui/select";
import { useFormik } from "formik";
import * as yup from "yup";

interface UserData {
  user_name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
}

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: UserData) => void;
  initialData?: UserData | null;
  mode?: "add" | "edit";
}

const defaultUser: UserData = {
  user_name: "",
  email: "",
  phone: "",
  role: "",
  status: "Active",
};

const validationSchema = yup.object({
  user_name: yup.string().required("User Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  role: yup.string().required("Role is required"),
  // status: yup.string().required("Status is required"), // add if you want to validate status
});

export default function UserModal({
  open,
  onClose,
  onSubmit,
  initialData,
  mode = "add",
}: UserModalProps) {
  const formik = useFormik({
    initialValues: initialData || defaultUser,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <Modal isOpen={open} onClose={onClose} title={mode === "edit" ? "Edit User" : "Add User"}>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <Input
          name="user_name"
          label="User Name"
          className="w-full"
          value={formik.values.user_name}
          onChange={formik.handleChange}
          error={!!formik.errors.user_name && !!formik.touched.user_name}
          errorMessage={formik.errors.user_name}
          required
        />
        <Input
          name="email"
          label="Email"
          className="w-full"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={!!formik.errors.email && !!formik.touched.email}
          errorMessage={formik.errors.email}
          required
        />
        <Input
          name="phone"
          label="Phone"
          className="w-full"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={!!formik.errors.phone && !!formik.touched.phone}
          errorMessage={formik.errors.phone}
          required
        />
       <CommonSelect
        //   name="role"
        //   label="Role"
          value={formik.values.role}
          onValueChange={value => formik.setFieldValue("role", value)}
          options={[
            { label: "Admin", value: "Admin" },
            { label: "Editor", value: "Editor" },
            { label: "Viewer", value: "Viewer" },
          ]}
          placeholder="Select Role"
          triggerClassName="w-[336px] mt-1 z-99999"
          contentClassName="w-[336px] mt-1 z-99999"
        //   error={!!formik.errors.role && !!formik.touched.role}
        //   errorMessage={formik.errors.role}
        //   required
        />
        {/* Add more fields as needed */}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="default" className="w-50 bg-[#F0F0F4]" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="default" className="w-50 bg-red-500 text-white hover:bg-red-400 cursor-pointer">
            {mode === "edit" ? "Save" : "Create"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}