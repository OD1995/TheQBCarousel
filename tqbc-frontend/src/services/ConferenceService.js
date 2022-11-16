import api from './api.js';

class ConferenceService {

    getActiveConferences() {
        return api.get(
            "/v1/conferences/active"
        );
    }
}

export default new ConferenceService();