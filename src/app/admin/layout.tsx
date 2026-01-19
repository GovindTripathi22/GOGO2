/**
 * Admin Layout
 * Simplified wrapper - no auth checks for testing
 */

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "GoGo CMS",
    description: "Content Management System",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50">
            {children}
        </div>
    );
}
