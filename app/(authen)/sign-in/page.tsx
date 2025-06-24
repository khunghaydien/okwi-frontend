"use client";
import Input from "@/components/ui/input";
import SlashEyeIcon from "@/public/icons/slash-eye-icon";
import Link from "next/link";
import { useState } from "react";
import Button from "@/components/ui/button/Button";

export default function SignIn() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const handleIconClick = () => {
    setIsShowPassword(!isShowPassword);
  };
  return (
    <>
      <div className="text-center w-full">Login</div>
      <Input label="Email" placeholder="Enter" className="w-[368px] mb-4" />
      <Input
        label="Password"
        placeholder="Enter"
        className="w-[368px] mb-4"
        type={isShowPassword ? "text" : "password"}
        icon={isShowPassword ? <SlashEyeIcon /> : <SlashEyeIcon />}
        onIconClick={handleIconClick}
      />
      <div className="w-[368px] flex justify-end mb-4">
        <Link
          href="/forgot-password"
          className="text-sm text-black-600 hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <Button
        className="w-[368px] mb-2"
        variant="primary"
      >
        Login
      </Button>
    </>
  );
}
