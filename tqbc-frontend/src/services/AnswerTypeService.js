import api from './api.js';

class AnswerTypeService {

    getAllAnswerTypes() {
        return api.get(
            process.env.REACT_APP_BACKEND_BASE_URL + "/api/v1/answer-types/all"
        )
    }
}

export default new AnswerTypeService();