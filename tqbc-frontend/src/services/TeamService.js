import api from './api.js';

class TeamService {

    getActiveTeams() {
        return api.get(
            "/v1/teams/active"
        )
    }

    getConferenceActiveTeams(conference) {
        return api.get(
            "/v1/teams/conference-active",
            {
                params: {
                    conference: conference
                }
            }
        )
    }
}

export default new TeamService();