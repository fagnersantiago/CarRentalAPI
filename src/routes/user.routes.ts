import { Router } from 'express';
import multer from 'multer';

import CreateUserController from '../modules/accounts/useCases/createUser/CreateUserController';
import UpdateUserControllerAvatar from '../modules/cars/useCase/updateUserAvatar/UpdateUserControllerAvatar';
import configUploadAvatar from '../config/upload';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticate';

const usersRouter = Router();
const uploadAvatar = multer(configUploadAvatar.upload('./tmp/avatar'));

const createUserCase = new CreateUserController();

const updateUserControllerAvatar = new UpdateUserControllerAvatar();
usersRouter.post('', createUserCase.handle);
usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    uploadAvatar.single('file'),
    updateUserControllerAvatar.handle,
);
export default usersRouter;
