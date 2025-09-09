
import { Router } from 'express';
import { ValidationMiddleware } from '../middlewares/validationMiddleware';
import { getAllUsers, createUser, loginUser, logoutUser } from '../controllers/userController';
import { AddUserSchema, LoginUserSchema } from '../schema/userSchema';
import { authMiddleware, checkRole, rateLimiting } from '../middlewares/authMiddleware';

const userRouter = Router();


// /**
//  * @swagger
//  * tags:
//  *   name: Users
//  *   description: User management endpoints
//  */

// /**
//  * @swagger
//  * /api/users:
//  *   get:
//  *     summary: Get all users
//  *     tags: [Users]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: header
//  *         name: Authorization
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Bearer token
//  *     responses:
//  *       200:
//  *         description: List of users retrieved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/UsersListResponse'
//  *       401:
//  *         description: Unauthorized - invalid or missing token
//  *       409:
//  *         description: No users found
//  *       500:
//  *         description: Internal server error
//  */

userRouter.get('/users', rateLimiting(50), authMiddleware,  getAllUsers);


// /**
//  * @swagger
//  * /api/users:
//  *   post:
//  *     summary: Register a new user
//  *     tags: [Users]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/RegisterRequest'
//  *     responses:
//  *       201:
//  *         description: User created successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/UserResponse'
//  *       404:
//  *         description: Default role not found
//  *       409:
//  *         description: User already exists
//  *       500:
//  *         description: Internal server error
//  */

userRouter.post(
  '/users',
  rateLimiting(30),
  ValidationMiddleware({ type: 'body', schema: AddUserSchema }),
  createUser,
);

// /**
//  * @swagger
//  * /api/login:
//  *   post:
//  *     summary: Login user
//  *     tags: [Users]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/LoginRequest'
//  *     responses:
//  *       200:
//  *         description: Login successful
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/LoginResponse'
//  *       401:
//  *         description: Invalid email or password
//  *       404:
//  *         description: User not found
//  *       500:
//  *         description: Internal server error
//  */

userRouter.post(
  '/login',
  ValidationMiddleware({ type: 'body', schema: LoginUserSchema }),
  loginUser,
);


// /**
//  * @swagger
//  * /api/logout:
//  *   post:
//  *     summary: Logout user
//  *     tags: [Users]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: header
//  *         name: Authorization
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Bearer token
//  *     responses:
//  *       200:
//  *         description: Logout successful
//  *       401:
//  *         description: Unauthorized - invalid or missing token
//  *       500:
//  *         description: Internal server error
//  */


userRouter.post('/logout', authMiddleware, logoutUser);



export { userRouter };
