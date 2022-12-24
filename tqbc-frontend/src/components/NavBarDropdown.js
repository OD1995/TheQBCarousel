import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const NavBarDropdown = (props) => {

    const { user: currentUser } = useSelector((state) => state.auth);

    return (
        <div
            className="navbar-dropdown bg-black navbar-dark"
            onMouseEnter={() => props.setShow(true)}
            onMouseLeave={() => props.setShow(false)}
            onClick={() => props.setShow(false)}
        >
            {
                currentUser.privateLeaderboardInfos.map(
                    (pli) => {
                        let A = (
                            <li className="nav-item">
                                <Link
                                    to={"/private-leaderboard/" + pli.uuid}
                                    className="nav-link"
                                >
                                    {pli.name}
                                </Link>
                            </li>
                        );
                        let B = <li className="navbar-dropdown-divider"></li>
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
        </div>
    );
}