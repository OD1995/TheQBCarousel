import './PopupComponent.css';

export const PopupComponent = (props) => {
	return (props.trigger) ? (
		<div className="popup">
			<div className="popup-inner">
				<button
				className="close-btn tqbc-black-button"
				onClick={() => props.setTrigger(false)}
				>close</button>
				{ props.children }
				<h2 id='popup-title'>
					{props.title}
				</h2>
				{
					(props.subtitle !== "popupSubtitle") && (
						// <h6>
						// 	{props.subtitle}
						// </h6>
						<span
							dangerouslySetInnerHTML={{__html: props.subtitle}}
							id="popup-subtitle"
						/>
					)
				}
                <span 
                	dangerouslySetInnerHTML={{__html: props.message}}
                />
			</div>
		</div>
	) : "";
}