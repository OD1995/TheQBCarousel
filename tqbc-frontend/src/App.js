import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
	BrowserRouter as Router,
	Link,
	Route,
	Routes,
} from 'react-router-dom';

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";


import ListTeamComponent from './components/ListTeamComponent';
import QBPredictionsComponent from './components/QBPredictionsComponent';
// import FieldForm from './components/TestComponent';
// import Test2 from './components/TestComponent2';
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import HowItWorks from "./components/HowItWorks";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";

import EventBus from "./common/EventBus";

const App = () => {
	const [showModeratorBoard, setShowModeratorBoard] = useState(false);
	const [showAdminBoard, setShowAdminBoard] = useState(false);

	const { user: currentUser } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		history.listen(
			(location) => {
				dispatch(clearMessage()); // Clear messsage when changing location
			}
		);
	}, [dispatch]);

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
				<div>
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

							{currentUser && (
								<li className="nav-item">
									<Link to={"/user"} className="nav-link">
										User
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
									<a href="/login" className="nav-link" onClick={logOut}>
										LogOut
									</a>
								</li>
							</div>
						) : (
							<div className="navbar-nav ml-auto">
								<li className="nav-item">
									<Link to={"/login"} className="nav-link">
										Login
									</Link>
								</li>

								<li className="nav-item">
									<Link to={"/register"} className="nav-link">
										Sign Up
									</Link>
								</li>
							</div>
						)}
					</nav>
				</div>

				<div className="component-container container">
					<Routes>
						{/* <Route exact path="/" element={<Home/>} /> */}
						<Route exact path="/how-it-works" element={<HowItWorks/>}></Route>
						<Route exact path="/login" element={<Login/>}></Route>
						<Route exact path="/register" element={<Register/>} />
						<Route exact path="/profile" element={<Profile/>} />
						<Route path="/user" element={<BoardUser/>} />
						<Route path="/mod" element={<BoardModerator/>} />
						<Route path="/admin" component={<BoardAdmin/>} />
						{/* <Route path="/" exact element={<ListTeamComponent/>}></Route> */}
						<Route path="/list-teams" element={<ListTeamComponent/>}></Route>
						<Route path="/qb-predictions" element={<QBPredictionsComponent/>}></Route>
						{/* <Route path="/test" element={<FieldForm fields={fields}/>}></Route>
						<Route path="/test2" element={<Test2/>}></Route> */}
					</Routes>
				</div>
			</Router>
		</div>
  	);
}

export default App;