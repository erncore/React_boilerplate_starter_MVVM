import AuthRepository from 'domain/repository/auth/AuthRepository';
import ClientRepository from 'domain/repository/client/ClientRepository';
import UserRepository from 'domain/repository/user/UserRepository';

import AuthModel from 'domain/entity/auth/AuthModel';
import UserModel from 'domain/entity/user/UserModel';

export default class GetUserAppAccess {
    private authRepository: AuthRepository;
    private userRepository: UserRepository;
    private clientRepository: ClientRepository;
    private authModel: AuthModel;
    private userModel: UserModel;

    public constructor(
        authRepository: AuthRepository,
        clientRepository: ClientRepository,
        userRepository: UserRepository,
        authModel: AuthModel,
        userModel: UserModel
    ) {
        this.authRepository = authRepository;
        this.clientRepository = clientRepository;
        this.userRepository = userRepository;
        this.authModel = authModel;
        this.userModel = userModel;
    }

    public async start(): Promise<any> {
        const bearer = this.clientRepository.getBearer();
        if (!bearer) return Promise.reject();
        return this.authRepository
            .getUserAppAccess()
            .then(({ roles }) => {
                this.authModel.onSignedIn(roles);
                // this.userModel.update(userProfile);
            })
            .catch((e) => Promise.reject(e));
    }
}
