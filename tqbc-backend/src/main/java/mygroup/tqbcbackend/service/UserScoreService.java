package mygroup.tqbcbackend.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mygroup.tqbcbackend.model.Answer;
import mygroup.tqbcbackend.model.PeriodPrediction;
import mygroup.tqbcbackend.model.Player;
import mygroup.tqbcbackend.repository.AnswerRepository;
import mygroup.tqbcbackend.repository.PeriodPredictionRepository;
import mygroup.tqbcbackend.repository.UserRepository;

@Service
public class UserScoreService {

    @Autowired
    PeriodPredictionRepository periodPredictionRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    AnswerRepository answerRepository;

    public void calculateUserScoreForPredictionPeriodsInSeason(
        long userID,
        long season
    ) {
        // Get predictions for given season and user
        List<PeriodPrediction> periodPredictions = periodPredictionRepository.findByPredictionPeriod_SeasonAndUser(
            season,
            userRepository.findByUserID(userID)
        );
        // Get answers for given season
        List<Answer> answers = answerRepository.findByTeam_Season(season);
        // Convert to map with key: teamID, value: array of players
        Map<Long, List<Player>> teamIDPlayerArrayMap = new HashMap<Long, List<Player>>();
        for (Answer answer : answers) {
            long teamID = answer.getTeam().getTeamID();
            Player player = answer.getPlayer();
            if (teamIDPlayerArrayMap.containsKey(teamID)) {
                teamIDPlayerArrayMap.get(teamID).add(player);
            } else {
                List<Player> playerList = new ArrayList<>();
                playerList.add(player);
                teamIDPlayerArrayMap.put(
                        teamID,
                        playerList
                );
            }
        }

        for (PeriodPrediction periodPrediction : periodPredictions) {
            long teamID = periodPrediction.getTeam().getTeamID();
            Player player = periodPrediction.getPlayer();
            periodPrediction.setCorrect(
                    teamIDPlayerArrayMap.get(teamID).contains(player)
            );
        }

        periodPredictionRepository.saveAll(periodPredictions);

        // return teamIDPlayerArrayMap;
    }
    
}
