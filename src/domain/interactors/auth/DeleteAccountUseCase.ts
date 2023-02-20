import AuthRepository from 'domain/repository/auth/AuthRepository';
import ClientRepository from 'domain/repository/client/ClientRepository';

import { SubmissionError } from '../CustomErrors';

export default class DeleteAccountUseCase {
    private authRepository: AuthRepository;
    private clientRepository: ClientRepository;

    constructor(authRepository: AuthRepository, clientRepository: ClientRepository) {
        this.authRepository = authRepository;
        this.clientRepository = clientRepository;
    }

    start = (currentPassword: string) => {
        return this.authRepository
            .deleteAccount(currentPassword)
            .then(() => {
                this.clientRepository.logout();
            })
            .catch((errors) => {
                return Promise.reject(new SubmissionError(errors, errors));
            });
    };
}
