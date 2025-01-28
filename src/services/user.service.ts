import userModel from "../models/user.models";
import { CreatedUser, CreateUserData, User, CreateUserResponse, GetUserResponse } from "../types/user.types";

const userService = {

    createUser: async (data: CreateUserData): Promise<CreateUserResponse> => {
        console.info(`Starting to create the user, name:${data.name}, email:xxx, age:${data.age}`);
        const checkUser = await userModel.getUserByEmail(data.email);
        if (checkUser) {
            console.warn(`User is already exit useId:${checkUser.id}`);
            return { status: false, statusCode: 409, id: null, message: 'User is already exit' };
        }

        console.info(`User is not available, Going to save into database`);
        const user: CreatedUser = await userModel.create(data);

        return { status: true, statusCode: 201, id: user.id, message: 'User is created successfully.' };
    },

    getUserById: async (id: number): Promise<GetUserResponse> => {
        console.info(`User is going to fetch by id from the database`);
        const user = await userModel.getUserById(id) as User | null;
        if (!user) {
            console.warn(`User is not available in the database`);
            return { status: false, statusCode: 404, data: null, message: 'User not found in the database' };
        }
        console.info(`User is available in the database`);
        return {
            status: true,
            statusCode: 200,
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                age: user.age
            },
            message: 'User fetched successfully'
        };
    },
}

export default userService;

