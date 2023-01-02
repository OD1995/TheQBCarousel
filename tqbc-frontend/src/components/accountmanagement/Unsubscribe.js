import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import History from "../../helpers/History";
import EmailService from "../../services/EmailService";
import './Unsubscribe.css';

export const Unsubscribe = () => {

    const [subscriptionTypeTidy, setSubscriptionTypeTidy] = useState("")
    const [subscriptionDescription, setSubscriptionDescription] = useState("");
    const [emailSubscriptionTypeID, setEmailSubscriptionTypeID] = useState(null);
    const { user: currentUser } = useSelector((state) => state.auth);

    const params = useParams();

    useEffect(
        () => {
            if (currentUser === null) {
                History.push(`/login?next=${window.location.pathname}`);
            }
            EmailService.getEmailSubscriptionType(
                params.emailSubscriptionType
            ).then(
                (res) => {
                    if (res.data === "") {
                        History.push("/nope")
                    } else {
                        setSubscriptionTypeTidy(res.data.emailTypeTidy);
                        setSubscriptionDescription(res.data.description);
                        setEmailSubscriptionTypeID(res.data.emailTypeID);
                    }
                }
            )
        },
        []
    )

    const handleYesSubmit = () => {
        EmailService.unsubscribeUser(
            currentUser.userID,
            emailSubscriptionTypeID
        ).then(
            (res) => {
                History.push("/qb-predictions")
            }
        )
    }

    const handleNoSubmit = () => {
        History.push("/qb-predictions");
    }

    return (
        <div
            id="unsubscribe-parent-div"
        >
            <h1
                className="big-h1-title"
            >
                Unsubscribe From Email Reminder Type
            </h1>
            <div
                id="unsubscribe-content-div"
            >
                <div
                    id="unsubscribe-type-div"
                    className="unsubscribe-text-div"
                >
                    <h5>
                        Type:
                    </h5>
                    <h5
                        className="unsubscribe-text-value"
                    >
                        {subscriptionTypeTidy}
                    </h5>
                </div>
                <div
                    id="unsubscribe-description-div"
                    className="unsubscribe-text-div"
                >
                    <h5>
                        Description:
                    </h5>
                    <h5
                        className="unsubscribe-text-value"
                    >
                        {subscriptionDescription}
                    </h5>
                </div>
                <p
                    style={{
                        marginTop: "5vh"
                    }}
                >
                    Are you sure you want to unsubscribe from this reminder?
                </p>
                <div
                    id="unsubscribe-button-options"
                >
                    <button
                        className="tqbc-red-button"
                        onClick={handleYesSubmit}
                    >
                        Yes
                    </button>
                    <button
                        className="tqbc-green-button"
                        onClick={handleNoSubmit}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}