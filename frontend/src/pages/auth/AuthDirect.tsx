import { Navigate } from "react-router-dom";
import useFetch from "../../hooks/auth/useFetch";
import LoadingPage from "./LoadingPage";

const AuthDirect = () => {
    const { user, loading } = useFetch();

    if (loading) {
        return <LoadingPage />;
    }
    if (user && user.username) {
        return <Navigate to="/testing" replace />;
    }
    return <Navigate to="/login" replace />;
}

export default AuthDirect;