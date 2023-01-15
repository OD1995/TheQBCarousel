import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../../services/Token.service";

export const MobilePrivateLeaderboardSubmenu = (props) => {

    const [privateLeaderboardInfos, setPrivateLeaderboardInfos] = useState([]);

    useEffect(
        () => {
            setPrivateLeaderboardInfos(TokenService.getPrivateLeaderboardInfoList());
        },
        []
    )

    const hideMenu = () => {
        props.setShowMenu(false);
    }

    const hideSubmenu = () => {
        props.setShowPrivateLeaderboardSubmenu(false);
    }

    return (
        <div
            id="mobile-private-leaderboard-submenu-parent-div"    
        >
            <h1
                id="mobile-submenu-back-arrow"
                onClick={hideSubmenu}
            >
                &lt;
            </h1>
            <div className="mobile-menu-div">
                {
                    privateLeaderboardInfos.map(
                        (pli) => {
                            return (
                                <Link
                                    to={"/private-leaderboard/" + pli.uuid}
                                    onClick={hideMenu}
                                    className="mobile-menu-link"
                                >
                                    {pli.name}
                                </Link>
                            );
                        }
                    )
                }
            </div>
            <div id="mobile-create-join-pl">            
                <Link
                    to="/create-new-private-leaderboard"
                    className="mobile-menu-link"
                >
                    Create New
                </Link>
                <Link
                    to="/join-private-leaderboard"
                    className="mobile-menu-link"
                >
                    Join
                </Link>
            </div>
        </div>
    );
}