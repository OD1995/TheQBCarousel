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
import mygroup.tqbcbackend.model.PrivateLeaderboard;
import mygroup.tqbcbackend.payload.request.AnswerPostRequest;
import mygroup.tqbcbackend.payload.request.AnswerRequest;
import mygroup.tqbcbackend.repository.AnswerRepository;
import mygroup.tqbcbackend.repository.AnswerTypeRepository;
import mygroup.tqbcbackend.repository.PeriodPredictionRepository;
import mygroup.tqbcbackend.repository.PlayerRepository;
import mygroup.tqbcbackend.repository.PrivateLeaderboardMemberRepository;
import mygroup.tqbcbackend.repository.PrivateLeaderboardRepository;
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

    @Autowired
    private PrivateLeaderboardMemberRepository privateLeaderboardMemberRepository;

    @Autowired
    private PeriodPredictionRepository periodPredictionRepository;

    @Autowired
    private PrivateLeaderboardRepository privateLeaderboardRepository;

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
    @PostMapping("/post-team-answertype-answers")
    public ResponseEntity<?> postTeamAnswerTypeAnswers(
        @Valid @RequestBody AnswerPostRequest answerPostRequest
    ) {
        long teamID = answerPostRequest.getTeamID();
        long answerTypeID = answerPostRequest.getAnswerTypeID();
        // Remove the current answers for the team/answer type combo
        // int abc = answerRepository.deleteByTeam_TeamIDAndAnswerType_AnswerTypeID(teamID, answerTypeID);
        List<Answer> oldAnswers = answerRepository.findByTeam_TeamIDAndAnswerType_AnswerTypeID(teamID, answerTypeID);
        answerRepository.deleteAll(oldAnswers);
        // Add the new answers
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
        return ResponseEntity.ok().build();
    }

    @GetMapping("/get-max-season-for-answers")
    public long getMaxSeasonForAnswers() {
        return answerRepository.findMaxSeason();
    }

    @GetMapping("/get-unique-seasons-for-answers")
    public List<Long> getUniqueSeasonsForAnswers(
        AnswerRequest answerRequest
    ) {
        List<Long> uniqueSeasons;
        if (answerRequest.getGlobal()) {
            uniqueSeasons = answerRepository.findUniqueSeasons();
        } else {
            PrivateLeaderboard privateLeaderboard = privateLeaderboardRepository.findByPrivateLeaderboardUUID(
                answerRequest.getPrivateLeaderboardUUID()
            );
            List<Long> userIDs = privateLeaderboardMemberRepository.getPrivateLeaderboardMemberUserIDs(
                privateLeaderboard
            );
            uniqueSeasons = periodPredictionRepository.findDistinctSeasonsForUsers(userIDs);
            // // Add the season we're currently making predictions about
            // long currentSeason = answerRepository.findMaxSeason() + 1;
            // uniqueSeasons.add(currentSeason);
        }                        
        return uniqueSeasons;
    }
}
