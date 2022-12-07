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
import mygroup.tqbcbackend.model.UserScore;
import mygroup.tqbcbackend.model.UserScoreCompositeKey;
import mygroup.tqbcbackend.repository.AnswerRepository;
import mygroup.tqbcbackend.repository.PeriodPredictionRepository;
import mygroup.tqbcbackend.repository.UserRepository;
import mygroup.tqbcbackend.repository.UserScoreRepository;

@Service
public class UserScoreService {

    @Autowired
    PeriodPredictionRepository periodPredictionRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    AnswerRepository answerRepository;

    @Autowired
    UserScoreRepository userScoreRepository;

    public void calculateUserScoreForPredictionPeriodsInSeasonForAllUsers(
        long season
    ) {
        // Get answers for season
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
        // Get all predictions for the season
        List<PeriodPrediction> periodPredictions = periodPredictionRepository.findByPredictionPeriod_Season(season);

        // Create map
        //      key - userID
        //      value - 
        //            key - predictionPeriodID
        //            value - list of (32) bools, indicating prediction results
        Map<Long, HashMap<Long, List<Boolean>>> correctsMap = new HashMap<Long, HashMap<Long, List<Boolean>>>();
        for (PeriodPrediction periodPrediction : periodPredictions) {
            long teamID = periodPrediction.getTeam().getTeamID();
            Player player = periodPrediction.getPlayer();
            Boolean isCorrect = teamIDPlayerArrayMap.get(teamID).contains(player);
            periodPrediction.setCorrect(isCorrect);
            Long predictionPeriodID = periodPrediction.getPeriodPredictionCompositeKey().getPredictionPeriodID();
            Long userID = periodPrediction.getPeriodPredictionCompositeKey().getUserID();
            if (correctsMap.containsKey(userID)) {
                if (correctsMap.get(userID).containsKey(predictionPeriodID)) {
                    correctsMap.get(userID).get(predictionPeriodID).add(isCorrect);
                } else {
                    List<Boolean> isCorrectList = new ArrayList<>();
                    isCorrectList.add(isCorrect);
                    correctsMap.get(userID).put(predictionPeriodID,isCorrectList);
                }
            } else {
                HashMap<Long, List<Boolean>> predictionPeriodIDIsCorrectArrayMap = new HashMap<Long, List<Boolean>>();
                List<Boolean> isCorrectList = new ArrayList<>();
                isCorrectList.add(isCorrect);
                predictionPeriodIDIsCorrectArrayMap.put(predictionPeriodID,isCorrectList);
                correctsMap.put(userID,predictionPeriodIDIsCorrectArrayMap);
            }
        }
        periodPredictionRepository.saveAll(periodPredictions);
        // Loop through correctsMap and generate equally weighted season-long scores, with missing periods marked as 0
        List<UserScore> userScores = new ArrayList<>();
        for (Long userID : correctsMap.keySet()) {
            Float totalScore = 0.0f;
            String seasonPredictionPeriodIDString = "";
            for (Long ppID : correctsMap.get(userID).keySet()) {
                Integer ppCorrects = 0;
                Integer ppTotalAttempts = 0;
                List<Boolean> isCorrects = correctsMap.get(userID).get(ppID);
                for (Boolean isCorrect : isCorrects) {
                    ppTotalAttempts += 1;
                    if (isCorrect) {
                        ppCorrects += 1;
                    }
                }
                Float ppCorrectsFloat = (float) ppCorrects;
                Float ppTotalAttemptsFloat = (float) ppTotalAttempts;
                Float score = ppCorrectsFloat / ppTotalAttemptsFloat;
                UserScoreCompositeKey userScoreCompositeKey = new UserScoreCompositeKey(
                    ppID,
                    userID
                );
                UserScore userScore = new UserScore(
                    userScoreCompositeKey,
                    score
                );
                userScores.add(userScore);
                totalScore += score;
                seasonPredictionPeriodIDString += ppID;
            }
            Float seasonScore = totalScore / 4;
            Long seasonPredictionPeriodID = Long.parseLong(seasonPredictionPeriodIDString);
            UserScoreCompositeKey seasonUSCK = new UserScoreCompositeKey(
                seasonPredictionPeriodID,
                userID
            );
            UserScore seasonUS = new UserScore(
                seasonUSCK,
                seasonScore
            );
            userScores.add(seasonUS);
        }
        userScoreRepository.saveAll(userScores);
    }

    public Map<Long, Float> calculateUserScoreForPredictionPeriodsInSeasonForUser(
        long userID,
        long season,
        Map<Long, List<Player>> teamIDPlayerArrayMap
    ) {
        // Get predictions for given season and user
        List<PeriodPrediction> periodPredictions = periodPredictionRepository.findByPredictionPeriod_SeasonAndUser(
            season,
            userRepository.findByUserID(userID)
        );        
        // Create map
        //      key - predictionPeriodID
        //      value - list of (32) bools, indicating prediction results
        Map<Long, List<Boolean>> predictionPeriodIDIsCorrectArrayMap = new HashMap<Long, List<Boolean>>();
        for (PeriodPrediction periodPrediction : periodPredictions) {
            long teamID = periodPrediction.getTeam().getTeamID();
            Player player = periodPrediction.getPlayer();
            Boolean isCorrect = teamIDPlayerArrayMap.get(teamID).contains(player);
            periodPrediction.setCorrect(isCorrect);
            Long predictionPeriodID = periodPrediction.getPeriodPredictionCompositeKey().getPredictionPeriodID();
            if (predictionPeriodIDIsCorrectArrayMap.containsKey(predictionPeriodID)) {
                predictionPeriodIDIsCorrectArrayMap.get(predictionPeriodID).add(isCorrect);
            } else {
                List<Boolean> isCorrectList = new ArrayList<>();
                isCorrectList.add(isCorrect);
                predictionPeriodIDIsCorrectArrayMap.put(
                    predictionPeriodID,
                    isCorrectList
                );
            }
        }
        periodPredictionRepository.saveAll(periodPredictions);
        
        Map<Long, Float> scoresByPredictionPeriod = new HashMap<Long,Float>();

        List<UserScore> userScores = new ArrayList<>();
        for (Long ppID : predictionPeriodIDIsCorrectArrayMap.keySet()) {
            Integer ppCorrects = 0;
            Integer ppTotalAttempts = 0;
            List<Boolean> isCorrects = predictionPeriodIDIsCorrectArrayMap.get(ppID);
            for (Boolean isCorrect : isCorrects) {
                ppTotalAttempts += 1;
                if (isCorrect) {
                    ppCorrects += 1;
                }
            }
            Float ppCorrectsFloat = (float) ppCorrects;
            Float ppTotalAttemptsFloat = (float) ppTotalAttempts;
            Float score = ppCorrectsFloat / ppTotalAttemptsFloat;
            scoresByPredictionPeriod.put(
                ppID,
                score
            );
            UserScoreCompositeKey userScoreCompositeKey = new UserScoreCompositeKey(
                ppID,
                userID
            );
            UserScore userScore = new UserScore(
                userScoreCompositeKey,
                score
            );
            userScores.add(userScore);
        }
        userScoreRepository.saveAll(userScores);
        return scoresByPredictionPeriod;
    }
    
}
