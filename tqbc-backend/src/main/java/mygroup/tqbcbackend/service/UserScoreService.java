package mygroup.tqbcbackend.service;

import java.time.Period;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.IntStream;

import javax.transaction.Transactional;

import org.hibernate.annotations.Where;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;

import mygroup.tqbcbackend.controller.TeamController;
import mygroup.tqbcbackend.dto.LeaderboardRow;
import mygroup.tqbcbackend.model.Answer;
import mygroup.tqbcbackend.model.PeriodPrediction;
import mygroup.tqbcbackend.model.Player;
import mygroup.tqbcbackend.model.UserScore;
import mygroup.tqbcbackend.model.UserScoreCompositeKey;
import mygroup.tqbcbackend.repository.AnswerRepository;
import mygroup.tqbcbackend.repository.DatabaseOperations;
import mygroup.tqbcbackend.repository.PeriodPredictionRepository;
import mygroup.tqbcbackend.repository.UserRepository;
import mygroup.tqbcbackend.repository.UserScoreRepository;

@Service
@Transactional
public class UserScoreService {

    @Autowired
    PeriodPredictionRepository periodPredictionRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    AnswerRepository answerRepository;

    @Autowired
    UserScoreRepository userScoreRepository;

    @Autowired
    DatabaseOperations databaseOperations;

    private static final Logger logger = LoggerFactory.getLogger(TeamController.class);

    public void calculateUserScoreForPredictionPeriodsInSeasonForAllUsers(
        long season
    ) {
        // Get answers for season
        List<Answer> answers = answerRepository.findByTeam_Season(season);
        if (answers.size() == 0) {
            throw new RuntimeException("No answers in db for " + season);
        }
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
        // List<PeriodPrediction> periodPredictions2 = new ArrayList<PeriodPrediction>();
        int ct = 0;
        List<Boolean> isCorrects1 = new ArrayList<Boolean>();
        List<Long> predictionPeriodIDs = new ArrayList<Long>();
        List<Long> teamIDs = new ArrayList<Long>();
        List<Long> userIDs = new ArrayList<Long>();
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
            // periodPredictionRepository.saveAndFlush(periodPrediction);
            // periodPredictions2.add(periodPrediction);
            isCorrects1.add(isCorrect);
            predictionPeriodIDs.add(predictionPeriodID);
            teamIDs.add(teamID);
            userIDs.add(userID);
            // if (ct >= 10) {
            //     break;
            // }
            // ct ++;
        }
        String updateString = this.getUpdatePeriodPredictionsString(
            isCorrects1,
            predictionPeriodIDs,
            teamIDs,
            userIDs
        );
        databaseOperations.runInsertOrUpdateStatement(updateString);
        // String updateString = "SELECT 1;";
        // periodPredictionRepository.hackyUpdate(updateString);
        // periodPredictionRepository.saveAll(periodPredictions2);
        // List<List<PeriodPrediction>> periodPredictionBlocks = Lists.partition(periodPredictions, 20);
        // int i = 0;
        // for (List<PeriodPrediction> periodPredictionBlock : periodPredictionBlocks) {
        //     periodPredictionRepository.saveAllAndFlush(periodPredictionBlock);
        //     i ++;
        //     logger.info("Block done: " + i);
        // }
        // Loop through correctsMap and generate equally weighted season-long scores, 
        //     with missing periods marked as 0
        List<String> ppIDs = new ArrayList<>();
        Long firstPeriodPredictionID = 1 + ((season - 2023) * 4);
        for (int n = 0; n < 4; n++) {
            // Long a = firstPeriodPredictionID + n;
            // String b = Long.toString(a) ;
            // ppIDs.add(b);
            ppIDs.add(Long.toString(firstPeriodPredictionID + n));
        }
        Long seasonPredictionPeriodID = Long.parseLong(String.join("",ppIDs));
        // List<UserScore> userScores = new ArrayList<>();
        Integer seasonDivider = season == 2023 ? 3 : 4;
        List<Long> compKeyUserIDs = new ArrayList<>();
        List<Long> compKeyPeriodPredictionIDs = new ArrayList<>();
        List<Float> scores = new ArrayList<>();
        for (Long userID : correctsMap.keySet()) {
            Float totalScore = 0.0f;
            // String seasonPredictionPeriodIDString = "";
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
                // UserScoreCompositeKey userScoreCompositeKey = new UserScoreCompositeKey(
                //     ppID,
                //     userID
                // );
                // UserScore userScore = new UserScore(
                //     userScoreCompositeKey,
                //     score
                // );
                // userScores.add(userScore);
                compKeyPeriodPredictionIDs.add(ppID);
                compKeyUserIDs.add(userID);
                scores.add(score);
                totalScore += score;
                // seasonPredictionPeriodIDString += ppID;
            }
            Float seasonScore = totalScore / seasonDivider;
            // Long seasonPredictionPeriodID = Long.parseLong(seasonPredictionPeriodIDString);
            compKeyPeriodPredictionIDs.add(seasonPredictionPeriodID);
            compKeyUserIDs.add(userID);
            scores.add(seasonScore);
            // UserScoreCompositeKey seasonUSCK = new UserScoreCompositeKey(
            //     seasonPredictionPeriodID,
            //     userID
            // );
            // UserScore seasonUS = new UserScore(
            //     seasonUSCK,
            //     seasonScore
            // );
            // userScores.add(seasonUS);
        }
        // userScoreRepository.saveAll(userScores);
        String insertString = this.getInsertUserScoreValuesString(
            compKeyUserIDs,
            compKeyPeriodPredictionIDs,
            scores
        );
        databaseOperations.runInsertOrUpdateStatement(insertString);
    }

    private String getInsertUserScoreValuesString(
        List<Long> compKeyUserIDs,
        List<Long> compKeyPeriodPredictionIDs,
        List<Float> scores
    ) {
        String start = "INSERT INTO userscores (PredictionPeriodID,UserID,Score) VALUES ";
        List<String> values = new ArrayList<>();
        for (int n = 0; n < compKeyUserIDs.size(); n++) {
            values.add(
                // "(" + com)"
                String.format(
                    "(%s,%s,%s)",
                    compKeyPeriodPredictionIDs.get(n),
                    compKeyUserIDs.get(n),
                    scores.get(n)
                )
            );
        }
        return (
            start +
            String.join(",\n",values) +
            "\nON DUPLICATE KEY UPDATE " + 
            "PredictionPeriodID = values(PredictionPeriodID), UserID = values(UserID), Score = values(Score)"
        );
    }

    private String getUpdatePeriodPredictionsString(
        List<Boolean> isCorrects,
        List<Long> predictionPeriodIDs,
        List<Long> teamIDs,
        List<Long> userIDs
    ) {
        List<String> whenList = new ArrayList<String>();
        List<String> whereList = new ArrayList<String>();
        String start = "UPDATE periodpredictions SET IsCorrect = CASE";
        for (int n = 0; n < isCorrects.size(); n++) {
            String ic = isCorrects.get(n) ? "1" : "0";
            String pp = "PredictionPeriodID = " + predictionPeriodIDs.get(n).toString();
            String t = "TeamID = " + teamIDs.get(n).toString();
            String u = "UserID = " + userIDs.get(n).toString();
            String together = pp + " AND " + t + " AND " + u; 
            whenList.add(
                "\n WHEN " + together + " THEN " + ic
            );
            whereList.add(
                "(" + together + ")"
            );
        }
        return (
            start + 
            String.join("", whenList) + 
            " END WHERE " + String.join("\n OR", whereList)
        );
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

    public Float getRelevantScore(
        LeaderboardRow leaderboardRow,
        boolean useSeasonScore,
        Long spID
    ) {
        Float score;
        if (useSeasonScore) {
            score = leaderboardRow.getSeasonScore();
        } else {
            score = leaderboardRow.getSeasonPeriodScores().get(spID);
        }
        return Optional.ofNullable(score).orElse(-1.00f);
    }
    
}
