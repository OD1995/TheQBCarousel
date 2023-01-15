import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import History from "../../helpers/History";
import { rangeInt, round_number } from "../../helpers/UsefulFunctions";
import PrivateLeaderboardService from "../../services/PrivateLeaderboardService";
import TokenService from "../../services/Token.service";
import { TQBCLoading } from "../generic/TQBCLoading";
import { GenericLeaderboard } from "./GenericLeaderboard";
import { MobileGenericLeaderboard } from "./MobileGenericLeaderboard";

export const PrivateLeaderboard = () => {
    
    const [popupMessage, setPopupMessage] = useState("");
    const [weightingsTable, setWeightingsTable] = useState("");
    const [isMember, setIsMember] = useState(false);
    const [ready, setReady] = useState(false);
    const params = useParams();

    const createWeightingsTable = (privateLeaderboardWeightings,_id_) => {
        let weightings = {};
        for (const ix of rangeInt(1,4)) {
            let val = privateLeaderboardWeightings[ix];
            let fraction = val.numerator + " / " + val.denominator;
            let decimal = round_number(val.numerator/val.denominator,3);
            weightings[val.scoringSettingValueCompositeKey.seasonPeriodID] = {
                fraction: fraction,
                decimal: decimal
            };
        }

        let weightingsTable = (
            `
            <table
                id='${_id_}'
            >
                <thead>
                    <tr
                        id='weightings-table-headers'
                    >
                        <th class='weightings-table-headers'>Season Period</th>
                        <th class='weightings-table-headers'>Fractional</th>
                        <th class='weightings-table-headers'>Decimal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>${weightings[1].fraction}</td>
                        <td>${weightings[1].decimal}</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>${weightings[2].fraction}</td>
                        <td>${weightings[2].decimal}</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>${weightings[3].fraction}</td>
                        <td>${weightings[3].decimal}</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>${weightings[4].fraction}</td>
                        <td>${weightings[4].decimal}</td>
                    </tr>
                </tbody>
            </table>
            `
        )
        return weightingsTable;
    }

    useEffect(
        () => {
            let privateLeaderboardUUIDs = TokenService.getPrivateLeaderboardUUIDs() ?? [];
            if (privateLeaderboardUUIDs.includes(params.privateLeaderboardUUID)) {
                setIsMember(true);
                PrivateLeaderboardService.getPrivateLeaderboardWeightings(
                    params.privateLeaderboardUUID
                ).then(
                    (res) => {
                        let weightingsTable = createWeightingsTable(res.data,"popup-weightings-table");
                        setWeightingsTable(createWeightingsTable(res.data,"right-weightings-table"));
                        let msg = (
                            `<div>
                                <p>
                                    Leaderboards are sorted by overall season score by default,
                                    but it is possible to reorder by clicking the column header of any
                                    of the 5 numerical columns.
                                </p>
                                <p>
                                    The overall season score for private leaderboards is calculated by
                                    using weightingss for each season period which were set when the
                                    private leaderboard was created. The weightings are shown below and
                                    can be edited ON THIS PAGE.
                                </p>
                                <p>
                                    To invite people to this private leaderboard, send them the private
                                    leaderboard ID, also shown below. The ID should then be entered
                                    ON THIS PAGE.
                                </p>
                                <p>
                                    <b>Private Leaderboard ID: </b>${params.privateLeaderboardUUID}
                                </p>
                                <b>Season Period Weightings</b>
                                ${weightingsTable}
                            </div>`
                        )
                        setPopupMessage(msg);    
                        setReady(true);        
                    }
                )
            } else {
                setReady(true);
            }
        },
        []
    )
    
    if (ready) {
        if (isMember) {
            if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
                return (
                    <MobileGenericLeaderboard
                        global={false}
                        weightingsTable={weightingsTable}
                        popupTitle="Private Leaderboard Explainer"
                        popupMessage={popupMessage}
                    />
                );
            } else {
                return (
                    <GenericLeaderboard
                        global={false}
                        weightingsTable={weightingsTable}
                        popupTitle="Private Leaderboard Explainer"
                        popupMessage={popupMessage}
                    />
                );
            }
        } else {
            History.push("/nope");
            return null;
        }
    } else {
        return <TQBCLoading/>;
    }
}