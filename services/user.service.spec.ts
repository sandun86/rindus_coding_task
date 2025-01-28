import { ResultSetHeader, RowDataPacket } from "mysql2";
import { connection } from "../config/db";
import userService from "../services/user.service";
import { CreatedUser, CreateUserData, User } from "../types/user.types";
import userModel from "../models/user.models";

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

            (userModel.getUserByEmail as jest.Mock) = jest.fn()
                .mockResolvedValue(null);
            (userModel.create as jest.Mock) = jest.fn()
                .mockResolvedValue({ id: 1 } as CreatedUser);

            // Action
            const result = await userService.createUser(mockData);

            // Assert
            expect(result.statusCode).toEqual(201);
        });

        it("should return the user already exit", async () => {
            const mockData: CreateUserData = { name: "Alex", email: "alex@rindus.com", age: 30 };

            (userModel.getUserByEmail as jest.Mock) = jest.fn()
                .mockResolvedValue({ id: 1, name: "Alex", email: "alex@rindus.com", age: 30 } as User);
            (userModel.create as jest.Mock) = jest.fn()
                .mockResolvedValue({ id: 1 } as CreatedUser);

            // Action
            const result = await userService.createUser(mockData);

            // Assert
            expect(result.statusCode).toEqual(409);
        });
    });

    describe("getUserById", () => {
        it("should return a user if the user exists", async () => {
            const mockUser = { id: 1, name: "Alex", email: "alex@rindus.com", age: 30 } as User;

            (userModel.getUserById as jest.Mock) = jest.fn().mockResolvedValueOnce(mockUser as User);

            // Action
            const result = await userService.getUserById(mockUser.id);

            // Assert
            expect(result.status).toEqual(true);
            expect(result.statusCode).toEqual(200);
            expect(result.data).toEqual(mockUser);
        });

        it("should return null if the user does not exist", async () => {
            const mockUser = { id: 1, name: "Alex", email: "alex@rindus.com", age: 30 } as User;

            (userModel.getUserById as jest.Mock) = jest.fn().mockResolvedValueOnce(null);

            // Action
            const result = await userService.getUserById(mockUser.id);

            // Assert
            expect(result.status).toEqual(false);
            expect(result.statusCode).toEqual(404);
            expect(result.data).toEqual(null);
        });
    });
});
