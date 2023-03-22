import api from './api.js';

class AdminService {

    base_url = "/v1/admin/"

    checkAnswer(answer) {
        return api.get(
            this.base_url + "hbd-lr",
            {
                params: {
                    answer
                }
            }
        );
    }
}

export default new AdminService();