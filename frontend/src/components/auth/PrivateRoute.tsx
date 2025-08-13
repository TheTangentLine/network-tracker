import { type JSX } from 'react';
import { Navigate } from 'react-router-dom';
import useFetch from '../../hooks/auth/useFetch';

import Loading from '../Loading';

export default function PrivateRoute({ children }: { children: JSX.Element }) {

    // ------------------------- State management --------------------->

    const { user, loading } = useFetch();

    // ------------------------- Waiting for data ----------------------->

    if (loading) 
        return <Loading/>;

    // ------------------------ Handle navigation --------------------->
    
    if (!user) 
        return <Navigate to="/login" />;

    return children;
}