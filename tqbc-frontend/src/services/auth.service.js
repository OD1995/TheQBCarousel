import api from './api.js';
import History from "../helpers/History";
import TokenService from './Token.service.js';

const register = (username, favTeam, email, password) => {
    return api.post(
        "/v1/auth/register",
        {
            username,
            favTeam,
            email,
            password
        }
    );
};

const verifyEmail = (token) => {
    return api.post(
        "/v1/auth/verify-email",
        {
            token
        }
    );
}

const updateAccessToken = (refreshToken) => {
    return api.post(
        "/v1/auth/refreshtoken",
        {
            refreshToken
        }
    )
}

const login = (username, password) => {
    return api.post(
        "/v1/auth/login",
        {
            username,
            password
        }
    )
    .then((response) => {
        if (response.data.user.accessToken) {
            // localStorage.setItem("user",JSON.stringify(response.data.user));
            TokenService.setUser(response.data.user);
            // localStorage.setItem("privateLeaderboardInfos",JSON.stringify(response.data.privateLeaderboardInfos));
            TokenService.setPrivateLeaderboardInfos(response.data.privateLeaderboardInfos);
        }

        return response.data;
    });
};

const logout = (history) => {
    localStorage.setItem("justLoggedOut",true);
    // localStorage.removeItem("user");
    TokenService.removeUser();
    // localStorage.removeItem("privateLeaderboardInfos");
    TokenService.removePrivateLeaderboardInfos();
    History.push("/login");
};

export default {
    register,
    verifyEmail,
    login,
    logout,
    updateAccessToken
};