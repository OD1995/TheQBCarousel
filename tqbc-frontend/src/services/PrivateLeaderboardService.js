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

    setPrivateLeaderboardWeightings(
        userID,
        privateLeaderboardUUID,
        weightings
    ) {
        return api.post(
            this.base_url + "set-private-leaderboard-weightings",
            {
                userID: userID,
                privateLeaderboardUUID: privateLeaderboardUUID,
                weightings: weightings
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

    getPrivateLeaderboardInfos(
        userID
    ) {
        return api.get(
            this.base_url + "get-private-leaderboard-infos",
            {
                params: {
                    userID: userID
                }
            }
        );
    }

    joinPrivateLeaderboard(
        userID,
        privateLeaderboardUUID
    ) {
        return api.post(
            this.base_url + "join-private-leaderboard",
            {
                userID: userID,
                privateLeaderboardUUID: privateLeaderboardUUID
            }
        );
    }
}

export default new PrivateLeaderboardService();