import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import History from '../../helpers/History';
import { formatMobileScore, formatScore } from '../../helpers/UsefulFunctions';
import AnswerService from '../../services/AnswerService';
// import PrivateLeaderboardService from '../../services/PrivateLeaderboardService';
import TokenService from '../../services/Token.service';
import UserScoreService from '../../services/UserScoreService';
import { PopupComponent } from '../generic/PopUpComponent';
import { TQBCLoading } from '../generic/TQBCLoading';
import './GenericLeaderboard.css';
import './MobileGenericLeaderboard.css';
import { GenericLeaderboardRightPanel } from './GenericLeaderboardRightPanel';
import { PageSelectorComponent } from './PageSelectorComponent';
import { SeasonSelector } from '../qbcomponents/desktop/components/SeasonSelector';

export const MobileGenericLeaderboard = (props) => {

    // const params = useParams();
	// const [searchParams, setSearchParams] = useSearchParams();

    // const [leaderboardRows, setLeaderboardRows] = useState([]);
    // const [firstRowRank, setFirstRowRank] = useState(null);
    // // const [requestingUserRow, setRequestingUserRow] = useState(null);
    // // const [requestingUserRowRank, setRequestingUserRowRank] = useState(null);
    // const [pageCount, setPageCount] = useState(1);
    // const [uniqueSeasons, setUniqueSeasons] = useState([]);
    // const [leaderboardSeason, setLeaderboardSeason] = useState(null);
    // const [leaderboardName, setLeaderboardName] = useState("");
    // const [ths, setThs] = useState([]);
    // const [userAboveRows, setUserAboveRows] = useState([]);
    // const [userBelowRows, setUserBelowRows] = useState([]);
    // const [showPopup, setShowPopup] = useState(false);
    // const [isOwner, setIsOwner] = useState(false);
    // const { user: currentUser } = useSelector((state) => state.auth);
  
    // useEffect(
    //     () => {
    //         let user = TokenService.getUser();
    //         if (props.global & (user === null)) {
    //             History.push("/nope");
    //         } else {
    //             let type = props.global ? "Global" : "Private"
    //             document.title = type + " Leaderboard";            
    //             if (uniqueSeasons.length === 0) {
    //                 AnswerService.getUniqueSeasonsForAnswers().then(
    //                     (res) => {
    //                         var unique_seasons = res.data;
    //                         setUniqueSeasons(unique_seasons);
    //                         otherStuff(unique_seasons);
    //                     }
    //                 )
    //             } else {
    //                 otherStuff(uniqueSeasons);
    //             }
    //         }
    //     },
    //     [params]
    // )

    // const otherStuff = (unique_seasons) => {
    //     // If season not in params or season not one of available options, get max season and redirect to there
    //     var leaderboard_season = params.season;
    //     setLeaderboardSeason(params.season);
    //     if (
    //         (leaderboard_season === null) ||
    //         (!unique_seasons.includes(parseInt(leaderboard_season)))
    //     ) {
    //         // AnswerService.getMaxSeasonForAnswers().then(
    //         //     (res2) => {
    //         // leaderboard_season = res2.data;
    //         leaderboard_season = Math.max(...unique_seasons);
    //         setLeaderboardSeason(leaderboard_season);
    //         let plUUID = params.privateLeaderboardUUID;
    //         var url;
    //         if (props.global) {
    //             url = `/global-leaderboard/${leaderboard_season}?orderBy=1234&page=1`;
    //         } else {
    //             url = `/private-leaderboard/${plUUID}/${leaderboard_season}?orderBy=1234&page=1`
    //         }
    //         History.push(url);
    //         //     }
    //         // )
    //     } else {
    //         if (searchParams.get('orderBy') === null) {
    //             searchParams.set('orderBy', 1234);
    //             setSearchParams(searchParams);
    //         }
    //         else
    //         if (![1,2,3,4,1234].includes(parseInt(searchParams.get('orderBy')))) {
    //             searchParams.set('orderBy', 1234);
    //             setSearchParams(searchParams);
    //         }
    //         else
    //         if (searchParams.get('page') === null) {
    //             searchParams.set('page', 1);
    //             setSearchParams(searchParams);
    //         }
    //         else {
    //             // Make sure the page number isn't too high
    //             UserScoreService.getLeaderboardPageCount(
    //                 props.global ? 'global' : 'private',
    //                 params.privateLeaderboardUUID,
    //                 leaderboard_season
    //             ).then(
    //                 (res3) => {
    //                     let pg = parseInt(searchParams.get('page'));
    //                     if (
    //                         (pg > res3.data) || (pg < 1) || (isNaN(pg))
    //                     ) {
    //                         searchParams.set('page', 1);
    //                         setSearchParams(searchParams);
    //                     } else {
    //                         callUserScoreService(leaderboard_season);
    //                     }
    //                 }
    //             )
    //         }
    //     }
    // }

    // const callUserScoreService = (
    //     leaderboard_season,
    // ) => {
    //     UserScoreService.getLeaderboardData(
    //         props.global ? 'global' : 'private',
    //         params.privateLeaderboardUUID,
    //         leaderboard_season,
    //         currentUser.userID,
    //         searchParams.get('orderBy'),
    //         searchParams.get('page')
    //     ).then(
    //         (res) => {
    //             // setRequestingUserRowRank(res.data.requestingUserRowRank);
    //             // setRequestingUserRow(res.data.requestingUserRow);
    //             setPageCount(res.data.pageCount);
    //             setFirstRowRank(res.data.firstRowRank);
    //             setLeaderboardRows(res.data.rows);
    //             let privateLeaderboardInfo = TokenService.getPrivateLeaderboardInfoDict()[params.privateLeaderboardUUID];
    //             if (props.global) {
    //                 setLeaderboardName("GLOBAL LEADERBOARD")
    //             } else {
    //                 setLeaderboardName(privateLeaderboardInfo.name.toUpperCase())
    //             }
    //             doRestOfUseEffect(
    //                 res.data.requestingUserRowRank,
    //                 res.data.requestingUserRow,
    //                 res.data.firstRowRank,
    //                 privateLeaderboardInfo
    //             );
    //         }
    //     )
    // }

    // const doRestOfUseEffect = (
    //     requestingUserRowRank,
    //     requestingUserRow,
    //     firstRowRank,
    //     privateLeaderboardInfo
    // ) => {
    //     if (!props.global) {
    //         setIsOwner(privateLeaderboardInfo.isOwner === "1");
    //     }
    //     let THs = generateSomeHeaders();
    //     let [above_rows,below_rows] = generateAboveBelowRows(
    //         requestingUserRowRank,
    //         requestingUserRow,
    //         firstRowRank
    //     );
    //     setUserAboveRows(above_rows);
    //     setUserBelowRows(below_rows);
    //     setThs(THs);
    // }

    // const generateAboveBelowRows = (
    //     requestingUserRowRank,
    //     requestingUserRow,
    //     firstRowRank
    // ) => {
    //     if (requestingUserRowRank) { 
    //         let line = "|";
    //         let line_row = (
    //             <tr
    //                 key="line-row"    
    //             >
    //                 <td><b>{line}</b></td>
    //                 <td><b>{line}</b></td>
    //                 <td><b>{line}</b></td>
    //                 <td><b>{line}</b></td>
    //                 <td><b>{line}</b></td>
    //                 <td><b>{line}</b></td>
    //                 <td><b>{line}</b></td>
    //             </tr>
    //         );
    //         var data_row;
    //         if (
    //             (requestingUserRow) && (requestingUserRowRank)
    //         ) {
    //             data_row = generateRow(
    //                 requestingUserRow,
    //                 99,
    //                 requestingUserRowRank,
    //                 true
    //             );
    //         }
    //         let typ = firstRowRank > requestingUserRowRank ? 'above' : 'below';
    //         if (typ === "above") {
    //             return [[data_row, line_row],[]];
    //         } else {
    //             return [[],[line_row, data_row]];
    //         }
    //     } else {
    //         return [[],[]];
    //     }
    // }

    // const generateRow = (row,ix,firstRowRank,isUserRow=false) => {
    //     let tds = [
    //         <td key='rank'>{isUserRow ? firstRowRank : firstRowRank + ix}</td>,
    //     ];
    //     tds.push(
    //         <td
    //             key='username'
    //         >
    //             <a
    //                 href={`/prediction-history/${row.username}/${leaderboardSeason}`}
    //                 target="_blank"
    //                 rel="noopener noreferrer"
    //                 className={row.username === currentUser.username ? 'user-row' : ""}
    //             >
    //                 {row.username}
    //             </a>
    //         </td>
    //     )
    //     for (const i of [1,2,3,4]) {
    //         var td_val = null;
    //         if (i in row.seasonPeriodScores) {
    //             td_val = formatMobileScore(row.seasonPeriodScores[i]);
    //         }
    //         tds.push(
    //             <td key={i}>{td_val}</td>
    //         )
    //     }
    //     let season_score = formatMobileScore(row.seasonScore);
    //     tds.push(
    //         <td key='season'>{season_score}</td>
    //     );
    //     return (
    //         <tr
    //             key={"row-" + ix}
    //         >
    //             {tds}
    //         </tr>
    //     );
    // }

    // const updateOrderBy = (newOrderBy) => {
    //     searchParams.set('orderBy', newOrderBy);
    //     setSearchParams(searchParams);
    // }

    // const updatePageNumber = (newPageNumber) => {
    //     searchParams.set('page', newPageNumber);
    //     setSearchParams(searchParams);
    // }

    // const updateParentOrderBy = (newOrderBy) => {
    //     // If new order by is same as the current one, then go back to 
    //     //    ordering by season, unless already on season
    //     if (newOrderBy === parseInt(searchParams.get('orderBy'))) {
    //         if (newOrderBy !== 1234) {
    //             updateOrderBy(1234);
    //         }
    //     } else {
    //         updateOrderBy(newOrderBy);
    //     }
    // }

    const generateSomeHeaders = () => {

        let ths = [
            <th
                id='rank-header'
                key='rank-header'
                className='br'
            >
                {props.global ? "Global " : ""}Rank
            </th>,
            <th
                id='user-header'
                key='user-header'
                className='br'
            >
                User
            </th>
        ];
        var upArrowNotPrinted = true;
        for (const i of [1,2,3,4]) {
            let ID = `SP${i}-header`;
            let text = `${i}`;
            if (i === parseInt(searchParams.get('orderBy'))) {
                text += " ↓";
                upArrowNotPrinted = false;
            }
            ths.push(
                <th
                    id={ID}
                    key={ID}
                    className='leaderboard-header br sp-col'
                    onClick={() => updateParentOrderBy(i)}
                >
                    {text}
                </th>
            );
        }
        let text2 = "Season";
        if (upArrowNotPrinted) {
            text2 += " ↓";
        }
        ths.push(
            <th
                id='season-header'
                key='season-header'
                className='leaderboard-header bl sp-col'
                onClick={() => updateParentOrderBy(1234)}
            >
                {text2}
            </th>
        );
        let tr1 = (
            <tr>
                <th></th>
                <th></th>
                <th className='tlr' colSpan={4}>Season Period</th>
                <th></th>
            </tr>
        )
        let tr2 = (
            <tr>
                {ths}
            </tr>
        )
        return [tr1,tr2];
    }

    const params = useParams();
	const [searchParams, setSearchParams] = useSearchParams();

    const [leaderboardRows, setLeaderboardRows] = useState([]);
    const [firstRowRank, setFirstRowRank] = useState(null);
    // const [requestingUserRow, setRequestingUserRow] = useState(null);
    // const [requestingUserRowRank, setRequestingUserRowRank] = useState(null);
    const [pageCount, setPageCount] = useState(1);
    const [uniqueSeasons, setUniqueSeasons] = useState([]);
    const [leaderboardSeason, setLeaderboardSeason] = useState(null);
    const [leaderboardName, setLeaderboardName] = useState("");
    const [ths, setThs] = useState([]);
    const [userAboveRows, setUserAboveRows] = useState([]);
    const [userBelowRows, setUserBelowRows] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);
  
    useEffect(
        () => {
            let user = TokenService.getUser();
            if (props.global & (user === null)) {
                History.push("/nope");
            } else {
                let type = props.global ? "Global" : "Private"
                document.title = type + " Leaderboard";            
                if (uniqueSeasons.length === 0) {
                    AnswerService.getUniqueSeasonsForAnswers(
                        props.global,
                        params.privateLeaderboardUUID
                    ).then(
                        (res) => {
                            var unique_seasons = res.data;
                            setUniqueSeasons(unique_seasons);
                            otherStuff(unique_seasons);
                        }
                    )
                } else {
                    otherStuff(uniqueSeasons);
                }
            }
        },
        [params]
    )

    const otherStuff = (unique_seasons) => {
        // If season not in params or season not one of available options, get max season and redirect to there
        var leaderboard_season = params.season;
        setLeaderboardSeason(params.season);
        if (
            (leaderboard_season == null) ||
            (!unique_seasons.includes(parseInt(leaderboard_season)))
        ) {
            // AnswerService.getMaxSeasonForAnswers().then(
            //     (res2) => {
            // leaderboard_season = res2.data;
            leaderboard_season = Math.max(...unique_seasons);
            setLeaderboardSeason(leaderboard_season);
            let plUUID = params.privateLeaderboardUUID;
            var url;
            if (props.global) {
                url = `/global-leaderboard/${leaderboard_season}?orderBy=1234&page=1`;
            } else {
                url = `/private-leaderboard/${plUUID}/${leaderboard_season}?orderBy=1234&page=1`
            }
            History.push(url);
            //     }
            // )
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
                UserScoreService.getLeaderboardPageCount(
                    props.global ? 'global' : 'private',
                    params.privateLeaderboardUUID,
                    leaderboard_season
                ).then(
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

    const callUserScoreService = (
        leaderboard_season,
    ) => {
        UserScoreService.getLeaderboardData(
            props.global ? 'global' : 'private',
            params.privateLeaderboardUUID,
            leaderboard_season,
            currentUser.userID,
            searchParams.get('orderBy'),
            searchParams.get('page')
        ).then(
            (res) => {
                // setRequestingUserRowRank(res.data.requestingUserRowRank);
                // setRequestingUserRow(res.data.requestingUserRow);
                setPageCount(res.data.pageCount);
                setFirstRowRank(res.data.firstRowRank);
                setLeaderboardRows(res.data.rows);
                let privateLeaderboardInfo = TokenService.getPrivateLeaderboardInfoDict()[params.privateLeaderboardUUID];
                if (props.global) {
                    setLeaderboardName("GLOBAL LEADERBOARD")
                } else {
                    setLeaderboardName(privateLeaderboardInfo.name.toUpperCase())
                }
                doRestOfUseEffect(
                    res.data.requestingUserRowRank,
                    res.data.requestingUserRow,
                    res.data.firstRowRank,
                    privateLeaderboardInfo
                );
            }
        )
    }

    const doRestOfUseEffect = (
        requestingUserRowRank,
        requestingUserRow,
        firstRowRank,
        privateLeaderboardInfo
    ) => {
        if (!props.global) {
            setIsOwner(privateLeaderboardInfo.isOwner === "1");
        }
        let THs = generateSomeHeaders();
        let [above_rows,below_rows] = generateAboveBelowRows(
            requestingUserRowRank,
            requestingUserRow,
            firstRowRank
        );
        setUserAboveRows(above_rows);
        setUserBelowRows(below_rows);
        setThs(THs);
    }

    const generateAboveBelowRows = (
        requestingUserRowRank,
        requestingUserRow,
        firstRowRank
    ) => {
        if (requestingUserRowRank) { 
            let line = "|";
            let line_row = (
                <tr
                    key="line-row"    
                >
                    <td><b>{line}</b></td>
                    <td><b>{line}</b></td>
                    <td><b>{line}</b></td>
                    <td><b>{line}</b></td>
                    <td><b>{line}</b></td>
                    <td><b>{line}</b></td>
                    <td><b>{line}</b></td>
                </tr>
            );
            var data_row;
            if (
                (requestingUserRow) && (requestingUserRowRank)
            ) {
                data_row = generateRow(
                    requestingUserRow,
                    99,
                    requestingUserRowRank,
                    true
                );
            }
            let typ = firstRowRank > requestingUserRowRank ? 'above' : 'below';
            if (typ === "above") {
                return [[data_row, line_row],[]];
            } else {
                return [[],[line_row, data_row]];
            }
        } else {
            return [[],[]];
        }
    }

    const generateRow = (row,ix,firstRowRank,isUserRow=false) => {
        let tds = [
            <td key='rank'>{isUserRow ? firstRowRank : firstRowRank + ix}</td>,
        ];
        tds.push(
            <td
                key='username'
            >
                <a
                    href={`/prediction-history/${row.username}/${leaderboardSeason}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={row.username === currentUser.username ? 'user-row' : ""}
                >
                    {row.username}
                </a>
            </td>
        )
        
        for (const i of [1,2,3,4]) {
            var td_val;
            if (row.seasonPeriodScores) {
                if (i in row.seasonPeriodScores) {
                    td_val = formatMobileScore(row.seasonPeriodScores[i]);
                } else {
                    td_val = "";
                }
            } else {
                td_val = "";
            }
            tds.push(
                <td key={i}>{td_val}</td>
            )
        }
        var season_score;
        if (row.seasonScore) {
            season_score = formatMobileScore(row.seasonScore);
        } else {
            season_score = "";
        }
        tds.push(
            <td key='season'>{season_score}</td>
        );
        return (
            <tr
                key={"row-" + ix}
            >
                {tds}
            </tr>
        );
    }

    const updateOrderBy = (newOrderBy) => {
        searchParams.set('orderBy', newOrderBy);
        setSearchParams(searchParams);
    }

    const updatePageNumber = (newPageNumber) => {
        searchParams.set('page', newPageNumber);
        setSearchParams(searchParams);
    }

    const updateParentOrderBy = (newOrderBy) => {
        // If new order by is same as the current one, then go back to 
        //    ordering by season, unless already on season
        if (newOrderBy === parseInt(searchParams.get('orderBy'))) {
            if (newOrderBy !== 1234) {
                updateOrderBy(1234);
            }
        } else {
            updateOrderBy(newOrderBy);
        }
    }

    // const generateSomeHeaders = () => {
    //     let ths = [];
    //     var upArrowNotPrinted = true;
    //     for (const i of [1,2,3,4]) {
    //         let ID = `SP${i}-header`;
    //         let text = `Season Period ${i}`;
    //         if (i === parseInt(searchParams.get('orderBy'))) {
    //             text += " ↓";
    //             upArrowNotPrinted = false;
    //         }
    //         ths.push(
    //             <th
    //                 id={ID}
    //                 key={ID}
    //                 className='leaderboard-header br sp-col'
    //                 onClick={() => updateParentOrderBy(i)}
    //             >
    //                 {text}
    //             </th>
    //         );
    //     }
    //     let text2 = "Season";
    //     if (upArrowNotPrinted) {
    //         text2 += " ↓";
    //     }
    //     ths.push(
    //         <th
    //             id='season-header'
    //             key='season-header'
    //             className='leaderboard-header bl sp-col'
    //             onClick={() => updateParentOrderBy(1234)}
    //         >
    //             {text2}
    //         </th>
    //     );
    //     return ths;
    // }

    if (ths.length > 0) {

        return (
            <div id='generic-leaderboard-parent-div'>
                <PopupComponent
                    trigger={showPopup}
                    setTrigger={setShowPopup}
                    title={props.popupTitle}
                    subtitle={"popupSubtitle"}
                    message={props.popupMessage}
                />
                <div id='generic-leaderboard-left'>
                    <h4
                        id='mobile-leaderboard-title-left'
                        className='leaderboard-titles'
                    >
                        {leaderboardName}
                    </h4>
                    <div id="mobile-subtitle-div">
                        <button
                            id="mobile-question-mark-button"
                            className="tqbc-black-button"
                            onClick={() => setShowPopup(true)}
                        >
                            ?
                        </button>
                        {
                            ((!props.global) && isOwner) && (
                                <h6
                                    id='mobile-leaderboard-title-right'
                                    className='leaderboard-titles'
                                >
                                    <a
                                        href={`/edit-private-leaderboard-weightings/${params.privateLeaderboardUUID}`}
                                    >
                                        Edit Leaderboard Weightings
                                    </a>
                                </h6>
                            )
                        }

                    </div>
                    <div id="mobile-generic-leaderboard-top-div">
                        <h1 id="mobile-generic-leaderboard-title">
                            {leaderboardSeason}
                        </h1>
                        <SeasonSelector
                            uniqueSeasons={uniqueSeasons}
                            currentSeason={leaderboardSeason}
                            username={params.username}
                            page='leaderboard'
                            privateLeaderboardUUID={params.privateLeaderboardUUID}
                        />
                    </div>
                    <table id="mobile-generic-leaderboard-table">
                        <thead>
                            {ths}
                        </thead>
                        <tbody
                            className='generic-leaderboard-tbody'
                        >
                            {userAboveRows}
                            {leaderboardRows.map(
                                (row,ix) => {
                                    return generateRow(row,ix,firstRowRank);
                                }
                            )}
                            {userBelowRows}
                        </tbody>
                    </table>
                    <PageSelectorComponent
                        pageCount={pageCount}
                        currentPage={parseInt(searchParams.get('page'))}
                        updatePageNumber={updatePageNumber}
                    />
                </div>
            </div>
        );
    } else {
        return <TQBCLoading/>;
    }
}