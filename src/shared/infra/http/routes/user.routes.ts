import { Router } from 'express';
import multer from 'multer';

import CreateUserController from '../../../../modules/accounts/useCases/createUser/CreateUserController';
import UpdateUserControllerAvatar from '../../../../modules/cars/useCase/updateUserAvatar/UpdateUserControllerAvatar';
import configUploadAvatar from '../../../../config/upload';
import { ensureAuthenticated } from '../../../middlewares/ensureAuthenticate';
import ProfileUserController from '../../../../modules/accounts/useCases/profileUser/ProfileUserController';

const usersRouter = Router();
const uploadAvatar = multer(configUploadAvatar);

const createUserCase = new CreateUserController();

const updateUserControllerAvatar = new UpdateUserControllerAvatar();

const profileUserController = new ProfileUserController();

usersRouter.post('', createUserCase.handle);
usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    uploadAvatar.single('file'),
    updateUserControllerAvatar.handle,
);

usersRouter.get('/', ensureAuthenticated, profileUserController.handle);
export default usersRouter;
