export interface User {
    username: string;
    email: string;
}

export interface UserLogin {
    username: string;
    password: string;
}

export interface UserRegister {
    username: string;
    phone: string;
    email: string;
    password: string;
    nationality: string;
}