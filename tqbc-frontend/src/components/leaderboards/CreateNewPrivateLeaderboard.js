import { useRef, useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-select";
import { isAlphanumeric } from "validator";
import { makeOptionsDropdownFriendly, makeValueDropdownFriendly, rangeInt, round_number } from "../../helpers/UsefulFunctions";
import './CreateNewPrivateLeaderboard.css';
import { useEffect } from "react";
import PrivateLeaderboardService from "../../services/PrivateLeaderboardService";
import { useSelector } from "react-redux";
import History from "../../helpers/History";
import TokenService from "../../services/Token.service";

export const CreateNewPrivateLeaderboard = () => {

    const form = useRef();
    const [privateLeaderboardName,setPrivateLeaderboardName] = useState("");
    const [weightingValues, setWeightingValues] = useState({});
    const [weightingErrorMessage, setWeightingErrorMessage] = useState("");
    const [nameErrorMessage, setNameErrorMessage] = useState("");
	const { user: currentUser } = useSelector((state) => state.auth);

    useEffect(
        () => {
            let user = TokenService.getUser();
            if (user === null) {
                History.push("/nope");
            } else {
                document.title = "Create New Private Leaderboard";
                let wv = {};
                for (const sp of rangeInt(1,4)) {
                    let sp_dict = {
                        numerator: 1,
                        denominator: 4
                    };
                    wv[sp] = sp_dict;
                }
                setWeightingValues(wv);
            }
        },
        []
    )

    const validateName = () => {
        if ((!privateLeaderboardName)) {
            setNameErrorMessage("Private leaderboard name is required");
            return false;
        } else if (!isAlphanumeric(privateLeaderboardName,"en-GB",{ignore:"_"})) {
            setNameErrorMessage(
                "Your private leaderboard name must use only numbers, letters and underscores"
            );
        }
        setNameErrorMessage("");
        return true;
    };

    const sumWeightings = (wv) => {
        let total = 0;
        for (const sp of rangeInt(1,4)) {
            let num = wv[sp].numerator;
            let den = wv[sp].denominator;
            total += num / den;
        }
        return total;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let weightingsSum = sumWeightings(weightingValues);
        let weighting_result = false;
        if (weightingsSum !== 1) {
            // let rounded = Math.round(Math.round((weightingsSum + Number.EPSILON) * 100) / 100)
            let rounded = round_number(weightingsSum,3);
            let txt = `The sum of your weightings is not 1 (${rounded}), please adjust and re-submit`;
            setWeightingErrorMessage(txt);
        } else {
            setWeightingErrorMessage("");
            weighting_result = true;
        }
        let name_result = validateName();
        let name_not_already_used = !TokenService.getPrivateLeaderboardNames().includes(privateLeaderboardName);
        if (!name_not_already_used) {
            let txt2 = `You already have a private leaderboard named '${privateLeaderboardName}'`;
            setNameErrorMessage(txt2);
        }
        if (weighting_result && name_result && name_not_already_used) {
            PrivateLeaderboardService.postPrivateLeaderboardData(
                currentUser.userID,
                privateLeaderboardName,
                weightingValues
            ).then(
                (res) => {
                    // Update private leaderboard memberships
                    PrivateLeaderboardService.getPrivateLeaderboardInfos(
                        currentUser.userID
                    ).then(
                        (res2) => {
                            TokenService.setPrivateLeaderboardInfos(res2.data);
                            History.push(`/private-leaderboard/${res.data}`);
                        }
                    )
                }
            )
        }
    }

    const setNewWeightValue = (ev,sp,typ) => {
        setWeightingValues(
            prevState => ({
                ...prevState,
                [sp]: {
                    ...prevState[sp],
                    [typ]: ev.value
                }
            })
        )
    }

    const onChangeName = (e) => {
        setPrivateLeaderboardName(e.target.value);
    };

    return (
        <div
            id="new-private-leaderboard-div"
            className="private-leaderboard-membership-parent-div"
        >
            <h1
                id="new-private-leaderboard-title"
                className="big-h1-title"
            >
                Create New Private Leaderboard
            </h1>
            <Form
                onSubmit={handleSubmit}
                ref={form}
                id="new-private-leaderboard-form"
                className="private-leaderboard-form"
            >
                <div id='create-new-private-leaderboard-grid'>
                    <h5
                        className="display-linebreak npl-text"
                        style={{
                            gridRow: 1,
                            gridColumn: 1,
                        }}
                    >
                        Private Leaderboard Name{"\n"}(max 20 characters)
                    </h5>
                    <div
                        style={{
                            gridRow: 1,
                            gridColumnStart: 2,
                            gridColumnEnd: 5,
                        }}
                    >
                        <Input
                            type="text"
                            name="private-leaderboard-name"
                            value={privateLeaderboardName}
                            onChange={onChangeName}
                            // validations={[required]}
                            maxLength={20}
                            style={{
                                width: '16.5vw'
                            }}
                        />
                    </div>
                    <div
                        style={{
                            gridRow: 2,
                            gridColumnStart: 1,
                            gridColumnEnd: 5,
                        }}
                    >
                        <p
                            className="new-private-leaderboard-error"
                        >
                            {nameErrorMessage}
                        </p>
                    </div>
                    <h5
                        id='weightings-text'
                    >
                        WEIGHTINGS
                    </h5>
                    {
                        rangeInt(1,4).map(
                            (ix) => {
                                let row = ix + 3;
                                let sp = ix;
                                let txt1 = (
                                    <h5
                                        className="npl-text"
                                        style={{
                                            gridRow: row,
                                            gridColumn: 1
                                        }}
                                    >
                                        Season Period {sp}
                                    </h5>
                                );
                                let txt2 = (
                                    <h5
                                        className="npl-text"
                                        style={{
                                            gridRow: row,
                                            gridColumn: 3
                                        }}
                                    >
                                        /
                                    </h5>
                                );
                                let select1 = (
                                    <div
                                        style={{
                                            gridRow: row,
                                            gridColumn: 2
                                        }}
                                    >
                                        <Select
                                            defaultValue={makeValueDropdownFriendly(1)}
                                            onChange={ev => setNewWeightValue(ev,sp,"numerator")}
                                            options={makeOptionsDropdownFriendly(rangeInt(0,20))}
                                            isSearchable={false}
                                            key={"numerator-" + sp}
                                            id={"numerator-" + sp}
                                        />
                                    </div>
                                );
                                let select2 = (
                                    <div
                                        style={{
                                            gridRow: row,
                                            gridColumn: 4
                                        }}
                                    >
                                        <Select
                                            defaultValue={makeValueDropdownFriendly(4)}
                                            onChange={ev => setNewWeightValue(ev,sp,"denominator")}
                                            options={makeOptionsDropdownFriendly(rangeInt(1,20))}
                                            isSearchable={false}
                                            key={"denominator-" + sp}
                                            id={"denominator-" + sp}
                                        />
                                    </div>                                        
                                );

                                // let sqr = (
                                //     <div
                                //         className="empty-square"
                                //         style={{
                                //             gridRow: row,
                                //             gridColumnStart: 1,
                                //             gridColumnEnd: 5
                                //         }}
                                //     >
                                //     </div>
                                // )

                                return [
                                    txt1,
                                    select1,
                                    txt2,
                                    select2,
                                    // sqr
                                ];
                            }
                        )
                    }
                    <p
                        className="new-private-leaderboard-error"
                        style={{
                            gridRow: 8,
                            gridColumnStart: 1,
                            gridColumnEnd: 5
                        }}
                    >
                        {weightingErrorMessage}
                    </p>
                </div>
                <button
                    className="tqbc-black-button"
                    id='new-private-leaderboard-submit'
                >
                    Create New Private Leaderboard
                </button>
            </Form>
        </div>
    );
}