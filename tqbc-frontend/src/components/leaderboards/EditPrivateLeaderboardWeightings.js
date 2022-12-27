import { useEffect, useState } from "react";
import { makeOptionsDropdownFriendly, makeValueDropdownFriendly, range, rangeInt, round_number } from "../../helpers/UsefulFunctions";
import Select from "react-select";
import PrivateLeaderboardService from "../../services/PrivateLeaderboardService";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import History from "../../helpers/History";

export const EditPrivateLeaderboardWeights = () => {
    
    const params = useParams();
    const [privateLeaderboardName,setPrivateLeaderboardName] = useState("");
    const [weightingValues, setWeightingValues] = useState({});
    const [weightingErrorMessage, setWeightingErrorMessage] = useState("");
    const [ready, setReady] = useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);

    const setNewWeightValue = (ev,sp,typ) => {
        setWeightingValues(
            prevState => ({
                ...prevState,
                [sp]: {
                    ...prevState[sp],
                    [typ]: ev.value
                }
            })
        )
    }

    const updateWeightings = () => {
        let weightingsSum = sumWeightings(weightingValues);
        let weighting_result = true;
        if (weightingsSum !== 1) {
            // let rounded = Math.round(Math.round((weightingsSum + Number.EPSILON) * 100) / 100)
            let rounded = round_number(weightingsSum,3);
            let txt = `The sum of your weightings is not 1 (${rounded}), please adjust and re-submit`;
            setWeightingErrorMessage(txt);
            weighting_result = false;
        }
        console.log(weightingValues);
        if (weighting_result) {
            PrivateLeaderboardService.setPrivateLeaderboardWeightings(
                currentUser.userID,
                params.privateLeaderboardUUID,
                weightingValues
            ).then(
                (res) => {
                    History.push(`/private-leaderboard/${params.privateLeaderboardUUID}`)
                }
            )
        }

    }

    const sumWeightings = (wv) => {
        let total = 0;
        for (const sp of rangeInt(1,4)) {
            let num = wv[sp].numerator;
            let den = wv[sp].denominator;
            total += num / den;
        }
        return total;
    }

    useEffect(
        () => {
            PrivateLeaderboardService.getPrivateLeaderboardName(
                params.privateLeaderboardUUID
            ).then(
                (res) => {
                    setPrivateLeaderboardName(res.data);
                    PrivateLeaderboardService.getPrivateLeaderboardWeightings(
                        params.privateLeaderboardUUID
                    ).then(
                        (res2) => {
                            let wv = {};
                            for (const ix of rangeInt(1,4)) {
                                wv[ix] = {
                                    numerator: res2.data[ix].numerator,
                                    denominator: res2.data[ix].denominator
                                }
                            }
                            setWeightingValues(wv);
                            setReady(true);
                        }
                    )
                }
            )
        },
        []
    )

    if (ready) {

        return (
            <div
                id="new-private-leaderboard-div"
                className="private-leaderboard-membership-parent-div"
            >
                <div>
                    <h1
                        id="new-private-leaderboard-title"
                        className="big-h1-title"
                    >
                        Edit Private Leaderboard Weightings
                    </h1>
                </div>
                <div
                    id="edit-private-leaderboard-form"
                    className="private-leaderboard-form"
                >
                    <div id='create-new-private-leaderboard-grid'>
                        <h5
                            className="display-linebreak npl-text"
                            style={{
                                gridRow: 1,
                                gridColumn: 1,
                            }}
                        >
                            Private Leaderboard Name
                        </h5>
                        <div
                            style={{
                                gridRow: 1,
                                gridColumnStart: 2,
                                gridColumnEnd: 5,
                            }}
                        >
                            <h5
                                style={{
                                    fontWeight: 'normal'
                                }}
                            >
                               {privateLeaderboardName}
                            </h5>
                        </div>
                        <div
                            style={{
                                gridRow: 2,
                                gridColumnStart: 1,
                                gridColumnEnd: 5,
                            }}
                        >
                            <p
                                className="new-private-leaderboard-error"
                            >
                                {""}
                            </p>
                        </div>
                        <h5
                            id='weightings-text'
                        >
                            WEIGHTINGS
                        </h5>
                        {
                            rangeInt(1,4).map(
                                (ix) => {
                                    let row = ix + 3;
                                    let sp = ix;
                                    let num = weightingValues[ix].numerator;
                                    let den = weightingValues[ix].denominator;
                                    let txt1 = (
                                        <h5
                                            className="npl-text"
                                            style={{
                                                gridRow: row,
                                                gridColumn: 1
                                            }}
                                        >
                                            Season Period {sp}
                                        </h5>
                                    );
                                    let txt2 = (
                                        <h5
                                            className="npl-text"
                                            style={{
                                                gridRow: row,
                                                gridColumn: 3
                                            }}
                                        >
                                            /
                                        </h5>
                                    );
                                    let select1 = (
                                        <div
                                            style={{
                                                gridRow: row,
                                                gridColumn: 2
                                            }}
                                        >
                                            <Select
                                                defaultValue={makeValueDropdownFriendly(num)}
                                                onChange={ev => setNewWeightValue(ev,sp,"numerator")}
                                                options={makeOptionsDropdownFriendly(rangeInt(0,20))}
                                                isSearchable={true}
                                                key={"numerator-" + sp}
                                                id={"numerator-" + sp}
                                            />
                                        </div>
                                    );
                                    let select2 = (
                                        <div
                                            style={{
                                                gridRow: row,
                                                gridColumn: 4
                                            }}
                                        >
                                            <Select
                                                defaultValue={makeValueDropdownFriendly(den)}
                                                onChange={ev => setNewWeightValue(ev,sp,"denominator")}
                                                options={makeOptionsDropdownFriendly(rangeInt(1,20))}
                                                isSearchable={true}
                                                key={"denominator-" + sp}
                                                id={"denominator-" + sp}
                                            />
                                        </div>                                        
                                    );
    
                                    let sqr = (
                                        <div
                                            className="empty-square"
                                            style={{
                                                gridRow: row,
                                                gridColumnStart: 1,
                                                gridColumnEnd: 5
                                            }}
                                        >
                                        </div>
                                    )
    
                                    return [
                                        txt1,
                                        select1,
                                        txt2,
                                        select2,
                                        // sqr
                                    ];
                                }
                            )
                        }
                        <p
                            className="new-private-leaderboard-error"
                            style={{
                                gridRow: 8,
                                gridColumnStart: 1,
                                gridColumnEnd: 5
                            }}
                        >
                            {weightingErrorMessage}
                        </p>
                    </div>
                    <button
                        className="tqbc-black-button"
                        id='new-private-leaderboard-submit'
                        onClick={() => updateWeightings()}
                    >
                        Save Private Leaderboard Weightings
                    </button>
                </div>
            </div>
        );
    } else {
        return null;
    }
}