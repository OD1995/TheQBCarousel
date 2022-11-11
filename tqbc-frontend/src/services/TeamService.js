import axios from 'axios';
import authHeader from './auth-header';

class TeamService {

    getActiveTeams() {
        return axios.get(
            process.env.REACT_APP_BACKEND_BASE_URL + "/api/v1/teams/active",
            {
                headers : authHeader()
            }
        )
    }
}

export default new TeamService();