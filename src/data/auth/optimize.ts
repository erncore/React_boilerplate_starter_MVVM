import { loginDTO, LoginResultDTO } from 'domain/repository/auth/structures/loginDTO';
import { registerDTO, RegistrationResultDTO } from 'domain/repository/auth/structures/registerDTO';

export const optimize = {
    registrer: {
        toServer: (data: registerDTO): any => {
            return {
                password: data.password,
                email: data.email,
                type: data.type,
            };
        },
        toClient: (data: any): RegistrationResultDTO => {
            return {
                userType: data.userType,
                email: data.email,
                plainPassword: data.plainPassword,
                facebookId: data.facebookId,
                googleId: data.googleId,
            };
        },
    },
    login: {
        toServer: (data: loginDTO): any => {
            return {
                password: data.password,
                email: data.email,
            };
        },
        toClient: (data: any): LoginResultDTO => {
            return {
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
                roles: data.roles,
            };
        },
    },
};
