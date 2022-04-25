import axios from 'axios';

class PeriodPredictionService {

    postPredictions(
        predictionPeriodID,
        userID,
        predictions
    ) {
        return axios.post(
            process.env.REACT_APP_BACKEND_BASE_URL + "/api/v1/periodpredictions/postpredictions",
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
        return axios.get(
            process.env.REACT_APP_BACKEND_BASE_URL + "/api/v1/periodpredictions/getpredictions",
            {
                params: {
                    username: username,
                    predictionPeriodID: predictionPeriodID
                }
            }
        );
    }

    getMaxPredictionPeriodID(
        username
    ) {
        return axios.get(
            process.env.REACT_APP_BACKEND_BASE_URL + "/api/v1/periodpredictions/getmaxpredictionperiodid",
            {
                params: {
                    username: username
                }
            }
        );
    }
}

export default new PeriodPredictionService();