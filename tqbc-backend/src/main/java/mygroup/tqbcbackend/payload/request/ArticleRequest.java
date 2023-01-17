package mygroup.tqbcbackend.payload.request;

import java.util.UUID;

public class ArticleRequest {
    
    private UUID articleID;

    public UUID getArticleID() {
        return this.articleID;
    }

    public void setArticleID(UUID articleID) {
        this.articleID = articleID;
    }

}
