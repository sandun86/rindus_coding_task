import { connection } from "../config/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

import { CreateUserData, User } from "../types/user.types";

const userModel = {
    create: async (data: CreateUserData): Promise<{ id: number }> => {
        const [user] = await connection.execute(
            `INSERT INTO users (name, email, age) VALUES (?, ?, ?)`,
            [data.name, data.email, data.age]
        );
        const userId = (user as ResultSetHeader).insertId;
        return { id: userId };
    },

    getUserById: async (id: number): Promise<User | null> => {
        const [user]: any = await connection.query('SELECT id, name, email, age FROM users WHERE id = ? AND status = 1', [id]);
        return user.length ? user[0] : null;
    },

    getUserByEmail: async (email: string): Promise<User | null> => {
        const [user]: any = await connection.query('SELECT id, name, email, age FROM users WHERE email = ? AND status = 1', [email]);
        return user.length ? user[0] : null;
    }

}

export default userModel;
