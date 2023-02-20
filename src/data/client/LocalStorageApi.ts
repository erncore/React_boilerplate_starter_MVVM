import axios from 'axios';
import ClientRepository from 'domain/repository/client/ClientRepository';

class LocalStorageApi implements ClientRepository {
    constructor() {
        this.setAxiosInterceptors();
    }

    logout = () => {
        localStorage.removeItem('cat_at');
        localStorage.removeItem('cat_rt');
    };

    updateAccessToken = (accessToken: string) => {
        window.localStorage.setItem('cat_at', accessToken);
    };
    updateRefreshToken = (refreshToken: string) => {
        window.localStorage.setItem('cat_rt', refreshToken);
    };

    authorizeUser = (accessToken: string, refreshToken: string) => {
        this.updateAccessToken(accessToken);
        this.updateRefreshToken(accessToken);
    };

    getBearer = () => {
        return window.localStorage.getItem('cat_at') || '';
    };

    getRefreshToken = () => {
        return window.localStorage.getItem('cat_rt') || '';
    };

    cleanUpTokens = () => {
        window.localStorage.removeItem('cat_at');
        window.localStorage.removeItem('cat_rt');
    };

    setAxiosInterceptors = () => {
        axios.interceptors.request.use(
            (config: any) => {
                const token = this.getBearer();
                if (token) {
                    config.headers['Authorization'] = 'Bearer ' + token;
                }
                config.headers['Content-Type'] = 'application/json';
                return config;
            },
            (error) => {
                Promise.reject(error);
            }
        );
        axios.interceptors.response.use(
            (response) => response,
            (error) => {
                const originalRequest = error.config;

                if (
                    error.response.status === 401 &&
                    !originalRequest._retry &&
                    originalRequest.url !== `${process.env.REACT_APP_API_ADDRESS}auth` &&
                    originalRequest.url !== `${process.env.REACT_APP_API_ADDRESS}token/refresh`
                ) {
                    originalRequest._retry = true;
                    return axios({
                        method: 'POST',
                        url: axios.defaults.baseURL + 'token/refresh',
                        data: {
                            refresh_token: this.getRefreshToken() && this.getRefreshToken(),
                        },
                    })
                        .then((serverReponse: any) => {
                            if (serverReponse.status === 200) {
                                this.updateAccessToken(serverReponse.data.token);
                                this.updateRefreshToken(serverReponse.data.refresh_token);
                                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.getBearer();

                                return axios(originalRequest);
                            }
                        })
                        .catch(() => {
                            this.cleanUpTokens();
                            return axios(originalRequest);
                        });
                }
                return Promise.reject(error);
            }
        );
    };
}

export default LocalStorageApi;
