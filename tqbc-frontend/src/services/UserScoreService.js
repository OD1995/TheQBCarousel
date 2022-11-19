import api from './api';

class UserScoreService {

    base_url = "/v1/user-scores/"

    calculateUserScoreForSeason(userID,season) {
        return api.post(
            this.base_url + "calculate-user-season-scores",
            {
                userID: userID,
                season: season   
            }
        );
    }

    getUserScoresForSeason(userID,season) {
        return api.get(
            this.base_url + "get-season-scores-for-user",
            {
                params: {
                    userID: userID,
                    season: season
                }
            }
        );
    }
}

export default new UserScoreService();