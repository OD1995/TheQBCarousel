import { useEffect } from "react";
import { useState } from "react";
import { GenericLeaderboard } from "./GenericLeaderboard";
import { MobileGenericLeaderboard } from "./MobileGenericLeaderboard";

export const GlobalLeaderboard = () => {
    const [popupMessage, setPopupMessage] = useState("SOME WORDS");

    useEffect(
        () => {
            let msg = (
                `<div>
                    <p>
                        Leaderboards are sorted by overall season score by default,
                        but it is possible to reorder by clicking the column header of any
                        of the 5 numerical columns.
                    </p>
                    <p>
                        Normally, the overall season score for the global leaderboard is
                        calculated by summing the scores across the 4 season periods and
                        then dividing by 4. In other words each season period is equally
                        weighted but having no predictions for a season period lowers
                        the overall season score.
                    </p>
                    <p>
                        However, for predictions for the 2023
                        season, TheQBCarousel.com only opened during the second prediction
                        period, so the season score has been calculated the same way, but
                        will be divided by 3 rather than 4.
                    </P
                    <p>
                        For private leaderboards, it is possible to change the weightings
                        assigned to each season period
                    </p>
                </div>`
            )
            setPopupMessage(msg);            
        },
        []
    )

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        return (
            <MobileGenericLeaderboard
                global={true}
                popupTitle="Global Leaderboard Explainer"
                popupMessage={popupMessage}
            />
        );
    } else {
        return (
            <GenericLeaderboard
                global={true}
                popupTitle="Global Leaderboard Explainer"
                popupMessage={popupMessage}
            />
        );
    }
    
}