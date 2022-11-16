import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import History from "../helpers/History";

const BoardAdmin = () => {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user.roles.includes("ROLE_ADMIN")) {
            setShowContent(true)
        } else {
            History.navigate('/how-it-works')
        }
    }, []);

    if (showContent) {
        return (
            <div className="container">
                {/* <header className="jumbotron">
                    <h3>CAT</h3>
                </header> */}
                <a href="/answer-entry/2022">
                    Answer Entry
                </a>
            </div>
        );
    } else {
        return null;
    }
};

export default BoardAdmin;

// const BoardAdmin = () => {
    
//     return (
//         <div>
//             <h1>DOG</h1>
//         </div>
//     )
// }

// export default BoardAdmin;