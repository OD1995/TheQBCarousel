import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom"

import { clearMessage } from "../../actions/message";
import TokenService from "../../services/Token.service";

const Navigator = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    // const justLoggedOut = JSON.parse(localStorage.getItem("justLoggedOut"));
    const justLoggedOut = TokenService.getJustLoggedOut();

    useEffect(
        () => {
            if ((location.pathname === '/login') & justLoggedOut) {
                // If the user has just been logged out, don't clear the message
                // localStorage.setItem('justLoggedOut',false);
                TokenService.setJustLoggedOut(false);
            } else {
                console.log("Changing location, clearMessage called");
                // Clear messsage when changing location
                dispatch(clearMessage()); 
            }
            window.gtag(
                "event",
                "page_view",
                {
                    page_path: location.pathname + location.search
                }
            );
        },
        [location]
    )

    return (
        null
    )
}

export default Navigator;