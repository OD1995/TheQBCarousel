import api from './api.js';

class ArticleService {

    base_url = "/v1/articles"

    getArticle(articleID) {
        return api.get(
            this.base_url + "/get-article",
            {
                params: {
                    articleID
                }
            }
        )
    }
}

export default new ArticleService();