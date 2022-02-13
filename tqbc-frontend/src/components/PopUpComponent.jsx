import '../styles/PopupComponent.css';

function Popup(props) {
	return (props.trigger) ? (
		<div className="popup">
			<div className="popup-inner">
				<button
				className="close-btn tqbc-black-button"
				onClick={() => props.setTrigger(false)}
				>close</button>
				{ props.children }
                <span 
                dangerouslySetInnerHTML={{__html: props.message}}
                />
			</div>
		</div>
	) : "";
}

export default Popup