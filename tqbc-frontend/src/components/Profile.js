import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Profile = () => {
    const { user: currentUser } = useSelector((state) => state.auth);

    useEffect(
        () => {
            document.title = 'Profile';
        }
    )

    if (!currentUser) {
        return (
            <Navigate to="/login" />
        );
    }

    console.log(currentUser);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{currentUser.username}</strong> Profile
                </h3>
            </header>
            <p style={{fontSize:'12px'}}>
                <strong>Token:</strong> {currentUser.accessToken}
            </p>
            <p>
                <strong>User ID:</strong> {currentUser.userID}
            </p>
            <p>
                <strong>Email:</strong> {currentUser.email}
            </p>
            <strong>Authorities</strong>
            <ul>
                {currentUser.roles && 
                    currentUser.roles.map((role,index) => <li key={index}>{role}</li>)}
            </ul>
        </div>
    );
};

export default Profile;