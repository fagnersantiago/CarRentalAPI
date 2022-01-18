import { Router } from 'express';
import ResestPassowordForgotController from '../../../../modules/accounts/useCases/ResetPasswordForgot/ResestPassowordForgotController';
import SendForgotEmailController from '../../../../modules/accounts/useCases/sendForgotEmail/SendForgotEmailController';

const passwordRouter = Router();

const sendForgotPasswordController = new SendForgotEmailController();
const resetPasswordForgotController = new ResestPassowordForgotController();

passwordRouter.post('/forgot', sendForgotPasswordController.handle);
passwordRouter.post('/reset', resetPasswordForgotController.handle);

export default passwordRouter;
