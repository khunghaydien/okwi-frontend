"use client";
import Input from "@/components/ui/input";
import SlashEyeIcon from "@/public/icons/slash-eye-icon";
import { useState } from "react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { scrollToFirstElement } from "@/ultils/scroll-dom";
import * as yup from "yup";

export default function ChangePassword() {
  const formik = useFormik({
    initialValues: {
      new_password: "",
      confirm_password: "",
    },
    validationSchema: yup.object({
      new_password: yup.string().nullable().required("New password is requied"),
      confirm_password: yup
        .string()
        .nullable()
        .required("Confirm password is required")
        .oneOf([yup.ref("new_password"), null], "Password do not match"),
    }),
    onSubmit: (values) => {
      setTimeout(() => {
        scrollToFirstElement("error-message-scroll");
      });
      handleSubmit(values);
    },
  });
  const { values, setFieldValue, errors, touched } = formik;
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const onChangeValue = (value: unknown, keyname: string) => {
    setFieldValue(keyname, value);
  };
  const handleSubmit = async (values: any) => {
    try {
      console.log("Form submitted with values:", values);
    } catch (error) {
    } finally {
    }
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="text-center w-full">Change password</div>

      <Input
        value={values.new_password}
        onChange={(e) => onChangeValue(e.target.value, "new_password")}
        label="New password"
        placeholder="Enter"
        className="w-[368px] mb-2"
        type={showNewPassword ? "text" : "password"}
        icon={<SlashEyeIcon />}
        error={!!errors.new_password && !!touched.new_password}
        errorMessage={errors.new_password}
        onIconClick={() => setShowNewPassword((prev) => !prev)}
      />

      <Input
        value={values.confirm_password}
        onChange={(e) => onChangeValue(e.target.value, "confirm_password")}
        label="Re-enter"
        placeholder="Enter"
        className="w-[368px] mb-2"
        type={showConfirmPassword ? "text" : "password"}
        icon={<SlashEyeIcon />}
        error={!!errors.confirm_password && !!touched.confirm_password}
        errorMessage={errors.confirm_password}
        onIconClick={() => setShowConfirmPassword((prev) => !prev)}
      />

      <Button
        type="submit"
        className="w-[368px] mb-2 mt-5 bg-red-500 text-white hover:bg-red-400 cursor-pointer"
      >
        Submit
      </Button>
    </form>
  );
}
