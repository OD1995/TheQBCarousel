import api from './api.js';

class ConferenceService {

    getActiveConferences() {
        return api.get(
            process.env.REACT_APP_BACKEND_BASE_URL + "/api/v1/conferences/active"
        );
    }
}

export default new ConferenceService();