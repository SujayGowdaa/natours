import express from 'express';
import {
  getAllUser,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user.js';

const userRouter = express.Router();

userRouter.route('/').get(getAllUser).post(createUser);
userRouter.route(':id').get(getUser).patch(updateUser).delete(deleteUser);

export default userRouter;
