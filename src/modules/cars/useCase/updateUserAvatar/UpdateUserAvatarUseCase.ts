import { inject, injectable } from 'tsyringe';
import IStorageProvider from '../../../../shared/container/Provider/StorageProvider/IStorageProvider';
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
        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    async excute({ user_id, avatar_file }: IRequest): Promise<void> {
        const user = await this.userRepository.findById(user_id);

        user.avatar = avatar_file;

        if (user.avatar) {
            await this.storageProvider.delete(user.avatar, 'avatar');
        }

        await this.storageProvider.save(avatar_file, 'avatar');

        user.avatar = avatar_file;

        await this.userRepository.create(user);
    }
}

export default UpdateUserAvatarUseCase;
