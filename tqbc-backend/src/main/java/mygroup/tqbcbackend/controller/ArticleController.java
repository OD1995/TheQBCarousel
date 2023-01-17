package mygroup.tqbcbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mygroup.tqbcbackend.model.Article;
import mygroup.tqbcbackend.payload.request.ArticleRequest;
import mygroup.tqbcbackend.repository.ArticleRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/articles")
public class ArticleController {
    
    @Autowired
    private ArticleRepository articleRepository;

    @GetMapping("/get-article")
    public Article getArticle(
        ArticleRequest articleRequest
    ) {
        return articleRepository.findByArticleID(articleRequest.getArticleID());
    }
}
