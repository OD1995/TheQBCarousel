import api from './api.js';

class AnswerTypeService {

    getAllAnswerTypes() {
        return api.get(
            "/v1/answer-types/all"
        )
    }
}

export default new AnswerTypeService();