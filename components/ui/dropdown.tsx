"use client";
import Link from "next/link";
import type React from "react";
import { useEffect, useRef } from "react";

interface DropdownProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}

interface DropdownItemProps {
    tag?: "a" | "button";
    href?: string;
    onClick?: () => void;
    onItemClick?: () => void;
    baseClassName?: string;
    className?: string;
    children: React.ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({
    isOpen,
    onClose,
    children,
    className = "",
}) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                !(event.target as HTMLElement).closest('.dropdown-toggle')
            ) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);


    if (!isOpen) return null;

    return (
        <div
            ref={dropdownRef}
            className={`${className}`}
        >
            {children}
        </div>
    );
};
export const DropdownItem: React.FC<DropdownItemProps> = ({
    tag = "button",
    href,
    onClick,
    onItemClick,
    baseClassName = "",
    className = "",
    children,
}) => {
    const combinedClasses = `${baseClassName} ${className}`.trim();

    const handleClick = (event: React.MouseEvent) => {
        if (tag === "button") {
            event.preventDefault();
        }
        if (onClick) onClick();
        if (onItemClick) onItemClick();
    };

    if (tag === "a" && href) {
        return (
            <Link href={href} className={combinedClasses} onClick={handleClick}>
                {children}
            </Link>
        );
    }

    return (
        <button onClick={handleClick} className={combinedClasses}>
            {children}
        </button>
    );
};