import UserStructure from 'domain/entity/user/structures/UserStructure';

export default interface UserRepository {
    getUser(): Promise<UserStructure>;
}
