import { inject, injectable } from 'tsyringe';
import IUserResponseDTO from '../../dtos/IUserResponseDTO';
import UserMaper from '../../maper/UserMaper';
import IUserRepository from '../../repositories/IUserRepository';

@injectable()
class ProfileUserUseCase {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) {}
    async execute(id: string): Promise<IUserResponseDTO> {
        const user = await this.userRepository.findById(id);

        return UserMaper.toDTO(user);
    }
}

export default ProfileUserUseCase;
