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

    getPredictions(
        username,
        predictionPeriodID
    ) {
        return api.get(
            this.base_url + "get-predictions",
            {
                params: {
                    username: username,
                    season: predictionPeriodID
                }
            }
        );
    }

    getMaxPredictionPeriodID(
        username
    ) {
        return api.get(
            this.base_url + "getmaxpredictionperiodid",
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