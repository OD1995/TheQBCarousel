import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { formatScore } from '../../helpers/UsefulFunctions';
import './GenericLeaderboard.css';

export const GenericLeaderboard = (props) => {

    const [ths, setThs] = useState([]);
    const [userAboveRows, setUserAboveRows] = useState([]);
    const [userBelowRows, setUserBelowRows] = useState([]);
    const { user: currentUser } = useSelector((state) => state.auth);
  
    useEffect(
        () => {
            let THs = generateSomeHeaders();
            if (props.requestingUserRowRank) {
                if (props.firstRowRank > props.requestingUserRowRank) {
                    let above_rows = generateAboveBelowRows('above');
                    setUserAboveRows(above_rows);
                } else {
                    let below_rows = generateAboveBelowRows('below');
                    setUserBelowRows(below_rows);
                }
            }
            setThs(THs);
        },
        [props]
    )

    const generateAboveBelowRows = (typ) => {
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
                {/* <td>{line}</td>
                <td>{line}</td>
                <td>{line}</td>
                <td>{line}</td>
                <td>{line}</td>
                <td>{line}</td>
                <td>{line}</td> */}
            </tr>
        );
        let data_row = generateRow(
            props.requestingUserRow,
            99,
            props.requestingUserRowRank,
            true
        );

        if (typ == "above") {
            return [data_row, line_row];
        } else {
            return [line_row, data_row]
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

    const getNewData = (newOrderBy) => {
        // If new order by is same as the current one, then go back to 
        //    ordering by season, unless already on season
        if (newOrderBy === props.orderedBy) {
            if (newOrderBy !== 1234) {
                props.updateData(1234);
            }
        } else {
            props.updateData(newOrderBy);
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
                    onClick={() => getNewData(i)}
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
                onClick={() => getNewData(1234)}
            >
                {text2}
            </th>
        );
        return ths;
    }

    if (ths.length > 0) {

        return (
            <div>
                <table className="generic-leaderboard-table">
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
            </div>
        );
    } else {
        return null;
    }
}