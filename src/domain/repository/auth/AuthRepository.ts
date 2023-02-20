import { UserRoles } from 'types';
import { LoginResultDTO, loginDTO } from './structures/loginDTO';
import { RegistrationResultDTO, registerDTO } from './structures/registerDTO';

export default interface AuthRepository {
    login(data: loginDTO): Promise<LoginResultDTO>;

    register(data: registerDTO): Promise<RegistrationResultDTO>;

    getUserAppAccess(): Promise<{
        roles: UserRoles[];
    }>;

    getFreshToken(refreshToken: string): Promise<any>;

    googleLogin(googleToken: string): Promise<any>;

    changePassword(currentPassword: string, newPassword: string): Promise<any>;

    deleteAccount(currentPassword: string): Promise<any>;
}

export type { RegistrationResultDTO, LoginResultDTO };
