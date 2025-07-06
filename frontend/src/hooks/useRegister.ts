import { useState } from 'react';
import { register } from '../services/authService';
import type { UserRegister } from '../entities/User';

export default function useRegister() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);


    const handleRegister = async (userData: UserRegister) => {
        setLoading(true);
        register(userData)
            .catch(e => {
                setError(e.response.data.detail || 'An error occurred during registration');
                return null;
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return { register: handleRegister, error, loading };
}