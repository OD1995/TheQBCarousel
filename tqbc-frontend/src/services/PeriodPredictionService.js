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
        // console.log("postPredictionsA");
    }
}

export default new PeriodPredictionService();