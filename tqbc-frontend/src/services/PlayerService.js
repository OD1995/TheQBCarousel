import axios from 'axios';

class PlayerService {

    getActivePlayers() {
        return axios.get(process.env.REACT_APP_BACKEND_BASE_URL + "/api/v1/players/active");
    }
}

export default new PlayerService();