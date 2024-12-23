import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

// Create User
const createUserSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    age: Joi.number().required(),
});

// Get User
const getUserSchema = Joi.object({
    id: Joi.number().required(),
});

// Middleware to validate request body
const userValidator = {
    validateCreateUserRequest: (req: Request, res: Response, next: NextFunction) => {
        const { error } = createUserSchema.validate(req.body);
        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }
        next();
    },
    
    validateGetUserRequest: (req: Request, res: Response, next: NextFunction) => {
        const { error } = getUserSchema.validate(req.params);
        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }
        next();
    }
}

export default userValidator;
