import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { formatScore } from "../../../../helpers/UsefulFunctions";
import UserScoreService from "../../../../services/UserScoreService";

export const MobileUserScoreDisplayer = (props) => {

    const [table, setTable] = useState(null);

    useEffect(
        () => {
            UserScoreService.getUserScoresForSeason(
                props.userID,
                props.season
            ).then(
                (result) => {
                    if (Object.keys(result.data).length > 0 ) {

                        let header_row_tds = [];
                        let body_row_tds = [];
                        let spIDs = ['SP1','SP2','SP3','SP4'];
                        for (const spID of spIDs) {
                            if (spID in result.data) {
                                header_row_tds.push(
                                    <th
                                        key={spID + "-header"}
                                    >
                                        {spID}
                                    </th>
                                );
                                body_row_tds.push(
                                    <td
                                    key={spID + "-row"}
                                >
                                        {formatScore(result.data[spID])}
                                    </td>
                                )
                            }
                        }
                        if ("Season" in result.data) {
                            header_row_tds.push(
                                <th
                                    key="season-header"
                                >
                                    Season
                                </th>
                            );
                            body_row_tds.push(
                                <td
                                key="season-row"
                            >
                                    {formatScore(result.data["Season"])}
                                </td>
                            )
                        }
                        setTable(
                            <table id="mobile-usd-table">
                                <thead>
                                    <tr>
                                        {header_row_tds}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {body_row_tds}
                                    </tr>
                                </tbody>
                            </table>
                        );
                    }
                }
            )
        },
        []
    )

    if (table) {
        return (
            table
        );
    } else {
        return null;
    }
}