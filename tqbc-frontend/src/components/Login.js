import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import './Login.css';

import { login } from "../actions/auth";
import AuthService from "../services/AuthService";
import { LOGIN_SUCCESS } from "../actions/types";
import History from "../helpers/History";
import TokenService from "../services/Token.service";



const Login = (props) => {

    const [usernameEmail, setUsernameEmail] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loginError, setLoginError] = useState("")

    const { isLoggedIn } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const handleLogin2 = () => {
        setUsernameError("");
        setPasswordError("");
        setLoginError("");
        var username_ok = true;
        if (usernameEmail.length === 0) {
            setUsernameError(
                "Please provide your username or email"
            );
            username_ok = false;
        }
        var password_ok = true;
        if (password.length === 0) {
            setPasswordError(
                "Please provide your password"
            )
            password_ok = false;
        }
        if (username_ok && password_ok) {
            AuthService.login(
                usernameEmail,
                password
            ).then(
                (res) => {
                    TokenService.setUser(res.data.user);
                    TokenService.setPrivateLeaderboardInfos(res.data.privateLeaderboardInfos);
                    dispatch(
                        {
                            type: LOGIN_SUCCESS,
                            payload: {
                                user: res.data.user,
                                privateLeaderboardInfos: res.data.privateLeaderboardInfos
                            }
                        }
                    );
                    History.push("/qb-predictions");
                }
            ).catch(
                (err) => {
                    setLoginError(err.response.data.message);
                }
            )
        }
    }

    const onChangeUsernameEmail = (e) => {
        setUsernameEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    if (isLoggedIn) {
        return (
            <Navigate to="/qb-predictions" />
        );
    }

    return (
        <div
            id="login-parent-div"
        >
            <div>
                <h1
                    className="big-h1-title"
                    >
                    Login
                </h1>
            </div>
            <div
                id="login-input-parent-div"
            >
                <div
                    id="login-input-grid"
                >
                    <h5
                        style={{
                            gridRow: 1,
                            gridColumn: 1
                        }}
                    >
                        Username/Email
                    </h5>
                    <input
                        onChange={onChangeUsernameEmail}
                        className="login-input"
                        style={{
                            gridRow: 1,
                            gridColumn: 2
                        }}
                    />
                    <p
                        className="tqbc-red-error"
                        style={{
                            gridRow: 2,
                            gridColumnStart: 1,
                            gridColumnEnd: 3
                        }}
                    >
                        {usernameError}
                    </p>
                    <h5
                        style={{
                            gridRow: 3,
                            gridColumn: 1
                        }}
                    >
                        Password
                    </h5>
                    <input
                        onChange={onChangePassword}
                        className="login-input"
                        style={{
                            gridRow: 3,
                            gridColumn: 2
                        }}
                        type='password'
                    />
                    <p
                        className="tqbc-red-error"
                        style={{
                            gridRow: 4,
                            gridColumnStart: 1,
                            gridColumnEnd: 3
                        }}
                    >
                        {passwordError}
                    </p>

                </div>
                <button
                    id="login-button"
                    className="tqbc-black-button"
                    onClick={handleLogin2}
                    
                >
                    Login
                </button>
                <p
                    id="login-error"
                    className="tqbc-red-error"
                >
                    {loginError}
                </p>
            </div>
        </div>
    );
};

export default Login;