import AuthRepository from 'domain/repository/auth/AuthRepository';

import { SubmissionError } from '../CustomErrors';

export default class ChangeUserPasswordUseCase {
    private authRepository: AuthRepository;

    constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository;
    }

    start = (currentPassword: string, newPassword: string, confirmNewPassword: string) => {
        return this.authRepository
            .changePassword(currentPassword, newPassword)
            .then((response) => {
                console.log('password updated', { response });
            })
            .catch((errors) => {
                return Promise.reject(new SubmissionError(errors, errors));
            });
    };
}
