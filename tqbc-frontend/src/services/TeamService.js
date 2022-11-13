import api from './api.js';

class TeamService {

    getActiveTeams() {
        return api.get(
            process.env.REACT_APP_BACKEND_BASE_URL + "/api/v1/teams/active"
        )
    }
}

export default new TeamService();