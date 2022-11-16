import api from './api.js';

class PredictionPeriodService {

    base_url = "/v1/prediction-periods/";

    getHowItWorksPredictionPeriods() {
        return api.get(this.base_url + "howitworks");
    }

    getCurrentPredictionPeriodID() {
        return api.get(this.base_url + "getcurrent");
    }

    getActivePredictionPeriods() {
        return api.get(this.base_url + "active")
    }
}

export default new PredictionPeriodService();