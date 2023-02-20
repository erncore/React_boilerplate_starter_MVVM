import AuthRepository from 'domain/repository/auth/AuthRepository';
import ClientRepository from 'domain/repository/client/ClientRepository';

import authModel from 'domain/entity/auth/AuthModel';
import { SubmissionError } from '../CustomErrors';
import { loginDTO } from 'domain/repository/auth/structures/loginDTO';

export default class LoginUseCase {
    private authRepository: AuthRepository;
    private clientRepository: ClientRepository;
    private authModel: authModel;

    public constructor(authRepository: AuthRepository, clientRepository: ClientRepository, authModel: authModel) {
        this.authRepository = authRepository;
        this.clientRepository = clientRepository;
        this.authModel = authModel;
    }

    public async loginUser(data: loginDTO): Promise<void> {
        return this.authRepository
            .login(data)
            .then(({ accessToken, refreshToken, roles }) => {
                this.clientRepository.authorizeUser(accessToken, refreshToken);
                this.authModel.onSignedIn(roles);
            })
            .catch((error) => {
                return Promise.reject(new SubmissionError(error.validationErrors, error.data.message));
            });
    }

    public async googleLogin(googleToken: string): Promise<void> {
        const authResult = await this.authRepository.googleLogin(googleToken);
        return authResult;
    }
}
