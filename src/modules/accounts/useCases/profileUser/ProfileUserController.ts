import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ProfileUserUseCase from './ProfileUserUseCase';

class ProfileUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const profileUseUserCase = container.resolve(ProfileUserUseCase);

        const user = await profileUseUserCase.execute(id);

        return response.json(user);
    }
}

export default ProfileUserController;
