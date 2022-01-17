import { Router } from 'express';
import AuthenticateUserController from '../../../../modules/accounts/useCases/authenticateSession/AutencticateUserController';
import RefreshTokenController from '../../../../modules/refreshToken/RefreshTokenController';

const authenticateRouter = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRouter.post('/Sessions', authenticateUserController.handle);
authenticateRouter.post('/refresh-token', refreshTokenController.handle);

export default authenticateRouter;
