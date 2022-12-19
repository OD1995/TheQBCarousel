import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import History from "../../helpers/History";
import AnswerService from "../../services/AnswerService";
import UserScoreService from "../../services/UserScoreService";
import { GenericLeaderboard } from "./GenericLeaderboard";

export const GlobalLeaderboard = () => {
    
    const params = useParams();
	const [searchParams, setSearchParams] = useSearchParams();

    const [leaderboardRows, setLeaderboardRows] = useState([]);
    const [firstRowRank, setFirstRowRank] = useState(null);
    const [requestingUserRow, setRequestingUserRow] = useState(null);
    const [requestingUserRowRank, setRequestingUserRowRank] = useState(null);
    const [pageCount, setPageCount] = useState(1);
    // const [orderedBy, setOrderedBy] = useState(1234);
    const [uniqueSeasons, setUniqueSeasons] = useState([]);
    const [leaderboardSeason, setLeaderboardSeason] = useState(null);
    const [popupTitle, setPopupTitle] = useState("Global Leaderboard Explainer");
    const [popupMessage, setPopupMessage] = useState("SOME WORDS");
    const { user: currentUser } = useSelector((state) => state.auth);

    const updateOrderBy = (newOrderBy) => {
        searchParams.set('orderBy', newOrderBy);
        setSearchParams(searchParams);
    }

    const updatePageNumber = (newPageNumber) => {
        searchParams.set('page', newPageNumber);
        setSearchParams(searchParams);
    }

    const otherStuff = (unique_seasons) => {
        // If season not in params or season not one of available options, get max season and redirect to there
        var leaderboard_season = params.season;
        setLeaderboardSeason(params.season);
        if (
            (leaderboard_season === null) ||
            (!unique_seasons.includes(parseInt(leaderboard_season)))
        ) {
            AnswerService.getMaxSeasonForAnswers().then(
                (res2) => {
                    leaderboard_season = res2.data;
                    setLeaderboardSeason(leaderboard_season);
                    History.push(`/global-leaderboard/${leaderboard_season}?orderBy=1234&page=1`);
                }
            )
        } else {
            if (searchParams.get('orderBy') === null) {
                searchParams.set('orderBy', 1234);
                setSearchParams(searchParams);
            }
            else
            if (![1,2,3,4,1234].includes(parseInt(searchParams.get('orderBy')))) {
                searchParams.set('orderBy', 1234);
                setSearchParams(searchParams);
            }
            else
            if (searchParams.get('page') === null) {
                searchParams.set('page', 1);
                setSearchParams(searchParams);
            }
            else {
                // Make sure the page number isn't too high
                UserScoreService.getGlobalLeaderboardPageCount(leaderboard_season).then(
                    (res3) => {
                        let pg = parseInt(searchParams.get('page'));
                        if (
                            (pg > res3.data) || (pg < 1) || (isNaN(pg))
                        ) {
                            searchParams.set('page', 1);
                            setSearchParams(searchParams);
                        } else {
                            callUserScoreService(leaderboard_season);
                        }
                    }
                )
            }
        }
    }

    useEffect(
        () => {
            document.title = 'Global Leaderboard';
            console.log("a");
            let msg = (
                `<div>
                    <p>
                        The global leaderboard is sorted by overall season score by default,
                        but it is possible to reorder by clicking the column header of any
                        of the 5 numerical columns.
                    </p>
                    <p>
                        The overall season score for the global leaderboard is calculated by
                        summing the scores across the 4 season periods and then dividing by 4.
                        In other words each season period is equally weighted but having no
                        predictions for a season period lowers the overall season score.
                    </p>
                    <p>
                        For private leaderboards, it is possible to change the weightings
                        assigned to each season period
                    </p>
                </div>`
            )
            setPopupMessage(msg);
            if (uniqueSeasons.length === 0) {
                AnswerService.getUniqueSeasonsForAnswers().then(
                    (res) => {
                        var unique_seasons = res.data;
                        setUniqueSeasons(unique_seasons);
                        otherStuff(unique_seasons);
                    }
                )
            } else {
                otherStuff(uniqueSeasons);
            }
            
        },
        // [params,searchParams]
        // []
        [searchParams]
    )

    const callUserScoreService = (
        leaderboard_season,
    ) => {
        UserScoreService.getGlobalLeaderboardData(
            leaderboard_season,
            currentUser.userID,
            searchParams.get('orderBy'),
            searchParams.get('page')
        ).then(
            (res) => {
                // if (res.data.requestingUserRow) {
                setRequestingUserRowRank(res.data.requestingUserRowRank);
                setRequestingUserRow(res.data.requestingUserRow);
                // }
                setPageCount(res.data.pageCount);
                setFirstRowRank(res.data.firstRowRank);
                setLeaderboardRows(res.data.rows);
                // setLeaderboardRows(Array(20).fill(res.data.rows[0]))
            }
        )
    }
    
    if (leaderboardRows.length > 0) {
        return (
            <GenericLeaderboard
                rows={leaderboardRows}
                global={true}
                firstRowRank={firstRowRank}
                orderedBy={parseInt(searchParams.get('orderBy'))}
                updateOrderBy={updateOrderBy}
                updatePageNumber={updatePageNumber}
                currentSeason={leaderboardSeason}
                requestingUserRow={requestingUserRow}
                requestingUserRowRank={requestingUserRowRank}
                pageCount={pageCount}
                currentPage={parseInt(searchParams.get('page'))}
                uniqueSeasons={uniqueSeasons}
                popupTitle={popupTitle}
                popupMessage={popupMessage}
            />
        );
    } else {
        return null;
    }
}