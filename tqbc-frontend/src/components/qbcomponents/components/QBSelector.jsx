import Select from 'react-select';

const QBSelector = (props) => {

    const sendToParent = (event) => {
        //here calling Parents changeValue
        props.parentStateUpdater(event,props.teamID);
      };

    if (
            (typeof props.team !== "undefined")
            &
            (typeof props.default_player !== "undefined")
            &
            (props.players !== [])
    ) {
        let img_src = window.location.origin + '/team_logos/' + props.team['season'] + '/' + props.team.location.replace(" ","") + props.team.nickname + '.png' 
        let grid_pos = {
            gridRow: props.team.gridRow,
            gridColumn: props.team.gridColumn
        }
        return (
            <div className={'qb_selector_box '+props.team.conference} style={grid_pos}>
                <img 
                    src={img_src}
                    alt={props.team.nickname}
                    className='qb_selector_logo'
                />
                <Select
                    defaultValue={props.default_player}
                    onChange={event => sendToParent(event)}
                    options={props.players}
                    isSearchable={true}
                    menuPlacement="auto"
                    className='qb_selector_select'
                    id={props.teamID}
                />
            </div>
        )
    } else {
        return null
    }
}

export default QBSelector;