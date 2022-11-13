import axios from "axios";
import EventBus from "../common/EventBus";
import TokenService from "./token.service";

const instance = axios.create(
    {
        baseURL: process.env.REACT_APP_BACKEND_BASE_URL + "/api",
        headers: {
            "Content-Type" : "application/json"
        }
    }
);

instance.interceptors.request.use(
    (config) => {
        const accessToken = TokenService.getLocalAccessToken();
        if (accessToken) {
            config.headers['Authorization'] = 'Bearer ' + accessToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        if ((originalConfig.url !== "/auth/sigin") && err.response) {
            // Access token has expired
            if ((err.response.status === 401) && (!originalConfig._retry)) {
                originalConfig._retry = true;
                try {
                    const rs = await instance.post(
                        "/v1/auth/refreshtoken",
                        {
                            refreshToken: TokenService.getLocalRefreshToken()
                        }
                    );
                    const { accessToken } = rs.data;
                    TokenService.updateLocalAccessToken(accessToken);
                    return instance(originalConfig);
                } catch (_error) {
                    if (_error.response.status === 401) {
                        // Refresh token has expired
                        // Logout and maybe set message
                        EventBus.dispatch(
                            "logout",
                            {
                                message: "Logged out after 1 month since previous log in"
                            }
                        );
                    }
                    return Promise.reject(_error);
                }
            }
        }
        return Promise.reject(err);
    }
)

export default instance;