import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
	BrowserRouter as Router,
	Navigate,
	Route,
	Routes
} from 'react-router-dom';
import './MobileApp.css';
import "bootstrap/dist/css/bootstrap.min.css";
import QBPredictionHistoryComponent from './components/qbcomponents/desktop/pages/QBPredictionHistory';
import Navigator from './components/generic/Navigator';
import Login from "./components/accountmanagement/Login";
import Register from "./components/accountmanagement/Register";
import Profile from "./components/accountmanagement/Profile";
import EmailVerification from "./components/accountmanagement/EmailVerification";
import { logout } from "./actions/auth";
import EventBus from "./common/EventBus";
import { SET_MESSAGE } from './actions/types';
// import { TestComponent } from './components/TestComponent';
import { NavigateSetter } from './helpers/NavigateSetter';
import { AnswerEntry } from './components/admin/answerentry/AnswerEntry';
import { HowItWorksComponent } from './components/howitworks/HowItWorksComponent';
import { PageDoesntExist } from './components/errors/PageDoesntExist';
// import { GlobalLeaderboard } from './components/leaderboards/GlobalLeaderboard';
import { CreateNewPrivateLeaderboard } from './components/leaderboards/CreateNewPrivateLeaderboard';
import { PrivateLeaderboard } from './components/leaderboards/PrivateLeaderboard';
import { MobileNavigationBar, NavigationBar } from './components/generic/mobile/MobileNavigationBar';
import { JoinPrivateLeaderboard } from './components/leaderboards/JoinPrivateLeaderboard';
import { EditPrivateLeaderboardWeights } from './components/leaderboards/EditPrivateLeaderboardWeightings';
import TokenService from './services/Token.service';
import AdminBoard from './components/admin/AdminBoard';
import { PredictionMarking } from './components/admin/PredictionMarking';
import { SendOutQueuedEmails } from './components/admin/emailsendouts/SendOutQueuedEmails';
import { Unsubscribe } from './components/accountmanagement/Unsubscribe';
import { ForgottenPasswordEmailEntry } from './components/accountmanagement/ForgottenPasswordEmailEntry';
import { ForgottenPasswordPasswordEntry } from './components/accountmanagement/ForgottenPasswordPasswordEntry';
import { QueueEmailSendOuts } from './components/admin/emailsendouts/QueueEmailSendOuts';
import { ReportAnIssue } from './components/errors/ReportAnIssue';
import { MobileMenu } from './components/generic/mobile/MobileMenu';
import { TQBCLoading } from './components/generic/TQBCLoading';
import MobileQBPredictions from './components/qbcomponents/mobile/pages/MobileQBPredictions';

const MobileApp = () => {
	const [showAdminBoard, setShowAdminBoard] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const { user: currentUser } = useSelector((state) => state.auth);
	const { isLoggedIn } = useSelector(state => state.auth);

	const justLoggedOut = TokenService.getJustLoggedOut();
	
	const dispatch = useDispatch();

	const logOut = useCallback(() => {
		dispatch(logout(null));
	}, [dispatch]);

	let defaultPage = null;
	if (isLoggedIn) {
		defaultPage = <Navigate replace to="/qb-predictions" />
	} else if (justLoggedOut) {
		defaultPage = <Navigate replace to="/login" />
	} else {
		defaultPage = <Navigate replace to="/how-it-works" />
	}

	useEffect(() => {
		if (currentUser) {
			setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
		} else {
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
					<MobileNavigationBar
						showAdminBoard={showAdminBoard}
						showMenu={showMenu}
						setShowMenu={setShowMenu}
						currentUser={currentUser}
						logOut={logOut}
					/>
				</div>
				<NavigateSetter/>
				<div id="mobile-page-content">
					{/* {
						showMenu && (
							<MobileMenu
								showAdminBoard={showAdminBoard}
								currentUser={currentUser}
								setShowMenu={setShowMenu}
							/>
						)
					} */}
					{
						showMenu ? (
							<MobileMenu
								showAdminBoard={showAdminBoard}
								currentUser={currentUser}
								setShowMenu={setShowMenu}
								showMenu={showMenu}
								logOut={logOut}
							/>
						) : (
							<Routes>
								<Route index element={defaultPage}/>
								<Route exact path="/how-it-works" element={<HowItWorksComponent/>}/>
								<Route exact path="/register" element={<Register/>} />
								<Route exact path="/login" element={<Login/>}></Route>
								<Route exact path="/profile" element={<Profile/>} />
								<Route exact path="/test" element={<TQBCLoading/>} />
								{/* <Route exact path="/test2" element={<OutsidePredictionPeriod/>} /> */}
								{/* <Route exact path="/admin" component={<TestComponent/>} /> */}
								<Route path="/admin" element={<AdminBoard/>}/>
								<Route path='/answer-entry/:season' element={<AnswerEntry/>}/>
								<Route path="/qb-predictions" element={<MobileQBPredictions/>}/>
								<Route
									path="/prediction-history/:username/"
									element={<QBPredictionHistoryComponent/>}
								/>
								<Route
									path="/prediction-history/:username/:season"
									element={<QBPredictionHistoryComponent/>}
								/>
								<Route path="/email-verification" element={<EmailVerification/>}/>
								{/* <Route path="/global-leaderboard" element={<GlobalLeaderboard/>}/> */}
								{/* <Route path="/global-leaderboard/:season" element={<GlobalLeaderboard/>}/> */}
								<Route
									path="/private-leaderboard/:privateLeaderboardUUID"
									element={<PrivateLeaderboard/>}
								/>
								<Route
									path="/private-leaderboard/:privateLeaderboardUUID/:season"
									element={<PrivateLeaderboard/>}
								/>
								<Route
									path="/create-new-private-leaderboard"
									element={<CreateNewPrivateLeaderboard/>}
								/>
								<Route
									path="/join-private-leaderboard"
									element={<JoinPrivateLeaderboard/>}
								/>
								<Route
									path="/edit-private-leaderboard-weightings/:privateLeaderboardUUID"
									element={<EditPrivateLeaderboardWeights/>}
								/>
								<Route
									path="/prediction-marking"
									element={<PredictionMarking/>}
								/>
								<Route
									path="/email-send-outs"
									element={<QueueEmailSendOuts/>}
								/>
								<Route
									path="/email-send-outs/:emailSubscriptionTypeID"
									element={<QueueEmailSendOuts/>}
								/>
								<Route
									path="/send-out-queued-emails"
									element={<SendOutQueuedEmails/>}
								/>
								<Route
									path="/unsubscribe/:emailSubscriptionType"
									element={<Unsubscribe/>}
								/>
								<Route
									path="/forgotten-password/email-entry"
									element={<ForgottenPasswordEmailEntry/>}
								/>
								<Route
									path="/forgotten-password/password-entry"
									element={<ForgottenPasswordPasswordEntry/>}
								/>
								<Route
									path="/report-an-issue"
									element={<ReportAnIssue/>}
								/>
								<Route path='/*' element={<PageDoesntExist/>}/>
							</Routes>
						)
					}
				</div>
				{/* <AuthVerify logOut={logOut}/> */}
			</Router>
		</div>
  	);
}

export default MobileApp;