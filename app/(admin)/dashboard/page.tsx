"use client";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import SlashEyeIcon from "@/public/icons/slash-eye-icon";
import React from "react";
export default function page() {
  return (
    <>
      <div className="mb-8">
        <Input label="test" error="sai rồi" icon={<SlashEyeIcon />} />
      </div>
      <div>
        <Select label={"Select a fruit"} data={[{ value: 'apple', label: "Apple" }, { value: "banana", label: "Banana" }]} />
      </div>
    </>
  );
}
