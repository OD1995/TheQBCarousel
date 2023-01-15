import { useState } from "react";
import "./MobileMenu.css";
import { MobileMenuContent } from "./MobileMenuContent";
import { MobilePrivateLeaderboardSubmenu } from "./MobilePrivateLeaderboardSubmenu";

export const MobileMenu = (props) => {

    const [showPrivateLeaderboardSubmenu,setShowPrivateLeaderboardSubmenu] = useState(false);

    if (showPrivateLeaderboardSubmenu) {
        return (
            <MobilePrivateLeaderboardSubmenu
                setShowMenu={props.setShowMenu}
                setShowPrivateLeaderboardSubmenu={setShowPrivateLeaderboardSubmenu}
            />
        )
    } else {
        return (
            <MobileMenuContent
                setShowPrivateLeaderboardSubmenu={setShowPrivateLeaderboardSubmenu}
                showAdminBoard={props.showAdminBoard}
                showMenu={props.showMenu}
                setShowMenu={props.setShowMenu}
                currentUser={props.currentUser}
                logOut={props.logOut}
            />
        )
    }
}