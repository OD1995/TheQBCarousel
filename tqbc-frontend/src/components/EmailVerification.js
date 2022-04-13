import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { verifyEmail } from "../actions/auth";
import { useDispatch, useSelector } from "react-redux";


const EmailVerification = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();

    console.log("message: " + message);

    useEffect(
        () => {
            searchParams.get("token")
            let token = searchParams.get("token");
            dispatch(verifyEmail(token));
        },
        []
    )

    if (message === "failure") {
        var title = "Email Verification Failure";
        var paragraph = "The provided token is not valid";
    } else {
        var title = "Email Verification Success";
        var paragraph = "Your email address has been successfully verified! ";
        paragraph += "You can now login and start your predictions.";
    }

    return (
        <div id="emailVerificationDiv">
            <h3>
                {title}
            </h3>
            <p>
                {paragraph}
            </p>
        </div>
    )
}

export default EmailVerification;