import axios from 'axios';
import UserRepository from 'domain/repository/user/UserRepository';
import UserStructure from 'domain/entity/user/structures/UserStructure';

class UserApi implements UserRepository {
    getUser = (): Promise<UserStructure> => {
        return axios({
            method: 'GET',
            url: '/users/me',
        })
            .then((result: any): UserStructure => {
                return {
                    id: result.data['id'],
                    email: result.data['email'],
                    profileId: result.data['id'],
                };
            })
            .catch((e) => {
                return Promise.reject(e);
            });
    };
}

export default UserApi;
