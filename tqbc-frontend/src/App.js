import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
	BrowserRouter as Router,
	Link,
	Navigate,
	Route,
	Routes,
} from 'react-router-dom';

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";


import ListTeamComponent from './components/ListTeamComponent';
import QBPredictionsComponent from './components/qbcomponents/pages/QBPredictions';
import QBPredictionHistoryComponent from './components/qbcomponents/pages/QBPredictionHistory';
import Navigator from './components/Navigator';
import Login from "./components/Login";
import Register from "./components/Register";
import HowItWorks from "./components/HowItWorks";
import Profile from "./components/Profile";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import EmailVerification from "./components/EmailVerification";

import { logout } from "./actions/auth";

import { history } from "./helpers/history";

import EventBus from "./common/EventBus";

const App = () => {
	const [showModeratorBoard, setShowModeratorBoard] = useState(false);
	const [showAdminBoard, setShowAdminBoard] = useState(false);

	const { user: currentUser } = useSelector((state) => state.auth);
	const { isLoggedIn } = useSelector(state => state.auth);
	// const location = useLocation();
	
	const dispatch = useDispatch();

	// const listenFunction = (location) => {
	// 	console.log("Changing location, clearMessage called");
	// 	dispatch(clearMessage()); // Clear messsage when changing location
	// }

	// useEffect(() => {
	// 	console.log("hi")
	// 	// console.log(history)
	// 	// history.listen(
	// 	// 	// console.log("hello")
	// 	// 	// console.log(location)
	// 	// 	// (location) => {
	// 	// 	// 	console.log("Changing location, clearMessage called");
	// 	// 	// 	dispatch(clearMessage()); // Clear messsage when changing location
	// 	// 	// }
	// 	// 	listenFunction
	// 	// );
	// 	history.listen(({ action, location }) => {
	// 		console.log(
	// 		  `The current URL is ${location.pathname}${location.search}${location.hash}`
	// 		);
	// 		console.log(`The last navigation action was ${action}`);
	// 	  });
	// 	console.log(history)
	// }, [dispatch]);

	// useEffect(
	// 	() => {
	// 		console.log("loc has changed");

	// 	},
	// 	[location]
	// )

	const logOut = useCallback(() => {
		dispatch(logout());
	}, [dispatch]);

	useEffect(() => {
		if (currentUser) {
			setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
			setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
		} else {
			setShowModeratorBoard(false);
			setShowAdminBoard(false);
		}

		EventBus.on("logout", () => {
			logOut();
		});

		return () => {
			EventBus.remove("logout");
		}
	}, [currentUser, logOut]);

  	return (
		<div>
			<Router history={history}>
				<div className='navigation-bar'>
					<Navigator/>
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

							{showModeratorBoard && (
								<li className="nav-item">
									<Link to={"/mod"} className="nav-link">
										Moderator Board
									</Link>
								</li>
							)}

							{showAdminBoard && (
								<li className="nav-item">
									<Link to={"/admin"} className="nav-link">
										Admin Board
									</Link>
								</li>
							)}
						</div>

						{currentUser ? (
							<div className="navbar-nav ml-auto">
								<li className="nav-item">
									<Link to={"/profile"} className="nav-link">
										{currentUser.username}
									</Link>
								</li>
								<li className="nav-item">
									<Link to={"/qb-predictions"} className="nav-link">
										Prediction Board
									</Link>
								</li>
								<li className="nav-item">
									<Link to={"/prediction-history/" + currentUser.username} className="nav-link">
										My Prediction History
									</Link>
								</li>
								<li className="nav-item">
									<a href="/how-it-works" className="nav-link" onClick={logOut}>
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
					</nav>
				</div>

				<div className="component-container container page-content">
					<Routes>
						<Route
							index
							element={
								isLoggedIn ? (
									<Navigate replace to="/profile" />
								) : (
									<Navigate replace to="/how-it-works" />
								)
							}
						/>
						<Route exact path="/how-it-works" element={<HowItWorks/>}></Route>
						<Route exact path="/login" element={<Login/>}></Route>
						<Route exact path="/register" element={<Register/>} />
						<Route exact path="/profile" element={<Profile/>} />
						<Route path="/mod" element={<BoardModerator/>} />
						<Route path="/admin" component={<BoardAdmin/>} />
						<Route path="/list-teams" element={<ListTeamComponent/>}></Route>
						<Route path="/qb-predictions" element={<QBPredictionsComponent/>}></Route>
						<Route
							path="/prediction-history/:username/"
							element={<QBPredictionHistoryComponent/>}
						></Route>
						<Route
							path="/prediction-history/:username/historyID"
							element={<QBPredictionHistoryComponent/>}
						></Route>
						<Route path="/email-verification" element={<EmailVerification/>}></Route>
					</Routes>
				</div>
			</Router>
		</div>
  	);
}

export default App;