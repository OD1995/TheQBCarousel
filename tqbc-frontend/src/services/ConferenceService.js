import api from './api.js';

class ConferenceService {
    base_url = "/v1/conferences/";

    getActiveConferences() {
       return api.get(
            this.base_url + "get-active-conferences"
        );
    }

    getSeasonConferences(season) {
        return api.get(
            this.base_url + "get-season-conferences",
            {
                params: {
                    season: season
                }
            }
        );
    }
}

export default new ConferenceService();