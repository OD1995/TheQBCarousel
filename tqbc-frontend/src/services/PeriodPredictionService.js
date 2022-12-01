import api from './api.js';

class PeriodPredictionService {

    base_url = "/v1/period-predictions/"

    postPredictions(
        predictionPeriodID,
        userID,
        predictions
    ) {
        return api.post(
            this.base_url + "post-predictions",
            {
                predictionPeriodID: predictionPeriodID,
                userID: userID,
                predictions: predictions
            }
        );
    }

    getSeasonPredictions(
        username,
        season
    ) {
        return api.get(
            this.base_url + "get-season-predictions",
            {
                params: {
                    username: username,
                    season: season
                }
            }
        );
    }

    getPredictionPeriodPredictions(
        userID,
        predictionPeriodID
    ) {
        return api.get(
            this.base_url + "get-prediction-period-predictions",
            {
                params: {
                    userID: userID,
                    predictionPeriodID: predictionPeriodID
                }
            }
        );
    }

    getMaxPredictionPeriodID(
        username
    ) {
        return api.get(
            this.base_url + "get-max-prediction-period-id",
            {
                params: {
                    username: username
                }
            }
        );
    }

    getMaxSeason(
        username
    ) {
        return api.get(
            this.base_url + "get-max-season",
            {
                params: {
                    username: username
                }
            }
        );
    }

    getUniqueSeasons(
        username
    ) {
        return api.get(
            this.base_url + "get-unique-seasons-for-user",
            {
                params: {
                    username: username
                }
            }
        );
    }
}

export default new PeriodPredictionService();