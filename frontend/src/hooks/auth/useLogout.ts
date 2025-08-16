import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";
import useAuth from "./useAuth";
import useDarkMode from "../useDarkMode";

export default function useLogout() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setUser, setSkipFetch } = useAuth()
    const { toggleDarkMode, isDarkMode } = useDarkMode()

    const navigate = useNavigate();

    const handleLogout = () => {
        setLoading(true);

        logout()
            .then(() => {
                setUser(null);
                setSkipFetch(true);
                // Reset to light mode on logout
                if(isDarkMode) {
                    toggleDarkMode();
                    // Force the theme change to persist
                    localStorage.setItem("theme", "light");
                    document.documentElement.classList.remove("dark");
                }
                navigate('/login');
            })
            .catch(e => {
                setError(e.response.detail || "Oops, try again later!")
            })
            .finally(() => {
                setLoading(false);
            })
    }
    return { logout: handleLogout, loading, error }

}