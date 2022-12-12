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
            this.base_url + "get-conference-active-teams",
            {
                params: {
                    conference: conference
                }
            }
        )
    }

    getSeasonConferenceTeams(season,conference) {
        return api.get(
            this.base_url + "get-season-conference-teams",
            {
                params: {
                    season: season,
                    conference: conference
                }
            }
        );
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