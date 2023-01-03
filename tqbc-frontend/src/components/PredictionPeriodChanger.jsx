import React, { useEffect,useState } from 'react';
import Select from 'react-select';

const PredictionPeriodChanger = (props) => {

    const [season, setSeason] = useState(props.currentSeason);
    const [seasonPeriodID, setSeasonPeriodID] = useState(props.currentSeasonPeriodID);

    useEffect(
        () => {
            setSeason(props.currentSeason);
            setSeasonPeriodID(props.currentSeasonPeriodID);
        },
        [props]
    )

    const dropdownFriendly = (value) => {
        return {
            label: value,
            value: value
        }
    }

    const sendSeasonToParent = (event) => {
        // console.log("season: " + event.value);
        setSeason(event.value);
    }

    const sendSeasonPeriodIDToParent = (event) => {
        // console.log("seasonPeriodID: " + event.value);
        setSeasonPeriodID(event.value)
    }

    const savePredictionPeriodID = () => {
        let comboID = season + "---" + seasonPeriodID;
        // console.log("comboID: " + comboID);
        props.parentStateUpdater(comboID);
    }

    const resetPredictionPeriodID = () => {
        props.predictionPeriodIDResetter();
        // console.log("resets done");
    }

    return (
        <div
            id="prediction-period-changer"
            style={{gridRow:10,gridColumnStart:2,gridColumnEnd:5}}
        >
            <h6
                style={{gridRow:1, gridColumn:1}}
                className="prediction-period-changer-text"
            >Season</h6>
            <Select
                style={{gridRow:2, gridColumn:1}}
                defaultValue={dropdownFriendly(season)}
                onChange={event => sendSeasonToParent(event)}
                options={props.seasons}
                menuPlacement="auto"
                // isSearchable={true}
                className='prediction-period-changer-selecter'
                id="prediction-period-changer-selecter-season"
            />
            <h6
                style={{gridRow:1, gridColumn:2}}
                className="prediction-period-changer-text"
            >Season Period</h6>
            <Select
                style={{gridRow:2, gridColumn:2}}
                defaultValue={dropdownFriendly(seasonPeriodID)}
                onChange={event => sendSeasonPeriodIDToParent(event)}
                options={props.seasonPeriodIDs}
                menuPlacement="auto"
                // isSearchable={true}
                className='prediction-period-changer-selecter'
                id="prediction-period-changer-selecter-seasonPeriodID"
            />
            <div
                id='prediction-period-changer-button-div'
                style={{gridRow:2, gridColumn:3}}
            >
                <button
                    style={{gridColumn:1}}
                    onClick={savePredictionPeriodID}
                    className="tqbc-green-button"
                    id="prediction-period-changer-button"
                >
                Update
                </button>
                <button
                    style={{gridColumn:2}}
                    onClick={resetPredictionPeriodID}
                    className="tqbc-red-button"
                    id="prediction-period-resetter-button"
                >
                Reset
                </button>
            </div>
            <h6
                style={{gridRow:1, gridColumn:3}}
                className="prediction-period-changer-text"
            >
            {"Current PredictionPeriodID: " + props.currentPredictionPeriodID}
            </h6>
        </div>
    )
}

export default PredictionPeriodChanger;