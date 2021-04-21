import { Router } from 'express';

import CreateUserController from '../modules/accounts/useCases/createUser/CreateUserController';

const usersRouter = Router();

const createUserCase = new CreateUserController();

usersRouter.post('', createUserCase.handle);

export default usersRouter;
