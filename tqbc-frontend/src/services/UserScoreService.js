import api from './api';

class UserScoreService {

    base_url = "/v1/user-scores/"

    calculateUserScoreForSeason(season) {
        return api.post(
            this.base_url + "calculate-user-season-scores",
            {
                season   
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

    getLeaderboardData(
        leaderboardType,
        privateLeaderboardUUID,
        season,
        userID,
        seasonPeriodID,
        pageNumber
    ) {
        return api.get(
            this.base_url + "get-leaderboard-data",
            {
                params: {
                    leaderboardType: leaderboardType,
                    privateLeaderboardUUID: privateLeaderboardUUID,
                    season: season,
                    userID: userID,
                    seasonPeriodID: seasonPeriodID,
                    pageNumber: pageNumber
                }
            }
        )
    }

    getLeaderboardPageCount(
        leaderboardType,
        privateLeaderboardUUID,
        season
    ) {
        return api.get(
            this.base_url + "get-leaderboard-page-count",
            {
                params: {
                    leaderboardType: leaderboardType,
                    privateLeaderboardUUID: privateLeaderboardUUID,
                    season: season
                }
            }
        )
    }
}

export default new UserScoreService();