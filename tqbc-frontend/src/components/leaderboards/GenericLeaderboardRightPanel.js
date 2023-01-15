import { SeasonSelector } from "../qbcomponents/desktop/components/SeasonSelector";

export const GenericLeaderboardRightPanel = (props) => {


    return (
        <div id='generic-leaderboard-right'>
            <h1
                style={{border:"3px solid black"}}
            >
                {props.season}
            </h1>
            {
                props.weightingsTable && (
                    <div>
                        <b>Season Period Weightings</b>
                        <span
                                dangerouslySetInnerHTML={{__html: props.weightingsTable}}
                        />
                    </div>
                )
            }
            <button
                className="tqbc-black-button"
                onClick={() => props.setShowPopup(true)}
            >
                ?
            </button>
            {
                (
                    props.uniqueSeasons.length > 1
                    // true
                ) && <SeasonSelector
                    uniqueSeasons={props.uniqueSeasons}
                    currentSeason={props.season}
                    username={props.username}
                    page='leaderboard'
                    global={props.global}
                    privateLeaderboardUUID={props.privateLeaderboardUUID}
                />

            }
        </div>
    );
}