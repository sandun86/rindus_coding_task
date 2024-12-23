import { ResultSetHeader, RowDataPacket } from "mysql2";
import { connection } from "../config/db";
import userService from "../services/user.service";
import { CreateUserData } from "../types/user.types";

// Mock connection
jest.mock("../config/db", () => ({
    connection: {
        execute: jest.fn(),
    },
}));

describe("User Service", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("createUser", () => {
        it("should insert a new user and return the user ID", async () => {
            const mockData: CreateUserData = { name: "Alex", email: "alex@rindus.com", age: 30 };
            const mockResult: ResultSetHeader = { insertId: 1 } as ResultSetHeader;

            (connection.execute as jest.Mock) = jest.fn().mockResolvedValueOnce([mockResult]);

            // Action
            const result = await userService.createUser(mockData);

            // Assert
            expect(connection.execute).toHaveBeenCalledWith(
                `INSERT INTO users (name, email, age) VALUES (?, ?, ?)`,
                [mockData.name, mockData.email, mockData.age]
            );
            expect(result).toEqual({ id: 1 });
        });
    });

    describe("getUserById", () => {
        it("should return a user if the user exists", async () => {
            const mockUser: RowDataPacket[] = [
                { id: 1, name: "Alex", email: "alex@rindus.com", age: 30 } as RowDataPacket,
            ];

            (connection.execute as jest.Mock) = jest.fn().mockResolvedValueOnce([mockUser]);

            // Action
            const result = await userService.getUserById(1);

            // Assert
            expect(connection.execute).toHaveBeenCalledWith(
                `SELECT id, name, email, age FROM users WHERE id = ? AND status = 1`,
                [1]
            );
            expect(result).toEqual({
                id: 1,
                name: "Alex",
                email: "alex@rindus.com",
                age: 30,
            });
        });

        it("should return null if the user does not exist", async () => {
            const mockUser: RowDataPacket[] = [];

            (connection.execute as jest.Mock) = jest.fn().mockResolvedValueOnce([mockUser]);

            // Action
            const result = await userService.getUserById(1);

            // Assert
            expect(connection.execute).toHaveBeenCalledWith(
                `SELECT id, name, email, age FROM users WHERE id = ? AND status = 1`,
                [1]
            );
            expect(result).toBeNull();
        });
    });

    describe("getUserByEmail", () => {
        it("should return a user if the email exists", async () => {
            const mockUser: RowDataPacket[] = [
                { id: 1, name: "Alex", email: "alex@rindus.com", age: 30 } as RowDataPacket,
            ];

            (connection.execute as jest.Mock) = jest.fn().mockResolvedValueOnce([mockUser]);

            // Action
            const result = await userService.getUserByEmail("alex@rindus.com");

            // Assert
            expect(connection.execute).toHaveBeenCalledWith(
                `SELECT id, name, email, age FROM users WHERE email = ? AND status = 1`,
                ["alex@rindus.com"]
            );
            expect(result).toEqual({
                id: 1,
                name: "Alex",
                email: "alex@rindus.com",
                age: 30,
            });
        });

        it("should return null if the email does not exist", async () => {
            const mockUser: RowDataPacket[] = [];

            (connection.execute as jest.Mock) = jest.fn().mockResolvedValueOnce([mockUser]);

            // Action
            const result = await userService.getUserByEmail("alex@rindus.com");

            // Assert
            expect(connection.execute).toHaveBeenCalledWith(
                `SELECT id, name, email, age FROM users WHERE email = ? AND status = 1`,
                ["alex@rindus.com"]
            );
            expect(result).toBeNull();
        });
    });
});
