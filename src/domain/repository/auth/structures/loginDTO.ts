import { UserRoles } from 'types';

type loginDTO = {
    email: string;
    password: string;
};
type LoginResultDTO = {
    accessToken: string;
    refreshToken: string;
    roles: UserRoles[];
};

export type { LoginResultDTO, loginDTO };
