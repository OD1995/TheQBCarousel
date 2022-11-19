import api from './api';

class UserScoreService {

    base_url = "/v1/user-scores/"

    calculateUserScoreForSeason(userID,season) {
        return api.post(
            this.base_url + "calculate-score",
            {
                userID: userID,
                season: season   
            }
        );
    }
}

export default new UserScoreService();