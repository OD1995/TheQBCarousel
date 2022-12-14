import React from "react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AnswerEntryModal } from "./answerentry/AnswerEntryModal";
import './answerentry/AnswerEntry.css';
import TestModal from "./TestModal";
import { SocialMediaRequest } from "./qbcomponents/components/SocialMediaRequest";
import { useEffect } from "react";

export const TestComponent = () => {

	const [isOpen, setIsOpen] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(
		() => {
			console.log(searchParams.get('hi'));
			searchParams.set('doesThisWork','yes');
			setSearchParams(searchParams);
		},
		[]
	)

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