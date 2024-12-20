import { TQBCLoading } from "../../../generic/TQBCLoading";

const QBDisplayer = (props) => {

    const order = (a_obj,b_obj) => {
        const a = a_obj.periodPredictionCompositeKey.predictionPeriodID;
        const b = b_obj.periodPredictionCompositeKey.predictionPeriodID;        
        return a < b ? -1 : (a > b ? 1 : 0);
    }

    const sendToParent = (event) => {
        //here calling Parents changeValue
        props.parentStateUpdater(event,props.teamID);
      };

    if (
            // (typeof props.prediction.team !== "undefined")
            (props.allLoaded)
    ) {
        var team = props.predictions[0].team;
        // let player = props.predictions[0].player;
        var img_src = (
            window.location.origin
            + '/team_logos/' 
            + team.season
            + '/' + team.location.replace(" ","")
            + team.nickname + '.png'
        );
        var grid_pos = {
            gridRow: team.gridRow,
            gridColumn: team.gridColumn
        }
        return (
            <div className={'qb_displayer_box '+ team.conference} style={grid_pos}>
                <img 
                    src={img_src}
                    alt={team.nickname}
                    className='qb_displayer_logo'
                />

                {
                    props.predictions.sort(order).map(
                        (prediction, idx) => {
                            var boxColour;
                            if (prediction.correct === true) {
                                boxColour = "green"
                            } else if (prediction.correct === false) {
                                boxColour = "red"
                            } else {
                                boxColour = "white"
                            }
                            const keyValue = props.teamID + "-" + idx;
                            const spID = "SP" + 
                                (
                                    prediction.periodPredictionCompositeKey.predictionPeriodID -
                                    (4 * (prediction.team.season - 2022)) + 4 
                                );
                            return (
                                [
                                    <p 
                                        className={'qb-displayer-selection pp pp-' + (idx+1)}
                                        style={{
                                            gridColumn:2,
                                            gridRow:idx+2
                                        }}
                                        key={keyValue}
                                    >
                                        {spID}
                                    </p>,
                                    <p 
                                        className={
                                            'qb-displayer-selection player player-' + (idx+1) + " colour-" + boxColour
                                        }
                                        style={{
                                            gridColumn:3,
                                            gridRow:idx+2
                                        }}
                                        key={idx}
                                    >
                                        {prediction.player.name}
                                    </p>
                                ]
                            )
                        }
                    )
                }
            </div>
        )
    } else {
        return <TQBCLoading/>
    }
}

export default QBDisplayer;