export interface User {
    username: string;
    email: string;
    phone: string;
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

export interface UserUpdatePassword {
    username: string;
    phone: string;
    email: string;
    current_password: string;
    new_password: string;
}