import { 
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAIL, 
    REGISTER_SUCCESS
} from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));
const privateLeaderboardInfos = JSON.parse(localStorage.getItem("privateLeaderboardInfos"));

const initialState = user
    ? { isLoggedIn: true, user, privateLeaderboardInfos}
    : { isLoggedIn: false, user: null, privateLeaderboardInfos: [] };

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false
            };
        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
                privateLeaderboardInfos: payload.privateLeaderboardInfos
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        default:
            return state;
    }
}