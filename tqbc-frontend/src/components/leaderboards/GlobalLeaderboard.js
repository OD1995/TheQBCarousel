import { useEffect } from "react";
import { useState } from "react";
import UserScoreService from "../../services/UserScoreService";
import { GenericLeaderboard } from "./GenericLeaderboard";

export const GlobalLeaderboard = () => {
    
    const [leaderboardRows, setLeaderboardRows] = useState([]);
    const [firstRowRank, setFirstRowRank] = useState(null);
    const [requestingUserRow, setRequestingUserRow] = useState(null);
    const [requestingUserRowRank, setRequestingUserRowRank] = useState(null);
    const [pageCount, setPageCount] = useState(1);
    const [orderedBy, setOrderedBy] = useState(1234);


    useEffect(
        () => {
            UserScoreService.getGlobalLeaderboardData(
                2022,
                1,
                1234,
                1
            ).then(
                (res) => {
                    if (res.data.requestingUserRow) {
                        setRequestingUserRow(res.data.requestingUserRow);
                        setRequestingUserRowRank(res.data.requestingUserRowRank);
                    }
                    setPageCount(res.data.pageCount);
                    setFirstRowRank(res.data.firstRowRank);
                    // setLeaderboardRows(res.data.rows);
                    setLeaderboardRows(Array(20).fill(res.data.rows[0]))
                }
            )
        },
        []
    )
    
    if (leaderboardRows.length > 0) {
        return (
            <GenericLeaderboard
                rows={leaderboardRows}
                global={true}
                firstRowRank={firstRowRank}
                orderedBy={orderedBy}
            />
        );
    } else {
        return null;
    }
}