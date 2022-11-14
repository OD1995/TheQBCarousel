import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { updateAccessToken } from "../actions/auth";
import { history } from "../helpers/History";
import AuthService from "../services/auth.service";

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
};

const AuthVerify = (props) => {
    let location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
  
      if (user) {
        const decodedJwt = parseJwt(user.accessToken);
  
        if (decodedJwt.exp * 1000 < Date.now()) {
            // Get new access token using refresh token
            dispatch(updateAccessToken(user.refreshToken));
            if (false) {
                // If refresh token has expired, logout
                props.logOut();
            }
        }
      }
    }, [location, props]);

    return <div></div>;
};

export default AuthVerify;