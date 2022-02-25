import axios from 'axios';

class TeamService {

    getActiveTeams() {
        return axios.get(process.env.REACT_APP_BACKEND_BASE_URL + "/api/v1/teams/active");
    }
}

export default new TeamService();