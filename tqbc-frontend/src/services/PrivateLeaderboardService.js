import api from './api.js';

class PrivateLeaderboardService {

    base_url = "/v1/private-leaderboards/"

    postPrivateLeaderboardData(
        userID,
        privateLeaderboardName,
        weightings
    ) {
        return api.post(
            this.base_url + "post-private-leaderboard-data",
            {
                userID: userID,
                privateLeaderboardName: privateLeaderboardName,
                weightings: weightings
            }
        );
    }
}

export default PrivateLeaderboardService();