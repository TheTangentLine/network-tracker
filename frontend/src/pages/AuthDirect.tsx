import { Navigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const AuthDirect = () => {
    const { user, loading } = useFetch();

    if (loading) return <div>Loading...</div>;
    if (user && user.username) {
        return <Navigate to="/testing" replace />;
    }
    return <Navigate to="/login" replace />;
}

export default AuthDirect;