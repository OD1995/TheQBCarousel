package mygroup.tqbcbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mygroup.tqbcbackend.model.AnswerType;
import mygroup.tqbcbackend.repository.AnswerTypeRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/answer-types")
public class AnswerTypeController {
    
    @Autowired
    private AnswerTypeRepository answerTypeRepository;

    // Get all answer types
    @GetMapping("/all")
    public List<AnswerType> getAllAnswerTypes() {
        return answerTypeRepository.findAll();
    }
}
