import api from './api.js';

class AnswerService {

    base_url = "/v1/answers/"

    getAnswersForConferenceSeason(conference,season) {
        return api.get(
            this.base_url + "get-season-answers",
            {
                params: {
                    season: parseInt(season),
                    conference: conference
                }
            }
        )
    }

    postAnswersForTeamAndAnswerType(teamID,answers,answerTypeID) {
        return api.post(
            this.base_url + "post-team-answertype-answers",
            {
                teamID: teamID,
                answers: answers,
                answerTypeID: answerTypeID
            }
        )
    }

    getMaxSeasonForAnswers() {
        return api.get(
            this.base_url + "get-max-season-for-answers"
        )
    }

    getUniqueSeasonsForAnswers(global,privateLeaderboardUUID) {
        return api.get(
            this.base_url + "get-unique-seasons-for-answers",
            {
                params: {
                    global,
                    privateLeaderboardUUID
                }
            }
        )
    }
}

export default new AnswerService();