import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import useAuth from "./useAuth";

export default function useLogout() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setUser, setSkipFetch } = useAuth()

    const navigate = useNavigate();

    const handleLogout = () => {
        setLoading(true);

        logout()
            .then(() => {
                setUser(null);
                setSkipFetch(true);
                navigate('/login');
            })
            .catch(e => {
                setError(e.response.detail || "Test thoi lam gi cang")
            })
            .finally(() => {
                setLoading(false);
            })
    }
    return { logout: handleLogout, loading, error }

}