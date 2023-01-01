import { useParams } from "react-router-dom";
import { EmailSubscriptionTypeYes } from "./EmailSubscriptionTypeYes";
import { EmailSubscriptionTypeNo } from "./EmailSubscriptionTypeNo";
import './EmailSendOuts.css';

export const EmailSendOuts = () => {
    
    const params = useParams();

    if (params.emailSubscriptionTypeID == null) {
        return <EmailSubscriptionTypeNo/>
    } else {
        return <EmailSubscriptionTypeYes/>
    }
}