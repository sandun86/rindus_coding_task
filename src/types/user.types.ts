export interface User {
    id: string;
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
