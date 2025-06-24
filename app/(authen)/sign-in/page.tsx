"use client";
import Input from "@/components/ui/input";
import SlashEyeIcon from "@/public/icons/slash-eye-icon";
import { useState } from "react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { scrollToFirstElement } from "@/ultils/scroll-dom";
import * as yup from 'yup'

export default function SignIn() {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: yup.object({
            email: yup.string().nullable().required('Email is requied'),
            password: yup.string().nullable().required('Email is required'),
        }),
        onSubmit: (values) => {
            setTimeout(() => {
                scrollToFirstElement("error-message-scroll");
            });
            handleSubmit(values);
        },
    });
    const { values, setFieldValue, errors, touched } = formik;
    const [isShowPassword, setIsShowPassword] = useState(false);
    const handleIconClick = () => {
        setIsShowPassword(!isShowPassword);
    }
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
            <div className="text-center w-full">Login</div>
            
            <Input
                value={values.email}
                onChange={(e) => onChangeValue(e.target.value, "email")}
                label="Email"
                placeholder="Enter"
                className="w-[368px] mb-4"
                error={!!errors.email && !!touched.email}
                errorMessage={errors.email}
            />
            <Input
                value={values.password}
                onChange={(e) => onChangeValue(e.target.value, "password")}
                label="Password"
                placeholder="Enter"
                className="w-[368px] mb-4"
                type={isShowPassword ? "text" : "password"}
                icon={isShowPassword ? <SlashEyeIcon /> : <SlashEyeIcon />}
                error={!!errors.password && !!touched.password}
                errorMessage={errors.email}
                onIconClick={handleIconClick}
            />
            <Button type="submit">
                Login
            </Button>
        </form>
    )
}