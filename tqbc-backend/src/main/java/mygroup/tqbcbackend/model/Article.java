package mygroup.tqbcbackend.model;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import org.hibernate.annotations.Type;


@Entity
@Table(name = "articles")
public class Article {
    
    @Id
    @Column(name = "ArticleID")
    @Type(type = "uuid-char")
    private UUID articleID;

    @Column(name = "ArticleTitle", length = 1000)
    private String articleTitle;

    @Lob
    @Column(name = "ArticleText")
    private String articleText;

    @Column(name = "ImageURL")
    private String imageURL;

    public Article() {
    }

    public Article(UUID articleID, String articleTitle, String articleText, String imageURL) {
        this.articleID = articleID;
        this.articleTitle = articleTitle;
        this.articleText = articleText;
        this.imageURL = imageURL;
    }

    public UUID getArticleID() {
        return this.articleID;
    }

    public void setArticleID(UUID articleID) {
        this.articleID = articleID;
    }

    public String getArticleTitle() {
        return this.articleTitle;
    }

    public void setArticleTitle(String articleTitle) {
        this.articleTitle = articleTitle;
    }

    public String getArticleText() {
        return this.articleText;
    }

    public void setArticleText(String articleText) {
        this.articleText = articleText;
    }

    public String getImageURL() {
        return this.imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }
}
