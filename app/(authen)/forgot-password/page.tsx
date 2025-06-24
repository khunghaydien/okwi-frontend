"use client";
import * as yup from "yup";
import { useFormik } from "formik";
import Input from "@/components/ui/input";
import { scrollToFirstElement } from "@/ultils/scroll-dom";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ForgotPassword() {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object({
      email: yup.string().nullable().required("Email is requied"),
    }),
    onSubmit: (values) => {
      setTimeout(() => {
        scrollToFirstElement("error-message-scroll");
      });
      handleSubmit(values);
    },
  });
  const { values, setFieldValue, errors, touched } = formik;

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
      <div className="text-center w-full">Forgot password</div>

      <Input
        value={values.email}
        onChange={(e) => onChangeValue(e.target.value, "email")}
        label="Email"
        placeholder="Enter"
        className="w-[368px] mb-2"
        error={!!errors.email && !!touched.email}
        errorMessage={errors.email}
      />

      <Button
        type="submit"
        className="w-[368px] mb-2 mt-5 bg-red-500 text-white hover:bg-red-400 cursor-pointer"
      >
        Continue
      </Button>

      <div className="w-[368px] flex justify-center mt-3">
        <Link href="/sign-in" className="text-sm text-blue-600 hover:underline">
          Login
        </Link>
      </div>
    </form>
  );
}
