import api from './api.js';

class AnswerService {

    getAnswersForConferenceSeason(conference,season) {
        return api.get(
            "/v1/answers/get-season-answers",
            {
                params: {
                    season: parseInt(season),
                    conference: conference
                }
            }
        )
    }
}

export default new AnswerService();