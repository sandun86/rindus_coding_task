export interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}

export interface CreateUserRequest {
    uuid: string;
    name: string;
    email: string;
    age: number;
}

export interface GetUserRequest {
    id: number;
}

export interface CreateUserData {
    name: string;
    email: string;
    age: number;
}

export interface CreatedUser {
    id: number;
}


export interface CreateUserResponse {
    status: boolean;
    statusCode: number;
    id: number | null;
    message: string;
}

export interface GetUserResponse {
    status: boolean;
    statusCode: number;
    data: User | null;
    message: string;
}