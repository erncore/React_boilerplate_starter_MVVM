import { action, computed, makeAutoObservable, toJS } from 'mobx';
import UserStructure from './structures/UserStructure';

export default class UserModel implements UserStructure {
    public id: string;
    public email: string;
    public profileId: string;

    public constructor() {
        makeAutoObservable(this);
        this.id = '';
        this.email = '';
        this.profileId = '';
    }

    @action update = (user: UserStructure) => {
        this.email = user.email;
        this.id = user.id;
        this.profileId = user.profileId;
    };

    @computed get get(): UserStructure {
        return toJS(this);
    }
}
