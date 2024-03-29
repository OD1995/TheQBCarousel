import { useState } from "react"
import { Link } from "react-router-dom"
import { DesktopNavBarDropdown } from "./DesktopNavBarDropdown";
import './DesktopNavigationBar.css';

export const DesktopNavigationBar = (props) => {

    const [showPrivateLeaderboardDropdown, setShowPrivateLeaderboardDropdown] = useState(false);

    return (
        <nav className="navbar navbar-expand navbar-dark bg-black">
            <Link to={"/how-it-works"} className="navbar-brand">
                <img
                    src={window.location.origin + '/tqbc_logos/rectangle-logo.png'}
                    id="tqbc-navbar-logo"
                    alt="The QB Carousel logo"
                />
            </Link>

            <div className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to={"/how-it-works"} className="nav-link">
                        How It Works
                    </Link>
                </li>

                {props.showAdminBoard && (
                    <li className="nav-item">
                        <Link to={"/admin"} className="nav-link">
                            Admin Board
                        </Link>
                    </li>
                )}
            </div>

            {props.currentUser ? (
                <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to={"/qb-predictions"} className="nav-link">
                            Prediction Board
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/prediction-history/" + props.currentUser.username} className="nav-link">
                            My Prediction History
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/global-leaderboard"} className="nav-link">
                            Global Leaderboard
                        </Link>
                    </li>
                    <li
                        id="private-leaderboard-link"
                        onMouseEnter={() => setShowPrivateLeaderboardDropdown(true)}
                        onMouseLeave={() => setShowPrivateLeaderboardDropdown(false)}
                        onClick={() => setShowPrivateLeaderboardDropdown(!showPrivateLeaderboardDropdown)}
                    >
                        <div
                            id="private-leaderboard-link2"
                            className="nav-link"
                        >
                            Private Leaderboards
                        </div>
                        {
                            showPrivateLeaderboardDropdown && (
                                <DesktopNavBarDropdown
                                    show={showPrivateLeaderboardDropdown}
                                    setShow={setShowPrivateLeaderboardDropdown}
                                />
                            )
                        }
                    </li>
                    <li className="nav-item">
                        <a
                            href="/login"
                            className="nav-link"
                            onClick={props.logOut}
                        >
                            Log Out
                        </a>
                    </li>
                </div>
            ) : (
                <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to={"/login"} className="nav-link">
                            Log In
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to={"/register"} className="nav-link">
                            Register
                        </Link>
                    </li>
                </div>
            )}
            <div id="report-an-issue-div" className="navbar-nav">
                <li 
                    className="nav-item"
                >
                    <Link
                        to="/report-an-issue"
                        id="report-an-issue-link"
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