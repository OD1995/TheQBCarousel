import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { formatScore } from '../../helpers/UsefulFunctions';
import './GenericLeaderboard.css';

export const GenericLeaderboard = (props) => {

    const [ths, setThs] = useState([]);
    const { user: currentUser } = useSelector((state) => state.auth);
  
    useEffect(
        () => {
            let THs = generateSomeHeaders();
            setThs(THs);
        },
        []
    )

    const generateRow = (row,ix,firstRowRank) => {
        let tds = [
            <td>{firstRowRank + ix}</td>,
        ];
        tds.push(
            <td>
                <a
                    href={`/prediction-history/${row.username}/${props.currentSeason}`}
                    target="_blank"
                    className={row.username == currentUser.username + "" ? 'user-row' : ""}
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
                <td>{td_val}</td>
            )
        }
        let season_score = formatScore(row.seasonScore);
        tds.push(
            <td>{season_score}</td>
        );
        return (
            <tr>
                {tds}
            </tr>
        );
    }

    const getNewData = (newOrderBy) => {
        // If new order by is same as the current one, then go back to 
        //    ordering by season, unless already on season
        if (newOrderBy == props.orderedBy) {
            if (newOrderBy != 1234) {
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
            if (i == props.orderedBy) {
                text += " ↓";
                upArrowNotPrinted = true;
            }
            ths.push(
                <th
                    id={ID}
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
                            <th class='br' id='rank-header'>{props.global ? "Global " : ""}Rank</th>
                            <th class='br' id='user-header'>User</th>
                            {ths}
                        </tr>
                    </thead>
                    <tbody
                        className='generic-leaderboard-tbody'
                    >
                        {props.rows.map(
                            (row,ix) => {
                                return generateRow(row,ix,props.firstRowRank);
                            }
                        )}
                    </tbody>
                </table>
            </div>
        );
    } else {
        return null;
    }
}