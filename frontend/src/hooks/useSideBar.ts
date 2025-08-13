import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'sidebar_visible';

export function useSideBar(defaultVisible = false) {
    
    // -------------------------- State management ----------------------------->

    const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(() => {
        if (typeof window === 'undefined') 
            return defaultVisible;

        const stored = window.localStorage.getItem(STORAGE_KEY);
        return stored === null ? defaultVisible : stored === 'true';
    });

    // -------------------------- Store state of sidebar ----------------------->

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, String(isSidebarVisible));
    }, [isSidebarVisible]);

    // -------------------------- Main function ------------------------>

    const toggleSidebar = useCallback(() => {
        setIsSidebarVisible(v => !v);
    }, []);

    // ----------------------------------------------------------------->

    return { isSidebarVisible, toggleSidebar };
}
