import { UserRoles } from 'types';
import jwt_decode from 'jwt-decode';

const extractRoleFromToken = (accessToken: string): UserRoles[] => {
    let { roles }: { roles: UserRoles[] } = jwt_decode(accessToken);
    return roles;
};

export { extractRoleFromToken };
