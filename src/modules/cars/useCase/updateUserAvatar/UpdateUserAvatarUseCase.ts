import { inject, injectable } from 'tsyringe';
import { deleteFile } from '../../../../utils/file';
import IUserRepository from '../../../accounts/repositories/IUserRepository';

interface IRequest {
    user_id: string;
    avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) {}

    async excute({ user_id, avatar_file }: IRequest): Promise<void> {
        const user = await this.userRepository.findById(user_id);

        user.avatar = avatar_file;

        if (user.avatar) {
            await deleteFile(`./tmp/avatar/${user.avatar}`);
        }

        await this.userRepository.create(user);
    }
}

export default UpdateUserAvatarUseCase;
