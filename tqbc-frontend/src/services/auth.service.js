import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_BASE_URL + "/api/v1/auth/";

const register = (username, favTeam, email, password) => {
    return axios.post(
        API_URL + "register",
        {
            username,
            favTeam,
            email,
            password
        }
    );
};

const verifyEmail = (token) => {
    return axios.post(
        API_URL + "verify-email",
        {
            token
        }
    );
}

const updateAccessToken = (refreshToken) => {
    return axios.post(
        API_URL + "refreshtoken",
        {
            refreshToken
        }
    )
}

const login = (username, password) => {
    return axios.post(
        API_URL + "login",
        {
            username,
            password
        }
    )
    .then((response) => {
        if (response.data.accessToken) {
            localStorage.setItem(
                "user",
                JSON.stringify(response.data)
            );
        }

        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem("user");
};

export default {
    register,
    verifyEmail,
    login,
    logout,
    updateAccessToken
};