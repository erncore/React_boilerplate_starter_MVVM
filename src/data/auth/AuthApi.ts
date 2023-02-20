import axios from 'axios';
import AuthRepository from 'domain/repository/auth/AuthRepository';
import { loginDTO, LoginResultDTO } from 'domain/repository/auth/structures/loginDTO';
import { registerDTO, RegistrationResultDTO } from 'domain/repository/auth/structures/registerDTO';
import { optimize } from './optimize';

class AuthApi implements AuthRepository {
    register = (data: registerDTO): Promise<RegistrationResultDTO> => {
        return axios({
            method: 'POST',
            url: '/auth/local/register',
            data: optimize.registrer.toServer(data),
        })
            .then((result: any) => {
                return optimize.registrer.toClient(result);
            })
            .catch((e) => {
                return Promise.reject(e);
            });
    };

    login = (data: loginDTO): Promise<LoginResultDTO> => {
        return axios({
            method: 'POST',
            url: '/auth/local',
            data: optimize.login.toServer(data),
        })
            .then((serverResponse: any) => optimize.login.toClient(serverResponse))
            .catch((e) => {
                return Promise.reject(e);
            });
    };

    getUserAppAccess = () => {
        return axios({
            method: 'GET',
            url: '/users/me',
        })
            .then((result: any) => {
                return {
                    roles: [result.data['role']],
                };
            })
            .catch((e) => {
                return Promise.reject(e);
            });
    };

    getFreshToken = (refreshToken: string): any => {
        return axios({
            method: 'POST',
            url: axios.defaults.baseURL + 'token/refresh',
            data: {
                refresh_token: refreshToken,
            },
        });
    };

    googleLogin = (googleToken: string): any => {
        return axios({
            method: 'POST',
            url: axios.defaults.baseURL + 'google-auth',
            data: {
                accessToken: googleToken,
            },
        });
    };

    changePassword = (currentPassword: string, newPassword: string): any => {
        return axios({
            method: 'POST',
            url: axios.defaults.baseURL + 'api/change-password',
            data: {
                newPassword: newPassword,
                currentPassword: currentPassword,
            },
        }).catch((e) => {
            const errors: any = {};
            e.response.data.violations.map((error: any) => {
                return (errors[error.propertyPath] = error.message);
            });

            return Promise.reject(errors);
        });
    };

    deleteAccount = (currentPassword: string): any => {
        return axios({
            method: 'POST',
            url: axios.defaults.baseURL + 'delete-account',
            data: {
                currentPassword: currentPassword,
            },
        })
            .then(() => {
                this.logout();
            })
            .catch((e) => {
                const errors: any = {};
                errors.currentPassword = e.response.data.detail;

                return Promise.reject(errors);
            });
    };

    logout = () => {
        localStorage.removeItem('at');
        localStorage.removeItem('rt');
    };

    updateAccessTokenStorage = (accessToken: string) => {
        window.localStorage.setItem('at', accessToken);
    };
    updateRefreshTokenStorage = (refreshToken: string) => {
        window.localStorage.setItem('rt', refreshToken);
    };
}

export default AuthApi;
