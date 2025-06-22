"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import DashboardIcon from "@/public/icons/dashboard-icon";
import PostManagementIcon from "@/public/icons/post-management-icon";
import ReportIcon from "@/public/icons/report-icon";
import AIGenContentIcon from "@/public/icons/ai-gen-content-icon";
import PostAnalysisIcon from "@/public/icons/post-analysis-icon";
import MediaIcon from "@/public/icons/media-icon";
import UserManagementIcon from "@/public/icons/user-management-icon";
import Logo from "@/public/icons/logo";

type NavItem = {
    name: string;
    icon: React.ReactNode;
    path: string;
    subItems?: { name: string; path: string }[];
};

const navItems: NavItem[] = [
    {
        icon: <DashboardIcon />,
        name: "Dashboard",
        path: "/dashboard",
    },
    {
        icon: <PostManagementIcon />,
        name: "Post Management",
        path: "/post-management",
    },
    {
        icon: <ReportIcon />,
        name: "Report",
        path: "/report",
        subItems: [
            { name: "Channel", path: "/report/channel" },
            { name: "Homepage", path: "/report/homepage" }
        ]
    },
    {
        icon: <AIGenContentIcon />,
        name: "AI Gen Content",
        path: "/ai-gen-content",
    },
    {
        icon: <PostAnalysisIcon />,
        name: "Post Analysis",
        path: "/post-analysis",
    },
    {
        icon: <MediaIcon />,
        name: "Media",
        path: "/media",
    },
    {
        icon: <UserManagementIcon />,
        name: "User Management",
        path: "/user-management",
    },
];
const AppSidebar: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();
    const renderMenuItems = (
        navItems: NavItem[]
    ) => (
        <ul className="flex flex-col">
            {navItems.map((nav, index) => (
                <li key={nav.name}>
                    {nav.subItems?.length ? (
                        <>
                            <button
                                onClick={() => handleSubmenuToggle(index)}
                                className={`cursor-pointer flex justify-start gap-2 py-3 pl-6 w-full ${openSubmenu?.index === index && "bg-[#B82D3B]"}`}
                            >
                                <span>{nav.icon}</span>
                                <span>{nav.name}</span>
                            </button>
                            <div
                                ref={(el) => {
                                    subMenuRefs.current[`${index}`] = el;
                                }}
                                className="overflow-hidden transition-all duration-300"
                                style={{
                                    height:
                                        openSubmenu?.index === index
                                            ? `${subMenuHeight[`${index}`]}px`
                                            : "0px",
                                }}
                            >
                                <ul className="bg-[#CF3B4B]">
                                    {(nav.subItems ?? []).map((subItem) => (
                                        <li key={subItem.name}>
                                            <button
                                                onClick={() => router.push(subItem.path)}
                                                className={`cursor-pointer flex justify-start gap-2 py-3 pl-6 w-full`}
                                            >
                                                <div className="w-6 h-6 flex items-center justify-center">
                                                    {isActive(subItem.path) && (
                                                        <span className="bg-white w-2 h-2 rounded-full"></span>)
                                                    }
                                                </div>
                                                <span>{subItem.name}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>) : (
                        <button
                            onClick={() => nav.path && router.push(nav.path)}
                            className={`cursor-pointer flex justify-start gap-2 py-3 pl-6 w-full ${isActive(nav.path) && "bg-[#B82D3B]"}`}
                        >
                            <span>{nav.icon}</span>
                            <span className={`menu-item-text`}>{nav.name}</span>
                        </button>
                    )}
                </li>
            ))}
        </ul>
    );

    const [openSubmenu, setOpenSubmenu] = useState<{
        index: number;
    } | null>(null);
    const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
    const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const isActive = useCallback((path: string) => path === pathname, [pathname]);
    useEffect(() => {
        let submenuMatched = false;
        navItems.forEach((nav, index) => {
            if (nav.subItems) {
                nav.subItems.forEach((subItem) => {
                    if (isActive(subItem.path)) {
                        setOpenSubmenu({
                            index,
                        });
                        submenuMatched = true;
                    }
                });
            }
        });
        if (!submenuMatched) {
            setOpenSubmenu(null);
        }
    }, [pathname, isActive]);

    useEffect(() => {
        if (openSubmenu !== null) {
            const key = `${openSubmenu.index}`;
            if (subMenuRefs.current[key]) {
                setSubMenuHeight((prevHeights) => ({
                    ...prevHeights,
                    [key]: subMenuRefs.current[key]?.scrollHeight || 0,
                }));
            }
        }
    }, [openSubmenu]);

    const handleSubmenuToggle = (index: number) => {
        setOpenSubmenu((prevOpenSubmenu) => {
            if (
                prevOpenSubmenu &&
                prevOpenSubmenu.index === index
            ) {
                return null;
            }
            return { index };
        });
    };

    return (
        <aside
            className="h-screen w-[236px] text-white py-6"
            style={{
                background: "linear-gradient(178.13deg, #E84246 0.83%, #D14760 99.44%)",
            }}>
            <div
                className={`flex justify-center h-[104px]`}
            >
                <Link href="/">
                    <Logo />
                </Link>
            </div>
            <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar mt-8">
                <nav >
                    <div className="flex flex-col">
                        <div>
                            {renderMenuItems(navItems)}
                        </div>
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default AppSidebar;
