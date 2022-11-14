import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom"

import { clearMessage } from "../actions/message";

const Navigator = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const justLoggedOut = JSON.parse(localStorage.getItem("justLoggedOut"));

    useEffect(
        () => {
            if ((location.pathname === '/login') & justLoggedOut) {
                // If the user has just been logged out, don't clear the message
                localStorage.setItem('justLoggedOut',false);
            } else {
                console.log("Changing location, clearMessage called");
                // Clear messsage when changing location
                dispatch(clearMessage()); 
            }
        },
        [location]
    )

    return (
        null
    )
}

export default Navigator;