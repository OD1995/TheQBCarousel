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

    getPrivateLeaderboardName(
        privateLeaderboardUUID
    ) {
        return api.get(
            this.base_url + "get-private-leaderboard-name",
            {
                params: {
                    privateLeaderboardUUID: privateLeaderboardUUID
                }
            }
        );
    }

    getPrivateLeaderboardWeightings(
        privateLeaderboardUUID
    ) {
        return api.get(
            this.base_url + "get-private-leaderboard-weightings",
            {
                params: {
                    privateLeaderboardUUID: privateLeaderboardUUID
                }
            }
        );
    }

    getPrivateLeaderboard(
        privateLeaderboardUUID
    ) {
        return api.get(
            this.base_url + "get-private-leaderboard",
            {
                params: {
                    privateLeaderboardUUID: privateLeaderboardUUID
                }
            }
        );
    }
}

export default new PrivateLeaderboardService();