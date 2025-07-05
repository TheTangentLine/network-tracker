import React, { createContext, useState } from 'react';
import type { User } from '../entities/User';

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    skipFetch: boolean;
    setSkipFetch: (skip: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [skipFetch, setSkipFetch] = useState(false);

    return (
        <AuthContext.Provider value={{ user, setUser, skipFetch, setSkipFetch }}>
            {children}
        </AuthContext.Provider>
    );
};