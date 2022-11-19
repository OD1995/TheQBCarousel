package mygroup.tqbcbackend.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mygroup.tqbcbackend.model.Answer;
import mygroup.tqbcbackend.payload.request.AnswerPostRequest;
import mygroup.tqbcbackend.payload.request.AnswerRequest;
import mygroup.tqbcbackend.payload.response.MessageResponse;
import mygroup.tqbcbackend.repository.AnswerRepository;
import mygroup.tqbcbackend.repository.AnswerTypeRepository;
import mygroup.tqbcbackend.repository.PlayerRepository;
import mygroup.tqbcbackend.repository.TeamRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/answers")
public class AnswerController {
    
// private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);
    private static final Logger logger = LoggerFactory.getLogger(AnswerController.class);

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private AnswerTypeRepository answerTypeRepository;

    // Get all answers for a season
    @GetMapping("/get-season-answers")
    public List<Answer> getSeasonAnswers(AnswerRequest answerRequest) {
        // logger.info(A);
        return answerRepository.findByTeam_SeasonAndTeam_Conference(
            answerRequest.getSeason(),
            answerRequest.getConference()
        );
    }

    // Save answers to db
    @PostMapping("/post-team-season-answers")
    public ResponseEntity<?> postTeamSeasonAnswers(
        @Valid @RequestBody AnswerPostRequest answerPostRequest
    ) {
        long teamID = answerPostRequest.getTeamID();
        long answerTypeID = answerPostRequest.getAnswerTypeID();
        List<Answer> answerList = new ArrayList<Answer>();
        for (Long playerID : answerPostRequest.getAnswers()) {
            answerList.add(
                new Answer(
                    teamRepository.findByTeamID(teamID),
                    playerRepository.findByPlayerID(playerID),
                    answerTypeRepository.findByAnswerTypeID(answerTypeID)
                )
            );
        }
        answerRepository.saveAll(answerList);
        return ResponseEntity.ok(
            new MessageResponse("Success!")
        );
    }
}
