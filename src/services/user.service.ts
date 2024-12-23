import { ResultSetHeader, RowDataPacket } from "mysql2";
import { connection } from "../config/db";
import { CreateUserData, User } from "../types/user.types";

const userService = {

    createUser: async (data: CreateUserData): Promise<{ id: number }> => {
        console.info(`User is going to insert into the database`);
        const [result] = await connection.execute(
            `INSERT INTO users (name, email, age) VALUES (?, ?, ?)`,
            [data.name, data.email, data.age]
        );
        console.info(`User is saved into the database`);

        const userId = (result as ResultSetHeader).insertId;
        console.info(`Inserted userId is, ${userId}`);
        return { id: userId };
    },

    getUserById: async (id: number): Promise<User | null> => {
        console.info(`User is going to fetch by id from the database`);
        const [user] = await connection.execute<RowDataPacket[]>(
            `SELECT id, name, email, age FROM users WHERE id = ? AND status = 1`,
            [id]
        );

        if (user.length === 0) {
            console.warn(`User is not available in the database`);
            return null
        }

        console.info(`User is available in the database`);
        return {
            id: user[0].id,
            name: user[0].name,
            email: user[0].email,
            age: user[0].age
        }
    },

    getUserByEmail: async (email: string): Promise<User | null> => {
        console.info(`User is going to fetch by email from the database`);
        const [user] = await connection.execute<RowDataPacket[]>(
            `SELECT id, name, email, age FROM users WHERE email = ? AND status = 1`,
            [email]
        );

        if (user.length === 0) {
            console.warn(`User is not available in the database`);
            return null
        }
        console.info(`User is available in the database`);
        return {
            id: user[0].id,
            name: user[0].name,
            email: user[0].email,
            age: user[0].age
        }
    }
}

export default userService;

