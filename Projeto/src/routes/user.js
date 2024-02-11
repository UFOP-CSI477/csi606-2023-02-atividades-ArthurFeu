import { Router } from 'express';
import { CreateUser } from '../controller/user/createUser.js';
import { GetAllUsers } from '../controller/user/getAllUsers.js';
import { GetUserById } from '../controller/user/getUserById.js';
import { UpdateUser } from '../controller/user/updateUser.js';
import { DeleteUser } from '../controller/user/deleteUser.js';

const userRouter = Router();
const createUser = new CreateUser();
const getAllUsers = new GetAllUsers();
const getUserById = new GetUserById();
const updateUser = new UpdateUser();
const deleteUser = new DeleteUser();

userRouter.post('/users', createUser.handle);
userRouter.get('/users', getAllUsers.handle);
userRouter.get('/users/:id', getUserById.handle);
userRouter.put('/users/:id', updateUser.handle);
userRouter.delete('/users/:id', deleteUser.handle);

export { userRouter };
