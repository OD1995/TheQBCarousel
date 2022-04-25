
const QBDisplayer = (props) => {

    const sendToParent = (event) => {
        //here calling Parents changeValue
        props.parentStateUpdater(event,props.teamID);
      };

    if (
            // (typeof props.prediction.team !== "undefined")
            (props.allLoaded)
    ) {
        let img_src = (
            window.location.origin
            + '/team_logos/' 
            + props.prediction.team.season
            + '/' + props.prediction.team.location.replace(" ","")
            + props.prediction.team.nickname + '.png'
        );
        let grid_pos = {
            gridRow: props.prediction.team.gridRow,
            gridColumn: props.prediction.team.gridColumn
        }
        return (
            <div className={'qb_selector_box '+props.prediction.team.conference} style={grid_pos}>
                <img 
                    src={img_src}
                    alt={props.prediction.team.nickname}
                    className='qb_selector_logo'
                />
                <p className='qb-displayer-selection'>
                    {props.prediction.player.name}
                </p>
            </div>
        )
    } else {
        return null
    }
}

export default QBDisplayer;