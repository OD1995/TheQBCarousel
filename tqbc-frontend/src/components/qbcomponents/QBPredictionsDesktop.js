export const QBPredictionsDesktop = (props) => {
    return (
        <div className='container qb-predictor-box qb-grid'>
            <h1 className='area-title' style={{gridRow:1,gridColumn:2}}>NORTH</h1>
            <h1 className='area-title' style={{gridRow:1,gridColumn:3}}>EAST</h1>
            <h1 className='area-title' style={{gridRow:1,gridColumn:4}}>SOUTH</h1>
            <h1 className='area-title' style={{gridRow:1,gridColumn:5}}>WEST</h1>
            {
                props.conferences.map(
                    conf =>
                    <img
                        className='conference_logo'
                        src={window.location.origin + '/conference_logos/' + conf.season + '/' + conf.name + '.png' }
                        alt={conf.name}
                        key={conf.name + "-logo"}
                        style={{
                            gridRowStart:conf.gridRowStart,
                            gridRowEnd:conf.gridRowEnd,
                            gridColumn:conf.gridColumn
                        }}
                    />
                )
            }
            {
                Object.keys(props.currentDropdownValues).map(
                    function(teamID) {
                        let defaultPlayerID = props.currentDropdownValues[teamID];
                        return (
                            <QBSelector
                                default_player={defaultPlayerID}
                                teamID={teamID}
                                team={props.teams[teamID]}
                                key={teamID}
                                players={props.players}
                                parentStateUpdater={props.updateParentStateQBSelector}
                            />
                        )
                    }
                )
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
            {
                props.showPredictionPeriodChanger && (
                    <PredictionPeriodChanger
                        seasons={props.uniqueSeasons}
                        seasonPeriodIDs={props.uniqueSeasonPeriodIDs}
                        currentSeason={props.currentSeason}
                        currentSeasonPeriodID={props.currentSeasonPeriodID}
                        currentPredictionPeriodID={props.currentPredictionPeriodID}
                        parentStateUpdater={props.updateParentStatePredictionPeriodChanger}
                        predictionPeriodIDResetter={props.resetPredictionPeriodID}
                    />
                )
            }
            {
                (!props.showPredictionPeriodChanger) && (
                    <SocialMediaRequest/>
                )
            }
            <PopupComponent
                trigger={props.showPopup}
                setTrigger={props.setShowPopup}
                title={props.popupTitle}
                subtitle={props.popupSubtitle}
                message={props.popupMessage}
            />
        </div>
    );
}