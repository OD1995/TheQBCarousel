import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    SET_MESSAGE,
    VERIFICATION_FAIL,
    VERIFICATION_SUCCESS
} from "./types";
import AuthService from "../services/auth.service"
import EventBus from "../common/EventBus";


export const register = (username, favTeam, email, password) => (dispatch) => {
    return AuthService.register(
        username,
        favTeam,
        email,
        password
    ).then(
        (response) => {
            dispatch(
                {
                    type: REGISTER_SUCCESS
                }
            );

            dispatch(
                {
                    type: SET_MESSAGE,
                    payload: response.data.message
                }
            );

            return Promise.resolve()
        },
        (error) => {
            const message = 
                (
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                ) || error.message || error.toString();

                dispatch(
                    {
                        type: REGISTER_FAIL
                    }
                );

                dispatch(
                    {
                        type: SET_MESSAGE,
                        payload: message
                    }
                )

                return Promise.reject();
        }
    );
};

export const verifyEmail = (token) => (dispatch) => {
    return AuthService.verifyEmail(
        token
    ).then(
        (response) => {
            dispatch(
                {
                    type: VERIFICATION_SUCCESS
                }
            );
            dispatch(
                {
                    type: SET_MESSAGE,
                    payload: response.data.message
                }
            );
            return Promise.resolve();
        },
        (error) => {
            dispatch(
                {
                    type: VERIFICATION_FAIL
                }
            );
            dispatch(
                {
                    type: SET_MESSAGE,
                    payload: error.message
                }
            );
            return Promise.reject();
        }
    )
}

export const login = (username, password) => (dispatch) => {
    return AuthService.login(
        username,
        password
    ).then(
        (data) => {
            dispatch(
                {
                    type: LOGIN_SUCCESS,
                    payload: {
                        user: data
                    }
                }
            );

            return Promise.resolve();
        },
        (error) => {
            const message = 
                (
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                ) || error.message || error.toString();
            
            dispatch(
                {
                    type: LOGIN_FAIL
                }
            );

            dispatch(
                {
                    type: SET_MESSAGE,
                    payload: message
                }
            );

            return Promise.reject();
        }
    );
};

export const logout = () => (dispatch) => {
    AuthService.logout();

    dispatch(
        {
            type: LOGOUT
        }
    );
};

export const updateAccessToken = (refreshToken) => (dispatch) => {
    AuthService.updateAccessToken(refreshToken)
    .then(
        (response) => {
            const user = JSON.parse(localStorage.getItem("user"));
            user.token = response.data.accessToken;
            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );
            return Promise.resolve();
        },
        (error) => {
            const notInDatabaseErrorString = `Failed for [${refreshToken}]: Refresh token is not in database!`;
            if (error.response.data.message === notInDatabaseErrorString) {
                dispatch(
                    {
                        type: SET_MESSAGE,
                        payload: 'A VERY IMPORTANT MESSAGE'
                    }
                )
                EventBus.dispatch("logout");
            }
            return Promise.reject();
        }
    )
}