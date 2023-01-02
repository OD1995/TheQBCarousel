import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import AuthService from "../../services/AuthService";
import EmailService from "../../services/EmailService";
import './ForgottenPassword.css';

export const ForgottenPasswordEmailEntry = () => {

    const [email, setEmail] = useState("");
    const [disableButton, setDisableButton] = useState(false);
    const [requestResult, setRequestResult] = useState("");
    const [requestResultColour, setRequestResultColour] = useState("black");

    const onChangeInput = (ev) => {
        setEmail(ev.target.value);
    }

    const handleSubmit = () => {
        setDisableButton(true);
        setRequestResult("")
        setRequestResultColour("black")
        AuthService.sendPasswordResetEmail(
            email
        ).then(
            (res) => {
                setRequestResultColour("green")
                let txt1 = `An email has been sent to ${email}. `
                let txt2 = "Follow the instructions on the email to reset your password"
                setRequestResult(txt1 + txt2);
            }
        ).catch(
            (err) => {
                setRequestResultColour("red");
                setRequestResult(err.response.data.message);
                setDisableButton(false);
            }
        )
    }

    return (
        <div>
            <h1
                className="big-h1-title"
            >
                Forgotten Password
            </h1>
            <div
                id="fpee-content-div"
            >
                <div
                    id="fpee-email-div"
                >
                    <h5>
                        Email
                    </h5>
                    <input
                        id="fpee-email-input"
                        onChange={onChangeInput}
                    />
                </div>
                <button
                    className="tqbc-black-button"
                    onClick={handleSubmit}
                    disabled={disableButton}
                    id="fpee-button"
                >
                    Send Password Reset Email
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
    
}