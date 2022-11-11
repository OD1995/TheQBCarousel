import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom"

import { clearMessage } from "../actions/message";

const Navigator = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(
        (location) => {
            console.log("Changing location, clearMessage called");
		    // Clear messsage when changing location
            dispatch(clearMessage()); 
        },
        [location]
    )

    return (
        null
    )
}

export default Navigator;