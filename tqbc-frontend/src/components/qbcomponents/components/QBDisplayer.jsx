
const QBDisplayer = (props) => {

    const sendToParent = (event) => {
        //here calling Parents changeValue
        props.parentStateUpdater(event,props.teamID);
      };

    if (
            // (typeof props.prediction.team !== "undefined")
            (props.allLoaded)
    ) {
        let team = props.predictions[0].team;
        let player = props.predictions[0].player;
        let img_src = (
            window.location.origin
            + '/team_logos/' 
            + team.season
            + '/' + team.location.replace(" ","")
            + team.nickname + '.png'
        );
        let grid_pos = {
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
                    props.predictions.map(
                        (prediction, idx) => {
                            var boxColour;
                            if (prediction.correct == 1) {
                                boxColour = "green"
                            } else if (prediction.correct == 0) {
                                boxColour = "red"
                            } else {
                                boxColour = "white"
                            }
                            const keyValue = props.teamID + "-" + idx;
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
                                        {"PP" + (idx + 1)}
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
        return null
    }
}

export default QBDisplayer;