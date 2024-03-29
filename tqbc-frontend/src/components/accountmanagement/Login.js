import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useSearchParams } from "react-router-dom";

import AuthService from "../../services/AuthService";
import { LOGIN_SUCCESS } from "../../actions/types";
import TokenService from "../../services/Token.service";
import './Login.css';



const Login = () => {

    const [usernameEmail, setUsernameEmail] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loginError, setLoginError] = useState("")
    const [loginErrorColour, setLoginErrorColour] = useState("black");
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const { isLoggedIn } = useSelector(state => state.auth);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(
        () => {
            document.title = "Login";
            const keyEnter = (ev) => {
                if (ev.key === 'Enter') {
                    handleLogin();
                }
            }
            document.addEventListener('keydown',keyEnter);
            return () => {
                document.removeEventListener('keydown',keyEnter);
            }
        }
    )
    
    const dispatch = useDispatch();

    async function loginProcess() {
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
            var loginResult = AuthService.login(
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
                    return true;
                }
            ).catch(
                (err) => {
                    setLoginErrorColour("red");
                    setLoginError(err.response.data.message);
                }
            )
        }
        return loginResult ?? false;
    }

    async function handleLogin() {
        setButtonDisabled(true);
        setUsernameError("");
        setPasswordError("");
        setLoginErrorColour("black");
        setLoginError("Loading..");
        let loginWasSuccess = await loginProcess();
        if (!loginWasSuccess) {
            setButtonDisabled(false);
        }
    }

    const onChangeUsernameEmail = (e) => {
        setUsernameEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    // This is the part that does the navigation once the login is successful
    if (isLoggedIn) {
        if (searchParams.get("next") !== null) {
            return <Navigate to={searchParams.get("next")}/>
        } else {
            return <Navigate to="/qb-predictions"/>
        }
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
                    <a
                        href="/forgotten-password/email-entry"
                        style={{
                            gridRow: 5,
                            gridColumnStart: 1,
                            gridColumnEnd: 3
                        }}
                    >
                        Forgotten Password?
                    </a>

                </div>
                <button
                    id="login-button"
                    className={"tqbc-black-button" + (buttonDisabled ? " disabled-button" : "")}
                    onClick={() => handleLogin()}
                    disabled={buttonDisabled}
                >
                    Login
                </button>
                <p
                    id="login-error"
                    // className="tqbc-red-error"
                    style={{
                        color: loginErrorColour
                    }}
                >
                    {loginError}
                </p>
            </div>
        </div>
    );
};

export default Login;