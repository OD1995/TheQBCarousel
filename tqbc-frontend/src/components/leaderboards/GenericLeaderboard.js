export const GenericLeaderboard = (props) => {
    return (
        <div>
            <table className="generic-leaderboard-table">
                <th>
                    <td>User</td>
                    <td>SP1</td>
                    <td>SP2</td>
                    <td>SP3</td>
                    <td>SP4</td>
                    <td>Season</td>
                </th>
                {props.data.map(
                    (user) => {

                    }
                )}
            </table>
        </div>
    );
}