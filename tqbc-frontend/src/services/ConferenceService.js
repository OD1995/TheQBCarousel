import axios from 'axios';

class ConferenceService {

    getActiveConferences() {
        return axios.get(process.env.REACT_APP_BACKEND_BASE_URL + "/api/v1/conferences/active");
    }
}

export default new ConferenceService();