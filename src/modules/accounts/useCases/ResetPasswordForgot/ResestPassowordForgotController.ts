import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResestPassowordForgotUseCase from './ResetPasswordForgotUseCase';

class ResestPassowordForgotController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { token } = request.query;
        const { password } = request.body;

        const resetPasswordForgotUseCase = container.resolve(
            ResestPassowordForgotUseCase,
        );

        await resetPasswordForgotUseCase.execute({
            token: String(token),
            password,
        });

        return response.send();
    }
}

export default ResestPassowordForgotController;
