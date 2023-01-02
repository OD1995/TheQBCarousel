import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import { isEmail, isAlphanumeric } from "validator";
import "./Register.css";

import TeamService from "../../services/TeamService";
import AuthService from "../../services/AuthService";


const Register = () => {

    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [favTeam, setFavTeam] = useState("");
    const [favTeamList, setFavTeamList] = useState([]);
    const [favTeamError, setFavTeamError] = useState("");
    const [registerError, setRegisterError] = useState("");
    const [registerSuccess, setRegisterSuccess] = useState("")
    const [buttonDisabled, setButtonDisabled] = useState(false);
    
    useEffect(() => {
        TeamService.getActiveTeams().then(
            (res) => {
                // console.log("activeTeams");
                // console.log(res.data);
                let teams_array = [
                    {
                        label: "n/a",
                        value: null
                    }
                ];
                for (const team_obj of res.data) {
                    teams_array.push(
                        {
                            label: team_obj.location + " " + team_obj.nickname,
                            value: team_obj.teamID
                        }
                    );
                }
                setFavTeamList(teams_array);
                // console.log("favTeamList");
                // console.log(favTeamList);
                // console.log("teams_array");
                // console.log(teams_array);
            }
        )
    },[])

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onChangeFavTeam = (e) => {
        setFavTeam(e.value);
    }

    const handleRegister = () => {
        setButtonDisabled(true);
        setUsernameError("");
        setEmailError("");
        setPasswordError("");
        setFavTeamError("");
        setRegisterError("");
        setRegisterSuccess("");
        // Username
        var username_ok = false;
        if (username.length === 0) {
            setUsernameError("Please provide a username");
        } else if (username.length < 3 || username.length > 20) {
            setUsernameError(
                "Your username must be between 3 and 20 characters"
            );
        } else if (!isAlphanumeric(username,"en-GB",{ignore:"_"})) {
            setUsernameError(
                "Your username must use only numbers, letters and underscores"
            );
        } else {
            username_ok = true;
        }
        // Email
        var email_ok = false;
        if (email.length === 0) {
            setEmailError("Please provide an email address");
        } else if (!isEmail(email)) {
            setEmailError("This is not a valid email address");
        } else {
            email_ok = true;
        }
        // Password
        var password_ok = false;
        if (password.length === 0) {
            setPasswordError("Please provide a password");
        } else if (password.length < 6 || password.length > 40) {
            setPasswordError("Your password must be between 6 and 40 characters");
        } else {
            password_ok = true;
        }
        // Fav team
        var favTeam_ok = true;
        if (favTeam === "") {
            setFavTeamError("Please set your favourite team");
            favTeam_ok = false;
        }
        if (username_ok && email_ok && password_ok && favTeam_ok) {
            AuthService.register(
                username,
                favTeam,
                email,
                password
            ).then(
                (res) => {
                    setRegisterSuccess(res.data.message);
                }
            ).catch(
                (err) => {
                    setRegisterError(err.response.data.message);
                }
            )
        } else {
            setButtonDisabled(false);
        }
    }

    return (
        <div
            id="register-parent-div"
        >
            <div>
                <h1
                    className="big-h1-title"
                    >
                    Register
                </h1>
            </div>
            <div
                id="register-input-parent-div"
            >
                <div
                    id="register-input-grid"
                >
                    <h5
                        style={{
                            gridRow: 1,
                            gridColumn: 1
                        }}
                    >
                        Username
                    </h5>
                    <input
                        onChange={onChangeUsername}
                        className="register-input"
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
                        Email
                    </h5>
                    <input
                        onChange={onChangeEmail}
                        className="register-input"
                        style={{
                            gridRow: 3,
                            gridColumn: 2
                        }}
                    />
                    <p
                        className="tqbc-red-error"
                        style={{
                            gridRow: 4,
                            gridColumnStart: 1,
                            gridColumnEnd: 3
                        }}
                    >
                        {emailError}
                    </p>
                    <h5
                        style={{
                            gridRow: 5,
                            gridColumn: 1
                        }}
                    >
                        Password
                    </h5>
                    <input
                        onChange={onChangePassword}
                        className="register-input"
                        style={{
                            gridRow: 5,
                            gridColumn: 2
                        }}
                        type='password'
                    />
                    <p
                        className="tqbc-red-error"
                        style={{
                            gridRow: 6,
                            gridColumnStart: 1,
                            gridColumnEnd: 3
                        }}
                    >
                        {passwordError}
                    </p>
                    <h5
                        style={{
                            gridRow: 7,
                            gridColumn: 1
                        }}
                    >
                        Fav Team
                    </h5>
                    <div
                        style={{
                            gridRow: 7,
                            gridColumn: 2
                        }}
                        className='register-input'
                    >
                        <Select
                            defaultValue={favTeam}
                            // onChange={event => setFavTeam(event.value)}
                            onChange={onChangeFavTeam}
                            options={favTeamList}
                            isSearchable={true}
                            className='favTeam_selector_select'
                            // id=''
                        />
                    </div>
                    <p
                        className="tqbc-red-error"
                        style={{
                            gridRow: 8,
                            gridColumnStart: 1,
                            gridColumnEnd: 3
                        }}
                    >
                        {favTeamError}
                    </p>
                </div>
                <button
                    id="register-button"
                    className="tqbc-black-button"
                    onClick={handleRegister} 
                    disabled={buttonDisabled}                   
                >
                    Register
                </button>
                <div
                    id="register-result-div"
                >
                    <p
                        id="register-error"
                        className="tqbc-red-error register-result"
                        style={{
                            gridRow: 1,
                            gridColumn: 1
                        }}
                    >
                        {registerError}
                    </p>
                    <p
                        id="register-success"
                        className="tqbc-green-message register-result"
                        style={{
                            gridRow: 1,
                            gridColumn: 1
                        }}
                    >
                        {registerSuccess}
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Register;