import { Router } from 'express';
import multer from 'multer';

import CreateUserController from '../modules/accounts/useCases/createUser/CreateUserController';
import UpdateUserControllerAvatar from '../modules/cars/useCase/updateUserAvatar/UpdateUserControllerAvatar';

const usersRouter = Router();

const upload = multer({
    dest: './avatar',
});

const createUserCase = new CreateUserController();

const updateUserControllerAvatar = new UpdateUserControllerAvatar();
usersRouter.post('', createUserCase.handle);
usersRouter.patch(
    '/avatar',
    upload.single('file'),
    updateUserControllerAvatar.handle,
);
export default usersRouter;
