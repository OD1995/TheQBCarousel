import api from './api.js';

class PlayerService {

    getActivePlayers() {
        return api.get(
            process.env.REACT_APP_BACKEND_BASE_URL + "/api/v1/players/active"
        )
    }
}

export default new PlayerService();