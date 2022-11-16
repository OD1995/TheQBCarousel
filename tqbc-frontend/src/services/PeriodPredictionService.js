import api from './api.js';

class PeriodPredictionService {

    base_url = "/v1/period-predictions/"

    postPredictions(
        predictionPeriodID,
        userID,
        predictions
    ) {
        return api.post(
            this.base_url + "postpredictions",
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
            this.base_url + "getpredictions",
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
            this.base_url + "getmaxseason",
            {
                params: {
                    username: username
                }
            }
        );
    }
}

export default new PeriodPredictionService();