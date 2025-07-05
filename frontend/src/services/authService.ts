import apiClient from "./apiClient";

import type { UserLogin, UserRegister } from "../entities/User";

// ------------------------- Login ------------------------->

export const login = async (user: UserLogin) => {
    return apiClient.post("/auth/login", user);
};

// ------------------------- Register ------------------------->

export const register = async (user: UserRegister) => {
    return apiClient.post("/auth/register", user);
};

// -------------------------- Logout ------------------------->

export const logout = async () => {
    return apiClient.post("/auth/logout");
};

// ------------------------- Get User Info ------------------------->

export const fetchUser = async () => {
    return apiClient.get("/auth/me");
};