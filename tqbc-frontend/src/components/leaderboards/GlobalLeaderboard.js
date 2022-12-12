import { useEffect } from "react";
import { useState } from "react";
import UserScoreService from "../../services/UserScoreService";
import { GenericLeaderboard } from "./GenericLeaderboard";

export const GlobalLeaderboard = () => {
    
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(
        UserScoreService.getGlobalLeaderboardData(
            2022,
            1,
            1234,
            1
        ).then(
            (res) => {

            }
        ),
        []
    )
    
    return (
        <GenericLeaderboard
            data={[]}
        />
    );
}