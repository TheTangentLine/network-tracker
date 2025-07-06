import { useState } from 'react';
import { register } from '../services/authService';
import type { UserRegister } from '../entities/User';

export default function useRegister() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleRegister = async (userData: UserRegister): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            await register(userData);
            return true;        // success
        } catch (e: any) {
            // capture error message from response or fallback
            setError(e.response?.data?.detail || 'An error occurred during registration');
            return false;       // failure
        } finally {
            setLoading(false);
        }
    };

    return { register: handleRegister, error, loading };
}
