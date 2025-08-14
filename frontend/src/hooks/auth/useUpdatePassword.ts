import { useState } from 'react';
import { updatePassword } from '../../services/authService';
import type { UserUpdatePassword } from '../../entities/User';

export default function useUpdatePassword() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleUpdatePassword = async (userData: UserUpdatePassword): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            await updatePassword(userData);
            return true;        
        } catch (e: any) {
            setError(e.response?.data?.detail || 'An error occurred while updating password');
            return false;       
        } finally {
            setLoading(false);
        }
    };

    return { updatePassword: handleUpdatePassword, error, loading };
}
