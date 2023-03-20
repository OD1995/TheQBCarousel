// import HbdLr from '../../../public/hbd-lr.png';

import { useState } from "react";
import History from "../../helpers/History";
import { sleep } from "../../helpers/UsefulFunctions";
import AdminService from "../../services/AdminService";

export const LizzieBirthday = () => {

    const [disableButton, setDisableButton] = useState(false);
    const [answer, setAnswer] = useState("");
    const [wrongText, setWrongText] = useState("");

    var url = 'https://open.spotify.com/playlist/7dEcEGjTtFOZj62NSCQbUY?si=e0e1c4df9a7f4a47';
    
    async function handleSubmit() {
        setDisableButton(true);
        let result = await checkAnswer();
        if (result) {
            window.location.href = url;
        } else {
            setWrongText("I'm very sad to report that's not the right answer");
            setDisableButton(false);
        }
    }

    async function checkAnswer() {
        // await sleep(1000);
        // return true;
        return AdminService.checkAnswer(answer).then(
            (response) => {
                return response.data;
            },
            (error) => {
                return false;
            }
        );
    }
    
    return (
        <div
            style={{
                backgroundImage:`url('/hbd-lr.png')`,
                backgroundSize:'5%',
                height:"88vh",
                marginLeft:"2vh",
                marginRight:"2vh",
                display:"flex",
                justifyContent:"center",
                alignItems:"center"
            }}
        >
            <div
                style={{
                    backgroundColor:"white",
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    paddingLeft:"2vw",
                    paddingRight:"2vw"
                }}
            >
                <h2
                    style={{
                        marginTop:"2vh"
                    }}
                >
                    Yes I know,{" "}
                    <a
                        href='https://knowyourmeme.com/memes/graphic-design-is-my-passion'
                        target="_blank"
                    >
                        graphic design is my passion
                    </a>
                    .
                </h2>
                <input
                    placeholder="8 letter word with the highest Scrabble score"
                    style={{
                        width:"25vw",
                        textAlign:"center",
                        marginTop:"3vh",
                        marginBottom:"3vh",
                    }}
                    onChange={(e) => setAnswer(e.target.value)}
                />
                <button
                    onClick={handleSubmit}
                    className={"tqbc-green-button" + (disableButton ? " disabled-button" : "")}
                >
                    Submit
                </button>
                <p
                    style={{
                        marginTop:"2vh",
                        color:"red"
                    }}
                >
                    &nbsp;{wrongText}
                </p>
            </div>
        </div>
    )
}