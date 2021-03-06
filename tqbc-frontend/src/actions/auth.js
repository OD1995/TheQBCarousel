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