import axios from 'axios';
import authHeader from './auth-header';

class ConferenceService {

    getActiveConferences() {
        return axios.get(
            process.env.REACT_APP_BACKEND_BASE_URL + "/api/v1/conferences/active",
            {
                headers : authHeader()
            }
        );
    }
}

export default new ConferenceService();