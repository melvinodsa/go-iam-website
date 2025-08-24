'use client'

import { NavigationItem } from "@/components/Sidebar";
import { createContext } from "react";



export const DataContext = createContext<{ navigationItems: NavigationItem[] }>({ navigationItems: [] });


export function DataProvider({
    navigationItems,
    children,
}: {
    navigationItems: NavigationItem[];
    children: React.ReactNode;
}) {
    return (
        <DataContext.Provider value={{ navigationItems }}>
            {children}
        </DataContext.Provider>
    );
}