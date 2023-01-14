import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import History from '../../helpers/History';
import PrivateLeaderboardService from '../../services/PrivateLeaderboardService';
import TokenService from '../../services/Token.service';
import './JoinPrivateLeaderboard.css';

export const JoinPrivateLeaderboard = () => {

    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessageColour, setErrorMessageColour] = useState("red");
    const [newPrivateLeaderboardUUID, setNewPrivateLeaderboardUUID] = useState("");
	const { user: currentUser } = useSelector((state) => state.auth);


    useEffect(
        () => {
            let user = TokenService.getUser();
            if (user === null) {
                History.push("/nope");
            } else {
                document.title = "Join Private Leaderboard"
            }
        }
    )


    const onChangeUUID = (ev) => {
        setNewPrivateLeaderboardUUID(ev.target.value);
    }

    const handleSubmit = () => {
        var uuid_result = true;
        if (newPrivateLeaderboardUUID.length !== 36) {
            uuid_result = false;
            setErrorMessageColour("red");
            setErrorMessage(
                "The private leaderboard UUID must be exactly 36 characters long"
            )
        } else {
            setErrorMessage("");
        }
        // var already_member_result = true;
        // for (const pli of TokenService.getPrivateLeaderboardInfos()) {
        //     if (newPrivateLeaderboardUUID === pli.uuid) {
        //         already_member_result = false;
        //         setErrorMessage(
        //             "You are already a member of this private leaderboard"
        //         )
        //     }
        // }
        let already_member_result = TokenService.getPrivateLeaderboardUUIDs().includes(newPrivateLeaderboardUUID);
        if (already_member_result) {
            setErrorMessageColour("red");
            setErrorMessage("You are already a member of this private leaderboard");
        }
        if (uuid_result && !already_member_result) {
            setErrorMessageColour("black");
            setErrorMessage("Loading..");
            PrivateLeaderboardService.joinPrivateLeaderboard(
                currentUser.userID,
                newPrivateLeaderboardUUID
            ).then(
                (res) => {
                    if (res.status === 200) {
                        // Update private leaderboard memberships
                        PrivateLeaderboardService.getPrivateLeaderboardInfos(
                            currentUser.userID
                        ).then(
                            (res2) => {
                                TokenService.setPrivateLeaderboardInfos(res2.data);
                                History.push(`/private-leaderboard/${newPrivateLeaderboardUUID}`);
                            }
                        )
                    }
                }
            ).catch(
                (err) => {
                    setErrorMessageColour("red");
                    setErrorMessage(err.response.data.message);
                }
            )
        }
    }

    return (
        <div
            id="join-private-leaderboard-div"
            className="private-leaderboard-membership-parent-div"
        >
            <h1
                id="join-private-leaderboard-title"
                className="big-h1-title"
            >
                Join New Private Leaderboard
            </h1>
            <div
                id="join-private-leaderboard-form-div"
            >
                <div
                    id='join-private-leaderboard-uuid-input-div'
                >
                    <h5
                        id='join-private-leaderboard-input-label'
                    >
                        Private Leaderboard UUID
                    </h5>
                    <input
                        id="join-private-leaderboard-uuid-input"
                        maxLength={36}
                        onChange={onChangeUUID}
                    />
                </div>
                <p
                    style={{
                        height: "3vh",
                        color: errorMessageColour
                    }}
                >
                    {errorMessage}
                </p>
                <button
                    className="tqbc-black-button"
                    id='join-leaderboard-submit'
                    onClick={handleSubmit}
                >
                    Join Private Leaderboard
                </button>
            </div>
        </div>
    );
}