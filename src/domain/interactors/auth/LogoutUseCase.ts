import AuthModel from '../../entity/auth/AuthModel';
import ClientRepository from 'domain/repository/client/ClientRepository';

export default class LogoutUseCase {
    private authModel: AuthModel;
    private clientRepository: ClientRepository;

    public constructor(clientRepository: ClientRepository, authModel: AuthModel) {
        this.authModel = authModel;
        this.clientRepository = clientRepository;
    }

    public logout() {
        this.clientRepository.logout();
        this.authModel.onLogout();
    }
}
