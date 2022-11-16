import api from './api.js';

const API_URL = "/v1/test/";

const getPublicContent = () => {
    return api.get(
        API_URL + "all"
    );
};

const getUserBoard = () => {
    return api.get(
        API_URL + "user"
    )
};

const getModeratorBoard = () => {
    return api.get(
        API_URL + "mod"
    )
};

const getAdminBoard = () => {
    return api.get(
        API_URL + "admin"
    )
};

export default {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard
};