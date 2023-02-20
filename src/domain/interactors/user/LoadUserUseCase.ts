import UserRepository from 'domain/repository/user/UserRepository';

import UserModel from 'domain/entity/user/UserModel';

export default class LoadUserUseCase {
    private userRepository: UserRepository;
    private userModel: UserModel;

    public constructor(userRepository: UserRepository, userModel: UserModel) {
        this.userRepository = userRepository;
        this.userModel = userModel;
    }

    public async start(): Promise<any> {
        return this.userRepository
            .getUser()
            .then((userData) => {
                this.userModel.update(userData);
            })
            .catch((e) => Promise.reject(e));
    }
}
