import React from "react";
import { useState } from "react";
import '../styles/TestComponent2.css';

function Test2() {
	const [buttonPopup, setButtonPopup] = useState(false);

	return (
		<div>
			<h1>React Popup</h1>
			<br/><br/>
			<button
			onClick={() => setButtonPopup(true)}
			>Open Popup</button>
			<Popup
			trigger={buttonPopup} 
			setTrigger={setButtonPopup}
			>
				<h3>My popup</h3>
				<p>This is my button triggered popup</p>
			</Popup>
		</div>
	)
}

function Popup(props) {
	return (props.trigger) ? (
		<div className="popup">
			<div className="popup-inner">
				<button
				className="close-btn"
				onClick={() => props.setTrigger(false)}
				>close</button>
				{ props.children }
			</div>
		</div>
	) : "";
}

export default Test2;