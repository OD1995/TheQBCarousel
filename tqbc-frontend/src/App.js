import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
	BrowserRouter as Router,
	Link,
	Navigate,
	Route,
	Routes,
	useNavigate,
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
// import { history } from "./helpers/History";
import EventBus from "./common/EventBus";
import AuthVerify from './common/AuthVerify';
import { SET_MESSAGE } from './actions/types';
import { TestComponent } from './components/TestComponent';
import { NavigateSetter } from './helpers/NavigateSetter';
import { AnswerEntry } from './components/answerentry/AnswerEntry';

const App = () => {
	const [showModeratorBoard, setShowModeratorBoard] = useState(false);
	const [showAdminBoard, setShowAdminBoard] = useState(false);
	const { user: currentUser } = useSelector((state) => state.auth);
	const { isLoggedIn } = useSelector(state => state.auth);
	const justLoggedOut = JSON.parse(localStorage.getItem("justLoggedOut"));
	
	const dispatch = useDispatch();

	const logOut = useCallback(() => {
		// dispatch(
		// 	{
		// 		type: SET_MESSAGE,
		// 		payload: 'ANOTHER VERY IMPORTANT MESSAGE'
		// 	}
		// )
		dispatch(logout(null));
	}, [dispatch]);

	let defaultPage = null;
	if (isLoggedIn) {
		defaultPage = <Navigate replace to="/profile" />
	} else if (justLoggedOut) {
		defaultPage = <Navigate replace to="/login" />
	} else {
		defaultPage = <Navigate replace to="/how-it-works" />
	}

	useEffect(() => {
		if (currentUser) {
			setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
			setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
		} else {
			setShowModeratorBoard(false);
			setShowAdminBoard(false);
		}

		EventBus.on("logout", (data) => {
			if (data.message) {
				dispatch(
					{
						type: SET_MESSAGE,
						payload: data.message
					}
				)
			}
			logOut();
		});

		return () => {
			EventBus.remove("logout");
		}
	}, [currentUser, logOut]);

  	return (
		<div>
			<Router>
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

							<li className="nav-item">
								<Link to={"/test"} className="nav-link">
									Test
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
									<a href="/login" className="nav-link" onClick={logOut}>
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
				<NavigateSetter/>
				<div className="component-container container page-content">
					<Routes>
						<Route index element={defaultPage}/>
						<Route exact path="/how-it-works" element={<HowItWorks/>}/>
						<Route exact path="/register" element={<Register/>} />
						<Route exact path="/login" element={<Login/>}></Route>
						<Route exact path="/profile" element={<Profile/>} />
						<Route exact path="/test" element={<TestComponent/>} />
						{/* <Route exact path="/admin" component={<TestComponent/>} /> */}
						<Route path="/mod" element={<BoardModerator/>} />
						<Route path="/admin" element={<BoardAdmin/>}/>
						<Route path='/answer-entry/:season' element={<AnswerEntry/>}/>
						<Route path="/list-teams" element={<ListTeamComponent/>}></Route>
						<Route path="/qb-predictions" element={<QBPredictionsComponent/>}/>
						<Route
							path="/prediction-history/:username/"
							element={<QBPredictionHistoryComponent/>}
						/>
						<Route
							path="/prediction-history/:username/historyID"
							element={<QBPredictionHistoryComponent/>}
						/>
						<Route path="/email-verification" element={<EmailVerification/>}/>
					</Routes>
				</div>
				{/* <AuthVerify logOut={logOut}/> */}
			</Router>
		</div>
  	);
}

export default App;