import api from './api.js';
import History from "../helpers/History";

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
        if (response.data.accessToken) {
            localStorage.setItem("user",JSON.stringify(response.data));
        }

        return response.data;
    });
};

const logout = (history) => {
    localStorage.setItem("justLoggedOut",true);
    localStorage.removeItem("user");
    History.push("/login");
};

export default {
    register,
    verifyEmail,
    login,
    logout,
    updateAccessToken
};