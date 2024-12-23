import type { Request, Response } from "express";
import userService from "../services/user.service";
import { CreateUserRequest, GetUserRequest } from "../types/user.types";

const userController = {
    createUser: async (req: Request<{}, {}, CreateUserRequest>, res: Response) => {
        try {
            const { name, email, age } = req.body;
            console.info(`Starting to create the user, name:${name}, email:xxx, age:${age}`);
            const user = await userService.getUserByEmail(email);
            if (user) {
                console.warn(`User is already exit useId:${user.id}`);
                res.status(409).json({ message: "User already exists" });
                return;
            }
            
            console.info(`User is not available, Going to save into database`);
            const createdUser = await userService.createUser({ name, email, age });
            console.info(`User is created successfully, created userId: ${createdUser.id}`);
            res.status(201).json({ message: "User created successfully.", createdUser });
        } catch (error) {
            console.error(`User creation is failed ${JSON.stringify(error)}`);
            res.status(500).json({ error: "Server error. please try again later.!" });
        }
    },

    getUser: async (req: Request<GetUserRequest>, res: Response) => {
        try {
            const { id } = req.params;
            console.info(`Starting to fetch the user, userId:${id}`);
            const user = await userService.getUserById(id);
            if (!user) {
                console.warn(`User is not found, userId:${id}`);
                res.status(404).json({ message: "User is not found" });
                return;
            }
            console.info(`User is available, userId:${id}`);
            res.status(200).json({ message: "User is fetched successfully", user });
        } catch (error) {
            console.error(`User fetch is failed ${JSON.stringify(error)}`);
            res.status(500).json({ error: "Server error. please try again later.!" });
        }
    }
}

export default userController;