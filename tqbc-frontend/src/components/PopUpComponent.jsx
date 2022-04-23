import '../styles/PopupComponent.css';

function PopupComponent(props) {
	return (props.trigger) ? (
		<div className="popup">
			<div className="popup-inner">
				<button
				className="close-btn tqbc-black-button"
				onClick={() => props.setTrigger(false)}
				>close</button>
				{ props.children }
				<h2>
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

export default PopupComponent;