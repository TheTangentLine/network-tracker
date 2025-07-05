import { type JSX } from 'react';
import { Navigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

export default function PrivateRoute({ children }: { children: JSX.Element }) {
    const { user, loading } = useFetch();

    if (loading) return <div>Loading...</div>;
    else if (!user) return <Navigate to="/login" />;
    return children;
}