import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { verifyEmail } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import PlainPageComponent from "../generic/PlainPageComponent";


const EmailVerification = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();

    useEffect(
        () => {
            // searchParams.get("token")
            let token = searchParams.get("token");
            dispatch(verifyEmail(token));
        },
        []
    )

    var title;
    var paragraph;
    if (message === "failure") {
        title = "Email Verification Failure";
        paragraph = "The provided token is not valid";
    } else {
        title = "Email Verification Success";
        paragraph = "Your email address has been successfully verified! ";
        paragraph += "You can now login and start your predictions.";
    }
    return (
        <PlainPageComponent
            title={title}
            paragraph={paragraph}
        />
    )
}

export default EmailVerification;