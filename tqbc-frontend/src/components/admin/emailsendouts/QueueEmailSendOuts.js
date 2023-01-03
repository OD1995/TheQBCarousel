import { useParams } from "react-router-dom";
import { EmailSubscriptionTypeYes } from "./EmailSubscriptionTypeYes";
import { EmailSubscriptionTypeNo } from "./EmailSubscriptionTypeNo";
import './EmailSendOuts.css';
import { useSelector } from "react-redux";
import History from "../../../helpers/History";
import { useEffect } from "react";
import TokenService from "../../../services/Token.service";

export const QueueEmailSendOuts = () => {
    
    const params = useParams();

    useEffect(
        () => {
            const user = TokenService.getUser();
            if (user === null) {
                History.push("/nope");
            } else if (!user.roles.includes("ROLE_ADMIN")) {
                History.push("/nope");
            } else {
                document.title = "Queue Email Send Outs";
            }
        },
        []
    )

    if (params.emailSubscriptionTypeID == null) {
        return <EmailSubscriptionTypeNo/>
    } else {
        return <EmailSubscriptionTypeYes/>
    }
}