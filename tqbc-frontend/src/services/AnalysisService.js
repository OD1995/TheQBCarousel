import api from './api.js';

class AnalysisService {

    base_url = "/v1/analysis/"

    getAdminBoardSummaryStats() {
        return api.get(
            this.base_url + "get-admin-board-summary-stats"
        );
    }
}

export default new AnalysisService();