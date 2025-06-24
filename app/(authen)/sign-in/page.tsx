"use client";
import Input from "@/components/ui/input";
import SlashEyeIcon from "@/public/icons/slash-eye-icon";
import { useState } from "react";

export default function SignIn() {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const handleIconClick = () => {
        setIsShowPassword(!isShowPassword);
    }
    return (
        <>
            <div className="text-center w-full">Login</div>
            <Input
                label="Email"
                placeholder="Enter"
                className="w-[368px] mb-4" />
            <Input
                label="Password"
                placeholder="Enter"
                className="w-[368px] mb-4"
                type={isShowPassword ? "text" : "password"}
                icon={isShowPassword ? <SlashEyeIcon /> : <SlashEyeIcon />}
                onIconClick={handleIconClick}
            />
        </>
    )
}