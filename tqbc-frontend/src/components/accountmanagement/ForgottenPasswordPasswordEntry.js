import { useEffect } from "react";
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import History from "../../helpers/History";
import AuthService from "../../services/AuthService";
import PlainPageComponent from "../generic/PlainPageComponent";
import './ForgottenPassword.css';

export const ForgottenPasswordPasswordEntry = () => {

    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [disableButton, setDisableButton] = useState(false);
    const [requestResult, setRequestResult] = useState("");
    const [requestResultColour, setRequestResultColour] = useState("black");
    const [isValidToken, setIsValidToken] = useState(false);
    const [userID, setUserID] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(
        () => {
            let token = searchParams.get("token")
            if (token === null) {
                setIsValidToken(false)
            }
            AuthService.checkPasswordResetToken(token).then(
                (res) => {
                    setIsValidToken(true);
                    setUserID(res.data);
                }
            ).catch(
                (err) => {
                    setIsValidToken(false);
                }
            )
        },
        []
    )


    const handleSubmit = () => {
        setDisableButton(true);
        setRequestResultColour("black")
        setRequestResult("");
        if (password1 === password2) {
            if (password1.length === 0) {
                setRequestResultColour("red");
                setRequestResult("Please provide your password");
                setDisableButton(false);
            } else if (password1.length < 6 || password1.length > 40) {
                setRequestResultColour("red");
                setRequestResult("Your password must be between 6 and 40 characters");
                setDisableButton(false);
            } else {
                AuthService.updateUserPassword(
                    userID,
                    password1
                ).then(
                    (res) => {
                        setRequestResultColour("green");
                        setRequestResult("Success! Please now login with your new password");
                    }
                ).catch(
                    (err) => {
                        setRequestResultColour("red");
                        setRequestResult(err.response.data.message);
                        setDisableButton(false);
                    }
                )
            }
        } else {
            setRequestResultColour("red");
            setRequestResult("The two passwords provided are not the same, please try again");
            setDisableButton(false);
        }
    }

    const onChange1 = (ev) => {
        setPassword1(ev.target.value);
    }

    const onChange2 = (ev) => {
        setPassword2(ev.target.value);
    }

    if (isValidToken) {

        return (
            <div>
                <h1
                    className="big-h1-title"
                >
                    Forgotten Password
                </h1>
                <div
                    id="fppe-content-div"
                >
                    <div
                        id="fppe-email-div-grid"
                    >
                        <h5
                            style={{
                                gridRow: 1,
                                gridColumn: 1
                            }}
                        >
                            Enter Password
                        </h5>
                        <input
                            className="fppe-input"
                            onChange={onChange1}
                            type="password"
                            style={{
                                gridRow: 1,
                                gridColumn: 2
                            }}
                        />
                        <h5
                            style={{
                                gridRow: 2,
                                gridColumn: 1
                            }}
                        >
                            Enter Password Again
                        </h5>
                        <input
                            className="fppe-input"
                            onChange={onChange2}
                            type="password"
                            style={{
                                gridRow: 2,
                                gridColumn: 2
                            }}
                        />
                    </div>
                    <button
                        className="tqbc-black-button"
                        onClick={handleSubmit}
                        id="fppe-button"
                    >
                        Update Password
                    </button>
                    <p
                        style={{
                            color: requestResultColour
                        }}
                    >
                        {requestResult}
                    </p>
                </div>
            </div>
        );
    } else {
        return (
            <PlainPageComponent
                title="Invalid Password Reset Token"
                paragraph="The token provided is invalid"
            />
        )
    }
    
}