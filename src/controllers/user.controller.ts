import type { Request, Response } from "express";
import userService from "../services/user.service";
import { CreateUserRequest, GetUserRequest } from "../types/user.types";

const userController = {
    createUser: async (req: Request<{}, {}, CreateUserRequest>, res: Response) => {
        try {
            const { name, email, age } = req.body;
            console.info(`Starting to create the user, name:${name}, email:xxx, age:${age}`);
            const createdUser = await userService.createUser({ name, email, age });
            console.info(`End the user creation process, created userId: ${createdUser.id}`);
            res.status(createdUser.statusCode).json({ message: createdUser.message, createdUser: createdUser.id });
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
            console.info(`End the process of fetch the user, userId:${id}`);
            res.status(user.statusCode).json({ message: user.message, user: user.data });
        } catch (error) {
            console.error(`User fetch is failed ${JSON.stringify(error)}`);
            res.status(500).json({ error: "Server error. please try again later.!" });
        }
    }
}

export default userController;