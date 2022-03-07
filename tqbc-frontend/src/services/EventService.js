import axios from 'axios';

class EventService {

    getEventsByEventIDArray(uniqueEventIDs) {
        return axios.post(
            process.env.REACT_APP_BACKEND_BASE_URL + "/api/v1/events/eventIDIn",
            uniqueEventIDs
        );
    }
}

export default new EventService();