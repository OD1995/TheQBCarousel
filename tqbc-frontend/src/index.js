import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "./store";
import './index.css';
import DesktopApp from './DesktopApp';
import MobileApp from './MobileApp';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

ReactDOM.render(
	<Provider store={store}>
			{
				(isMobile) ? <MobileApp/> : <DesktopApp/>
			}
			{/* {
				(!isMobile) 
			} */}
	</Provider>,
	document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();