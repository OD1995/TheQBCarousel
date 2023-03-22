export const QBPredictionsMobile = (props) => {

    const generatePageContent = () => {
        var return_me = [];
        var directions = ['North','South','East','West'];
        for (const conf of props.conferences) {
            for (const direction of directions) {
                return_me.push(
                    <div
                        className="mobile-division-prediction-div"
                        id={conf.name + direction}
                        key={conf.name + direction}    
                    >
                        <div className='division-title'>
                            <img
                                className='mobile-conference-logo'
                                src={window.location.origin + '/conference_logos/' + conf.season + '/' + conf.name + '.png' }
                                alt={conf.name}
                                key={conf.name + "-logo"}
                            />
                            <p className='division-text-title'>
                                {direction.toUpperCase()}
                            </p>
                        </div>
                        {
                            dtad[conf.name + " " + direction].map(
                                (teamObj) => {
                                    return (
                                        <QBSelector
                                            default_player={props.currentDropdownValues[teamObj.teamID]}
                                            teamID={teamObj.teamID}
                                            team={props.teams[teamObj.teamID]}
                                            key={teamObj.teamID}
                                            players={props.players}
                                            parentStateUpdater={props.updateParentStateQBSelector}
                                        />
                                    )
                                }
                            )
                        }
                    </div>
                )
            }
        }
        return return_me;
    }

    return (
        <div className='container'>
            {
                generatePageContent()
            }
            <div id="message-and-button">
                <button
                    id="qbp-save-button"
                    className={"tqbc-black-button save-button" + (props.disableButton ? " disabled-button" : "")}
                    onClick={props.savePredictions}
                    disabled={props.disableButton}
                >
                    Save
                </button>
                {
                    props.displayBottomMessage && (
                        <h5
                            style={{
                                color: props.bottomMessageColour
                            }}
                            id="bottom-message"
                        >
                            {props.bottomMessage}
                        </h5>
                    )
                }
            </div>
            <SocialMediaRequest/>
            <PopupComponent
                trigger={props.showPopup}
                setTrigger={props.setShowPopup}
                title={props.popupTitle}
                subtitle={props.popupSubtitle}
                message={props.popupMessage}
            />
        </div>
    )
}