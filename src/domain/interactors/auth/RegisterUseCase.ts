import { registerDTO } from 'domain/repository/auth/structures/registerDTO';
import AuthRepository from '../../repository/auth/AuthRepository';
import { SubmissionError } from '../CustomErrors';

export default class LoginUseCase {
    private authRepository: AuthRepository;

    public constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository;
    }

    public async register(data: registerDTO) {
        return await this.authRepository.register(data).catch((error) => {
            return Promise.reject(new SubmissionError(error.validationErrors, error.data.message));
        });
    }
}
