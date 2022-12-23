import { Link } from "react-router-dom";

export const NavBarDropdown = (props) => {
    return (
        <div
            className="navbar-dropdown bg-black navbar-dark"
            onMouseEnter={() => props.setShow(true)}
            onMouseLeave={() => props.setShow(false)}
            onClick={() => props.setShow(false)}
        >
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