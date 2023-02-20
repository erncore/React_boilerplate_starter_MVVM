import { computed, makeAutoObservable, action } from 'mobx';
import UserModel from 'domain/entity/user/UserModel';
import LoadUserUseCase from 'domain/interactors/user/LoadUserUseCase';

export default class UserViewModel {
    private userModel: UserModel;
    private loadUserUseCase: LoadUserUseCase;
    public isSync: boolean;
    public locale: string;

    constructor(userModel: UserModel, loadUserUseCase: LoadUserUseCase) {
        makeAutoObservable(this);
        this.userModel = userModel;
        this.loadUserUseCase = loadUserUseCase;
        this.locale = 'de';
        this.isSync = false;
    }

    @computed get fullName(): string {
        return this.userModel.email;
    }

    @action loadUser = (): Promise<any> => {
        this.isSync = true;
        return this.loadUserUseCase.start().finally(
            action(() => {
                this.isSync = false;
            })
        );
    };

    @action changeLocale = (locale: string) => {
        this.locale = locale;
    };
}
