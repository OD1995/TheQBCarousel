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

    getGlobalLeaderboardData(season,userID,seasonPeriodID,pageNumber) {
        return api.get(
            this.base_url + "get-global-leaderboard-data",
            {
                params: {
                    season: season,
                    userID: userID,
                    seasonPeriodID: seasonPeriodID,
                    pageNumber: pageNumber
                }
            }
        )
    }

    getGlobalLeaderboardPageCount(season) {
        return api.get(
            this.base_url + "get-global-leaderboard-page-count",
            {
                params: {
                    season: season
                }
            }
        )
    }
}

export default new UserScoreService();