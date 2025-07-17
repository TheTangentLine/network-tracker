import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'sidebar_visible';

export function useSideBar(defaultVisible = true) {
    // Lazy initializer reads from localStorage once
    const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(() => {
        if (typeof window === 'undefined') return defaultVisible;
        const stored = window.localStorage.getItem(STORAGE_KEY);
        return stored === null ? defaultVisible : stored === 'true';
    });

    // Whenever visibility changes, persist it
    useEffect(() => {
        try {
            window.localStorage.setItem(STORAGE_KEY, String(isSidebarVisible));
        } catch (err) {
            // localStorage might be unavailable or quota exceeded
            console.warn('Could not write sidebar visibility to localStorage', err);
        }
    }, [isSidebarVisible]);

    // Always the same function identity for toggling
    const toggleSidebar = useCallback(() => {
        setIsSidebarVisible(v => !v);
    }, []);

    return { isSidebarVisible, toggleSidebar };
}
