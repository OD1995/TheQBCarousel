import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/Token.service";

export const NavBarDropdown = (props) => {

    const [privateLeaderboardInfos, setPrivateLeaderboardInfos] = useState([]);

    useEffect(
        () => {
            setPrivateLeaderboardInfos(TokenService.getPrivateLeaderboardInfoList());
        },
        []
    )

    return (
        <div
            className="navbar-dropdown bg-black navbar-dark"
            onMouseEnter={() => props.setShow(true)}
            onMouseLeave={() => props.setShow(false)}
            onClick={() => props.setShow(false)}
        >
            <ul
                style={{
                    listStyleType: "none",
                    paddingLeft: 0
                }}
            >

                {
                    privateLeaderboardInfos.map(
                        (pli) => {
                            let A = (
                                <li className="nav-item" key={pli.uuid + "-a"}>
                                    <Link
                                        to={"/private-leaderboard/" + pli.uuid}
                                        className="nav-link"
                                    >
                                        {pli.name}
                                    </Link>
                                </li>
                            );
                            let B = <li className="navbar-dropdown-divider" key={pli.uuid + "-b"}></li>
                            return [A,B];
                        }
                    )
                }
                <li className="nav-item">
                    <Link
                        to={"/create-new-private-leaderboard"}
                        className="nav-link"
                    >
                        Create New
                    </Link>
                </li>
                <li className="navbar-dropdown-divider"></li>
                <li className="nav-item">
                    <Link
                        to={"/join-private-leaderboard"}
                        className="nav-link"
                    >
                        Join
                    </Link>
                </li>
            </ul>
        </div>
    );
}