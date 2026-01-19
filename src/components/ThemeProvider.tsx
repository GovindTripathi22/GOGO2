/**
 * ThemeProvider
 * Applies CMS settings (colors, fonts) to the root element via CSS variables
 */

"use client";

import { useEffect } from "react";

interface ThemeSettings {
    primaryColor: string;
    accentColor: string;
    [key: string]: any;
}

export default function ThemeProvider({
    settings,
    children
}: {
    settings: ThemeSettings;
    children: React.ReactNode;
}) {
    // Apply theme
    const style = {
        '--color-primary': settings.primaryColor,
        '--color-accent': settings.accentColor || '#ED6A21',
    } as React.CSSProperties;

    return (
        <div style={style} className="contents">
            {children}
        </div>
    );
}
