"use client";
import React, { useState } from "react";
import Image from "next/image";
import PolygonIcon from "@/public/icons/polygon-icon";
import { Dropdown, DropdownItem } from "@/components/ui/dropdown";

export const UserDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setIsOpen((prev) => !prev);
    }

    function closeDropdown() {
        setIsOpen(false);
    }
    return (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                className="flex items-center dropdown-toggle gap-1"
            >
                <Image
                    width={32}
                    height={32}
                    src="/images/user-default.png"
                    alt="User"
                />
                <span>User Name</span>
                <PolygonIcon className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <Dropdown
                isOpen={isOpen}
                onClose={closeDropdown}
                className="absolute"
            >
                <ul className="w-[200px] bg-white shadow-lg rounded-lg">
                    <li>
                        <DropdownItem
                            onItemClick={closeDropdown}
                            tag="a"
                            href="/profile"
                            className="p-4"
                        >
                            Profile
                        </DropdownItem>
                    </li>
                    <li>
                        <DropdownItem
                            onItemClick={closeDropdown}
                            tag="a"
                            href="/change-password"
                            className="p-4"
                        >
                            Change password
                        </DropdownItem>
                    </li>
                    <li>
                        <DropdownItem
                            onItemClick={closeDropdown}
                            tag="a"
                            href="/sign-in"
                            className="p-4"
                        >
                            Logout
                        </DropdownItem>
                    </li>
                </ul>
            </Dropdown>
        </div>
    );
}
const AppHeader: React.FC = () => {
    return (
        <header className="h-16 flex items-center justify-end px-6 border-b border-gray-200 border-b-[1px]">
            <UserDropdown />
        </header>
    );
};

export default AppHeader;
