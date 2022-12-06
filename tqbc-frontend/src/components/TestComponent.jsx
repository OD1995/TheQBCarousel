import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnswerEntryModal } from "./answerentry/AnswerEntryModal";
import './answerentry/AnswerEntry.css';
import TestModal from "./TestModal";
import { SocialMediaRequest } from "./qbcomponents/components/SocialMediaRequest";

export const TestComponent = () => {

	const [isOpen, setIsOpen] = useState(false);

	return (
		// <div>
		// 	<button onClick={() => setIsOpen(true)}>
		// 		Open Modal
		// 	</button>
		// 	{isOpen && <TestModal setIsOpen={setIsOpen}/>}
		// </div>
		<div>
			<SocialMediaRequest
				displayMe={true}
			/>
			{
				true && (
					<SocialMediaRequest
						displayMe={true}
					/>
				)
			}
		</div>
	)
}