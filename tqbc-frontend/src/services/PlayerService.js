import api from './api.js';

class PlayerService {

    getActivePlayers() {
        return api.get(
            "/v1/players/active"
        )
    }
}

export default new PlayerService();