import { Navigate } from "react-router-dom";
import useFetch from "../../hooks/auth/useFetch";

import Loading from "../../components/Loading";

const AuthDirect = () => {

    // ---------------------- State management -------------------------->

    const { user, loading } = useFetch();

    // --------------------- Waiting for data -------------------->

    if (loading) {
        return <Loading />;
    }

    // --------------------- Handling navigation ------------------>

    if (user && user.username) {
        return <Navigate to="/testing" replace />;
    }
    return <Navigate to="/login" replace />;
}

export default AuthDirect;