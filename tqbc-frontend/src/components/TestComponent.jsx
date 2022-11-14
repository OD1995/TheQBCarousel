import React from "react";
import { useNavigate } from "react-router-dom";

export const TestComponent = () => {

	const navigate = useNavigate();

	return (
		<div>
			<h1>
				SOME WORDS
			</h1>
			<button
				onClick={() => navigate('/login')}	
			>
				btn
			</button>
		</div>
	)
}