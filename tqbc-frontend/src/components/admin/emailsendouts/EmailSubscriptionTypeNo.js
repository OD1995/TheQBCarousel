import { useState } from "react";
import History from "../../../helpers/History";
import EmailService from "../../../services/EmailService";

export const EmailSubscriptionTypeNo = () => {

    const [buttons, setButtons] = useState([]);

    useState(
        () => {
            EmailService.getEmailSubscriptionTypes().then(
                (res) => {
                    createButtons(res.data);
                }
            )
        },
        []
    )

    const navigateAway = (estID) => {
        History.push("/email-send-outs/" + estID);
    }

    const createButtons = (data) => {
        let btns = [];
        for (const D of data) {
            btns.push(
                <button
                    className="tqbc-black-button"
                    onClick={() => navigateAway(D.emailSubscriptionTypeID)}
                    key={D.emailSubscriptionTypeID}
                >
                    {D.emailSubscriptionTypeTidy}
                </button>
            )
        }
        setButtons(btns);
    }


    return (
        <div
            id='estno-parent-div'
        >
            <h1
                className="big-h1-title"
            >
                Choose Email Type
            </h1>
            <div
                id="estno-buttons-div"
            >
                {buttons}
            </div>
        </div>
    );
}