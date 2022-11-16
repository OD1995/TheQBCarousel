import api from './api.js';

class EventService {

    getEventsByEventIDArray(uniqueEventIDs) {
        return api.post(
            "/v1/events/eventIDIn",
            uniqueEventIDs
        );
    }
}

export default new EventService();