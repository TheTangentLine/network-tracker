import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { fetchUser } from "../../services/authService";

export default function useFetch() {
    const { user, setUser, skipFetch } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (skipFetch) {
            setLoading(false);
            return;
        }
        if (!user) {
            setLoading(true);
            fetchUser()
                .then(u => setUser(u.data || null))
                .catch(() => setUser(null))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [user, setUser, skipFetch]);

    return { user, loading }
}