import api from './api.js';

class TeamService {

    base_url = "/v1/teams/";

    getActiveTeams() {
        return api.get(
            this.base_url + "active"
        )
    }

    getConferenceActiveTeams(conference) {
        return api.get(
            this.base_url + "conference-active",
            {
                params: {
                    conference: conference
                }
            }
        )
    }

    getSeasonTeams(season) {
        return api.get(
            this.base_url + "get-season-teams",
            {
                params: {
                    season: season
                }
            }
        )
    }
}

export default new TeamService();