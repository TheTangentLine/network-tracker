import { useState } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

import type { UserLogin } from '../../entities/User';

import { login } from '../../services/authService';


export default function useLogin() {
    const { user, setUser } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const handleLogin = async (input: UserLogin) => {
        setLoading(true);

        login(input)
            .then(u => {
                setUser({ ...user, username: u.data.username, email: u.data.email, phone: u.data.phone });
                navigate('/testing');
            })
            .catch(e => {
                setError(e.response.data.detail || 'An error occurred during login');
                return null;
            })
            .finally(() => {
                setLoading(false);
            });

        return user;
    };

    return { login: handleLogin, error, loading };
}