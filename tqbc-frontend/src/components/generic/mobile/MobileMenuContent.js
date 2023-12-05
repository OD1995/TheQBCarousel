import { Link } from "react-router-dom"

export const MobileMenuContent = (props) => {

    const hideMenu = () => {
        props.setShowMenu(false);
    }

    const handleLogout = () => {
        hideMenu();
        props.logOut();
    }

    return (
        <div id="main-menu-div" className="mobile-menu-div">
            <Link
                to={"/how-it-works"}
                key="how-it-works"
                className="mobile-menu-link"
                onClick={hideMenu}
            >
                How It Works
            </Link>
            {
                props.showAdminBoard && (
                    <Link
                        to={"/admin"}
                        key="admin"
                        className="mobile-menu-link"
                        onClick={hideMenu}
                    >
                        Admin Board
                    </Link>
                )
            }
            {
                props.currentUser ? (
                    [
                        <Link
                            to="/qb-predictions"
                            key="qb-predictions"
                            className="mobile-menu-link"
                            onClick={hideMenu}
                        >
                            Prediction Board
                        </Link>,
                        <Link
                            to={"/prediction-history/" + props.currentUser.username}
                            key="prediction-history"
                            className="mobile-menu-link"
                            onClick={hideMenu}
                        >
                            My Prediction History
                        </Link>,
                        <Link
                            to="/global-leaderboard"
                            key="global-leaderboard"
                            className="mobile-menu-link"
                            onClick={hideMenu}
                        >
                            Global Leaderboard
                        </Link>,
                        <div
                            onClick={() => props.setShowPrivateLeaderboardSubmenu(true)}
                            key="private-leaderboards"
                            className="mobile-menu-link"
                        >
                            Private Leaderboards
                        </div>,
                        <a
                            href="/login"
                            className="mobile-menu-link"
                            key="logout"
                            onClick={handleLogout}
                        >
                            Log Out
                        </a>
                    ]
                ) : (
                    [
                        <Link
                            to="/login"
                            key="login"
                            className="mobile-menu-link"
                            onClick={hideMenu}
                        >
                            Log In
                        </Link>,
                        <Link
                            to="/register"
                            key="register"
                            className="mobile-menu-link"
                            onClick={hideMenu}
                        >
                            Register
                        </Link>
                    ]
                )
            }
        </div>
    )
}