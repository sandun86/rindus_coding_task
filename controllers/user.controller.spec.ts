import { Request, Response } from "express";
import userController from "./user.controller";
import userService from "../services/user.service";
import { CreateUserData, CreateUserResponse, GetUserRequest, GetUserResponse } from "../types/user.types";

// Mock
jest.mock('../services/user.service', () => {
    return {
        createUser: jest.fn().mockResolvedValue({ value: 'mock_value' }),
        getUserById: jest.fn().mockResolvedValue({ value: 'mock_value' }),
    };
});

describe("User Controller", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    const reqCreateUser = {
        body: { name: "Alex", email: "alex@rindus.com", age: 30 },
    } as unknown as Request;
    const reqGetUser = { params: { id: 1 } } as Request<GetUserRequest>;;
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    } as unknown as Response;

    describe("createUser", () => {
        it("should return 201 when user is created successfully", async () => {
            // Mock
            (userService.createUser as jest.Mock) = jest.fn()
                .mockResolvedValue({ status: true, statusCode: 201, id: 1, message: 'User is created successfully.' } as CreateUserResponse);

            // Act
            await userController.createUser(reqCreateUser, res);

            // Assert
            expect(userService.createUser).toHaveBeenCalledWith({ name: "Alex", email: "alex@rindus.com", age: 30 } as CreateUserData);
            expect(res.status).toHaveBeenCalledWith(201);
        });

        it("should return 409 when user is already exit", async () => {
            // Mock
            (userService.createUser as jest.Mock) = jest.fn()
                .mockResolvedValue({ status: false, statusCode: 409, id: null, message: 'User is created successfully.' } as CreateUserResponse);;

            // Action
            await userController.createUser(reqCreateUser, res);

            // Assert
            expect(userService.createUser).toHaveBeenCalledWith({ name: "Alex", email: "alex@rindus.com", age: 30 } as CreateUserData);
            expect(res.status).toHaveBeenCalledWith(409);
        });

        it("should return 500 when server error", async () => {
            // Mock
            (userService.createUser as jest.Mock) = jest.fn().mockRejectedValue({ message: "system error" });

            // Action
            await userController.createUser(reqCreateUser, res);

            // Assert
            expect(userService.createUser).toHaveBeenCalledWith({ name: "Alex", email: "alex@rindus.com", age: 30 } as CreateUserData);
            expect(res.status).toHaveBeenCalledWith(500);
        });
    });


    describe("getUser", () => {
        it("should return 200 when user is fetched successfully", async () => {
            // Mock
            (userService.getUserById as jest.Mock) = jest.fn()
                .mockResolvedValue({ 
                    status: true, 
                    statusCode: 200, 
                    data: {
                        id: 1,
                        name: "Alex", 
                        email: "alex@rindus.com", 
                        age: 30
                    }, 
                    message: 'User not found in the database' 
                } as GetUserResponse);

            // Act
            await userController.getUser(reqGetUser, res);

            // Assert
            expect(userService.getUserById).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        it("should return 404 when user is not found", async () => {
            // Mock
            (userService.getUserById as jest.Mock) = jest.fn()
                .mockResolvedValue({ 
                    status: false, 
                    statusCode: 404, 
                    data: null, 
                    message: 'User not found in the database' 
                } as GetUserResponse);

            // Action
            await userController.getUser(reqGetUser, res);

            // Assert
            expect(userService.getUserById).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(404);
        });

        it("should return 500 when user is not found", async () => {
            // Mock
            (userService.getUserById as jest.Mock) = jest.fn().mockRejectedValue({ message: "system error" });

            // Action
            await userController.getUser(reqGetUser, res);

            // Assert
            expect(userService.getUserById).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(500);
        });
    });
});
