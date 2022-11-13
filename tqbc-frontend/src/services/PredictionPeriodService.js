import api from './api.js';

class PredictionPeriodService {

    getHowItWorksPredictionPeriods() {
        return api.get(process.env.REACT_APP_BACKEND_BASE_URL + "/api/v1/predictionperiods/howitworks");
    }

    getCurrentPredictionPeriodID() {
        return api.get(process.env.REACT_APP_BACKEND_BASE_URL + "/api/v1/predictionperiods/getcurrent");
    }

    getActivePredictionPeriods() {
        return api.get(process.env.REACT_APP_BACKEND_BASE_URL + "/api/v1/predictionperiods/active")
    }
}

export default new PredictionPeriodService();