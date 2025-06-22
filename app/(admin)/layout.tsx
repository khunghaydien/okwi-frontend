"use client";
import AppHeader from "@/layout/app-header";
import AppSidebar from "@/layout/app-sidebar";
import React from "react";
export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen flex">
            <AppSidebar />
            <main className="flex-1 flex flex-col">
                <AppHeader />
                {children}
            </main>
        </div>
    );
}
