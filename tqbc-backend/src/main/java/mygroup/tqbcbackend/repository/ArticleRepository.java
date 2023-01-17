package mygroup.tqbcbackend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import mygroup.tqbcbackend.model.Article;

public interface ArticleRepository extends JpaRepository<Article,String> {
    
    public Article findByArticleID(UUID articleID);
}
