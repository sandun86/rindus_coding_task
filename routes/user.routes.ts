import { Router } from "express";
import userController from "../controllers/user.controller";
import userValidator from "../validators/user.validator";

const router = Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Alex Smith
 *               email:
 *                 type: string
 *                 example: alex@rindus.com
 *               age:
 *                 type: number
 *                 example: 12
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input data
 *       409:
 *         description: Already exists user
 *       500:
 *         description: Server error
 */
router.post("/", userValidator.validateCreateUserRequest, userController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to fetch
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *       200:
 *         description: User fetched successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: User is not found
 *       500:
 *         description: Server error
 */
router.get("/:id", userController.getUser);

export default router;
