import api from './api.js';

class EventService {

    base_url = "/v1/events/";

    getEventsByEventIDArray(uniqueEventIDs) {
        return api.post(
            this.base_url + "eventIDIn",
            uniqueEventIDs
        );
    }

    getOutsidePredictionPeriodData() {
        return api.get(
            this.base_url + "get-outside-prediction-period-data"
        )
    }
}

export default new EventService();