import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from "react-select";
import { isEmail } from "validator";
import "./Register.css";

import { register } from "../actions/auth";
import TeamService from "../services/TeamService";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div
                className="alert alert-danger"
                role="alert"
            >
                This is not a valid email.
            </div>
        )
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div
                className="alert alert-danger"
                role="alert"
            >
                The username must be between 3 and 20 characters.
            </div>
        )
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div
                className="alert alert-danger"
                role="alert"
            >
                The password must be between 6 and 40 characters.
            </div>            
        )
    }
};

const Register2 = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [favTeam, setFavTeam] = useState(null);
    const [favTeamList, setFavTeamList] = useState([]);
    const [favTeamError, setFavTeamError] = useState("");
    const [registerError, setRegisterError] = useState("");
    
    const { message } = useSelector(state => state.message);
    
    const dispatch = useDispatch();

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

    // const handleRegister = (e) => {
    //     e.preventDefault();

    //     setSuccessful(false);

    //     form.current.validateAll();

    //     if (checkBtn.current.context._errors.length === 0) {
    //         dispatch(register(username,favTeam,email,password))
    //             .then(
    //                 () => {
    //                     setSuccessful(true);
    //                 }
    //             )
    //             .catch(
    //                 () => {
    //                     setSuccessful(false);
    //                 }
    //             );
    //     }
    // };

    const handleRegister = () => {
        setUsernameError("");
        setEmailError("");
        setPasswordError("");
        setRegisterError("");
        // Username
        var username_ok = false;
        if (username.length === 0) {
            setUsernameError("Please provide a username");
        } else if (username.length < 3 || username.length > 20) {
            setUsernameError(
                "Your username must be between 3 and 20 characters"
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
        if (favTeam == null) {
            setFavTeamError("Please set your favourite team");
            favTeam_ok = false;
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
                        Favourite Team
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
                            onChange={event => setFavTeam(event.value)}
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
                >
                    Register
                </button>
                <p
                    id="register-error"
                    className="tqbc-red-error"
                >
                    {registerError}
                </p>

            </div>
        </div>
        // <div className="col-md-12">
        //     <div>

        //         <Form
        //             onSubmit={handleRegister}
        //             ref={form}
        //         >
        //             {!successful && (
        //                 <div>
        //                     <div className="form-group">
        //                         <label htmlFor="username">Username</label>
        //                         <Input
        //                             type="text"
        //                             className="form-control"
        //                             name="username"
        //                             value={username}
        //                             onChange={onChangeUsername}
        //                             validations={[required,vusername]}
        //                         />
        //                     </div>

        //                     <div className="form-group">
        //                         <label htmlFor="favTeam">Favourite Team</label>
        //                         <Select
        //                             defaultValue={favTeam}
        //                             onChange={event => setFavTeam(event.value)}
        //                             options={favTeamList}
        //                             isSearchable={true}
        //                             className='favTeam_selector_select'
        //                             // id=''
        //                         />
        //                     </div>

        //                     <div className="form-group">
        //                         <label htmlFor="email">Email</label>
        //                         <Input
        //                             type="text"
        //                             className="form-control"
        //                             name="email"
        //                             value={email}
        //                             onChange={onChangeEmail}
        //                             validations={[required,validEmail]}
        //                         />
        //                     </div>

        //                     <div className="form-group">
        //                         <label htmlFor="password">Password</label>
        //                         <Input
        //                             type="password"
        //                             className="form-control"
        //                             name="password"
        //                             value={password}
        //                             onChange={onChangePassword}
        //                             validations={[required,vpassword]}
        //                         />
        //                     </div>

        //                     <div className="form-group">
        //                         <button
        //                             // className="btn btn-primary btn-block"
        //                             className="tqbc-black-button"
        //                         >
        //                             Sign Up
        //                         </button>
        //                     </div>
        //                 </div>
        //             )}

        //             {message && (
        //                 <div className="form-group">
        //                     <div
        //                         className={ successful ? "alert alert-success" : "alert alert-danger"}
        //                         role="alert"
        //                     >
        //                         {message}
        //                     </div>
        //                 </div>
        //             )}

        //             <CheckButton
        //                 style={{ display: "none"}}
        //                 ref={checkBtn}
        //             />

        //         </Form>
        //     </div>
        // </div>
    );
};

export default Register2;