package mygroup.tqbcbackend.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mygroup.tqbcbackend.model.Answer;
import mygroup.tqbcbackend.payload.request.AnswerRequest;
import mygroup.tqbcbackend.repository.AnswerRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/answers")
public class AnswerController {
    
// private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);
    private static final Logger logger = LoggerFactory.getLogger(AnswerController.class);

    @Autowired
    private AnswerRepository answerRepository;

    // Get all answers for a season
    @GetMapping("/get-season-answers")
    public List<Answer> getSeasonAnswers(AnswerRequest answerRequest) {
        // String A = "HELLO, ME AGAIN, " + answerRequest.getSeason() + " & " + answerRequest.getConference();
        // logger.info(A);
        return answerRepository.findByTeam_SeasonAndTeam_Conference(
            answerRequest.getSeason(),
            answerRequest.getConference()
        );
    }
}
