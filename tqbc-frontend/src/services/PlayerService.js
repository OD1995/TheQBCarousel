import axios from 'axios';
import authHeader from './auth-header';
// import RequestHandlerService from './RequestHandlerService';

class PlayerService {

    getActivePlayers() {
        return axios.get(
            process.env.REACT_APP_BACKEND_BASE_URL + "/api/v1/players/active",
            {
                headers : authHeader()
            }
        )
    }
}

export default new PlayerService();