import { Router } from 'express';
import AuthenticateUserController from '../../../../modules/accounts/useCases/authenticateSession/AutencticateUserController';

const authenticateRouter = Router();

const authenticateUserController = new AuthenticateUserController();
authenticateRouter.post('/Sessions', authenticateUserController.handle);

export default authenticateRouter;
