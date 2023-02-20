export default interface ClientRepository {
    logout(): void;

    updateAccessToken(accessToken: string): void;
    updateRefreshToken(refreshToken: string): void;

    authorizeUser(accessToken: string, refreshToken: string): void;

    getBearer(): string;
    // @TEMP
}
