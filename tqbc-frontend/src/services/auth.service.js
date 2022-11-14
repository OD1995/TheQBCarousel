import axios from "axios";
import { useNavigate } from "react-router-dom";
import History from "../helpers/History";

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
            localStorage.setItem("user",JSON.stringify(response.data));
        }

        return response.data;
    });
};

const logout = (history) => {
    localStorage.setItem("justLoggedOut",true);
    localStorage.removeItem("user");
    // history.push('/login');
    // const nav = useNavigate();
    // nav("/login");
    History.push("/login");
};

export default {
    register,
    verifyEmail,
    login,
    logout,
    updateAccessToken
};