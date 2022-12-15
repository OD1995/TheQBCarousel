import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { formatScore } from '../../helpers/UsefulFunctions';
import PopupComponent from '../PopUpComponent';
import './GenericLeaderboard.css';
import { GenericLeaderboardRightPanel } from './GenericLeaderboardRightPanel';
import { PageSelectorComponent } from './PageSelectorComponent';

export const GenericLeaderboard = (props) => {

    const [ths, setThs] = useState([]);
    const [userAboveRows, setUserAboveRows] = useState([]);
    const [userBelowRows, setUserBelowRows] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);
  
    useEffect(
        () => {
            let THs = generateSomeHeaders();
            let [above_rows,below_rows] = generateAboveBelowRows();
            setUserAboveRows(above_rows);
            setUserBelowRows(below_rows);
            setThs(THs);
        },
        [props]
    )

    const generateAboveBelowRows = () => {
        if (props.requestingUserRowRank) { 
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
                (props.requestingUserRow) && (props.requestingUserRowRank)
            ) {
                data_row = generateRow(
                    props.requestingUserRow,
                    99,
                    props.requestingUserRowRank,
                    true
                );
            }
            let typ = props.firstRowRank > props.requestingUserRowRank ? 'above' : 'below';
            if (typ == "above") {
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
                    href={`/prediction-history/${row.username}/${props.currentSeason}`}
                    target="_blank"
                    className={row.username === currentUser.username ? 'user-row' : ""}
                >
                    {row.username}
                </a>
            </td>
        )
        for (const i of [1,2,3,4]) {
            var td_val = null;
            if (i in row.seasonPeriodScores) {
                td_val = formatScore(row.seasonPeriodScores[i]);
            }
            tds.push(
                <td key={i}>{td_val}</td>
            )
        }
        let season_score = formatScore(row.seasonScore);
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

    const updateParentOrderBy = (newOrderBy) => {
        // If new order by is same as the current one, then go back to 
        //    ordering by season, unless already on season
        if (newOrderBy === props.orderedBy) {
            if (newOrderBy !== 1234) {
                props.updateOrderBy(1234);
            }
        } else {
            props.updateOrderBy(newOrderBy);
        }
    }

    const generateSomeHeaders = () => {
        let ths = [];
        var upArrowNotPrinted = true;
        for (const i of [1,2,3,4]) {
            let ID = `SP${i}-header`;
            let text = `Season Period ${i}`;
            if (i === props.orderedBy) {
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
        return ths;
    }

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
                    <table id="generic-leaderboard-table">
                        <thead>
                            <tr>
                                <th className='br' id='rank-header'>{props.global ? "Global " : ""}Rank</th>
                                <th className='br' id='user-header'>User</th>
                                {ths}
                            </tr>
                        </thead>
                        <tbody
                            className='generic-leaderboard-tbody'
                        >
                            {userAboveRows}
                            {props.rows.map(
                                (row,ix) => {
                                    return generateRow(row,ix,props.firstRowRank);
                                }
                            )}
                            {userBelowRows}
                        </tbody>
                    </table>
                    <PageSelectorComponent
                        pageCount={props.pageCount}
                        currentPage={props.currentPage}
                        // pageCount={7}
                        // currentPage={3}
                        updatePageNumber={props.updatePageNumber}
                    />
                </div>
                <GenericLeaderboardRightPanel                    
                    season={props.currentSeason}
                    uniqueSeasons={props.uniqueSeasons}
                    setShowPopup={setShowPopup}
                />
            </div>
        );
    } else {
        return null;
    }
}