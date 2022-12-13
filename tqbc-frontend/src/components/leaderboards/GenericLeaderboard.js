import { useEffect } from 'react';
import { useState } from 'react';
import { formatScore } from '../../helpers/UsefulFunctions';
import './GenericLeaderboard.css';

export const GenericLeaderboard = (props) => {

    const [ths, setThs] = useState([]);
  
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
            <td>{row.username}</td>
        ];
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
            >
                {text2}
                {/* Season{upArrowNotPrinted ?  "&darr;" : ''} */}
                {/* {'&darr;'} */}
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
                    {props.rows.map(
                        (row,ix) => {
                            return generateRow(row,ix,props.firstRowRank);
                        }
                    )}
                </table>
            </div>
        );
    } else {
        return null;
    }
}