import axios from 'axios';

class PredictionPeriodService {

    getHowItWorksPredictionPeriods() {
        return axios.get(process.env.REACT_APP_BACKEND_BASE_URL + "/api/v1/predictionperiods/howitworks");
    }
}

export default new PredictionPeriodService();