import axios from 'axios';

class PredictionPeriodService {

    getHowItWorksPredictionPeriods() {
        return axios.get(process.env.REACT_APP_BACKEND_BASE_URL + "/api/v1/predictionperiods/howitworks");
    }

    getCurrentPredictionPeriodID() {
        return axios.get(process.env.REACT_APP_BACKEND_BASE_URL + "api/v1/predictionperiods/getcurrent");
    }
}

export default new PredictionPeriodService();