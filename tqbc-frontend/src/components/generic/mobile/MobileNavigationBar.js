import { useState } from "react"
import { Link } from "react-router-dom"
// import { NavBarDropdown } from "./NavBarDropdown";
import './MobileNavigationBar.css';

export const MobileNavigationBar = (props) => {

    const [showPrivateLeaderboardDropdown, setShowPrivateLeaderboardDropdown] = useState(false);

    return (
        <nav id="mobile-nav-bar" className="navbar navbar-expand navbar-dark bg-black">
            <Link
                to={"/how-it-works"}
                // className="navbar-brand"
            >
                <img
                    src={window.location.origin + '/tqbc_logos/rectangle-logo.png'}
                    id="tqbc-navbar-logo"
                    alt="The QB Carousel logo"
                />
            </Link>
            <div
                // className="navbar-nav"
            >
                <li 
                    id="mobile-menu-link"
                    className="nav-item"
                    onClick={() => props.setShowMenu(!props.showMenu)}
                >
                    MENU
                </li>
            </div>
            <div
                id="mobile-report-an-issue-div"
                // className="navbar-nav"
            >
                <li 
                    className="nav-item"
                >
                    <Link
                        to="/report-an-issue"
                        id="mobile-report-an-issue-link"
                        className="nav-link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Report An Issue
                    </Link>
                </li>
            </div>
        </nav>
    )
}