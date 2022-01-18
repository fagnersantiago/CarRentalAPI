import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendForgotEmailUseCase from './SendForgotEmailUseCase';

class SendForgotEmailController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

        const sendForgotEmailUseCase = container.resolve(
            SendForgotEmailUseCase,
        );

        await sendForgotEmailUseCase.execute(email);

        return response.send();
    }
}

export default SendForgotEmailController;
