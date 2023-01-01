import React, { useState, useEffect } from "react";
import History from "../../helpers/History"
import AnalysisService from "../../services/AnalysisService";
import TokenService from "../../services/Token.service";
import './AdminBoard.css';

const AdminBoard = () => {
    
    const [totalUsers, setTotalUsers] = useState(0);
    const [tableHeader, setTableHeader] = useState(null);
    const [tableRow, setTableRow] = useState(null)

    useEffect(
        () => {
            const user = TokenService.getUser();
            if (!user.roles.includes("ROLE_ADMIN")) {
                History.push("/nope");
            }
            AnalysisService.getAdminBoardSummaryStats().then(
                (res) => {
                    setTotalUsers(res.data.totalUserCount)
                    setTableData(res.data.usersByPredictionPeriod)
                }
            )
        },
        []
    );

    const setTableData = (ubpp) => {
        let H = [
            <th>Prediction Period</th>
        ];
        let R = [
            <td><b>Distinct Users</b></td>
        ];
        for (const D of ubpp) {
            H.push(
                <th>{D.predictionPeriodID}</th>
            )
            R.push(
                <td>{D.distinctUsers}</td>
            )
        }
        let table_header = (
            <tr>
                {H}
            </tr>
        );
        let table_row = (
            <tr>
                {R}
            </tr>
        );
        setTableHeader(table_header);
        setTableRow(table_row);
    }

    return (
        <div
            id="admin-board-parent-div"
        >
            <h1
                className="big-h1-title"
            >
                Admin Board
            </h1>
            <h5
                className="admin-board-subtitles"
            >
                Links
            </h5>
            <div
                id="admin-board-content-div"
            >
                <div
                    id="admin-board-links-div"
                >
                    <a
                        href="/answer-entry/2022"
                    >
                        Answer Entry
                    </a>
                    <a
                        href="/prediction-marking"
                    >
                        Prediction Marking
                    </a>
                    <a
                        href="/email-send-outs"
                    >
                        Email Send Outs
                    </a>
                </div>
            </div>
            <h5
                className="admin-board-subtitles"
            >
                Summary Stats
            </h5>
            <div
                id="admin-board-summary-stats"
            >
                <p>
                    <b>Total TQBC Users: </b>{totalUsers}
                </p>
                <table
                    id="admin-board-ubpp-table"
                >
                    <thead>
                        {tableHeader}
                    </thead>
                    <tbody>
                        {tableRow}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default AdminBoard;