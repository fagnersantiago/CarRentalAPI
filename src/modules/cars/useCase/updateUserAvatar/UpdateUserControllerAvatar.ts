import { Response, Request } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatarUseCase from './UpdateUserAvatarUseCase';

class UpdateUserControllerAvatar {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        console.log(id);
        const avatar_file = request.file.filename;

        const updateUserAvatar = container.resolve(UpdateUserAvatarUseCase);

        await updateUserAvatar.excute({ user_id: id, avatar_file });
        console.log(id);
        return response.status(404).send();
    }
}

export default UpdateUserControllerAvatar;
