import userValidator from "../validators/user.validator";
import { Request, Response, NextFunction } from "express";

describe("User Validator Middleware", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = {};
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    describe("validateCreateUserRequest", () => {
        it("should call next() for valid input", () => {
            mockReq.body = {
                name: "John Doe",
                email: "john@example.com",
                age: 30,
            };

            userValidator.validateCreateUserRequest(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).not.toHaveBeenCalled();
            expect(mockRes.json).not.toHaveBeenCalled();
            expect(mockNext).toHaveBeenCalled();
        });

        it("should return 400 for invalid input", () => {
            mockReq.body = {
                name: "JD",
                email: "invalid-email",
                age: 5,
            };

            userValidator.validateCreateUserRequest(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                error: expect.any(String),
            });
            expect(mockNext).not.toHaveBeenCalled();
        });
    });

    describe("validateGetUserRequest", () => {
        it("should call next() for valid input", () => {
            mockReq.params = {
                id: '1',
            };

            userValidator.validateGetUserRequest(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).not.toHaveBeenCalled();
            expect(mockRes.json).not.toHaveBeenCalled();
            expect(mockNext).toHaveBeenCalled();
        });

        it("should return 400 for invalid input", () => {
            mockReq.params = {
                id: "invalid-id",
            };

            userValidator.validateGetUserRequest(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                error: expect.any(String),
            });
            expect(mockNext).not.toHaveBeenCalled();
        });

        it("should return 400 if id is missing", () => {
            mockReq.params = {}; // No id provided
    
            userValidator.validateGetUserRequest(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );
    
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                error: expect.any(String),
            });
            expect(mockNext).not.toHaveBeenCalled();
        });
    });
});
