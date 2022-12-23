package mygroup.tqbcbackend.service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.IntStream;

import org.springframework.beans.factory.annotation.Autowired;

import mygroup.tqbcbackend.model.ScoringSetting;
import mygroup.tqbcbackend.model.ScoringSettingValue;
import mygroup.tqbcbackend.model.ScoringSettingValueCompositeKey;
import mygroup.tqbcbackend.repository.ScoringSettingRepository;
import mygroup.tqbcbackend.repository.ScoringSettingValueRepository;

public class ScoringSettingService {

    @Autowired
    private ScoringSettingRepository scoringSettingRepository;

    @Autowired
    private ScoringSettingValueRepository scoringSettingValueRepository;
    
    public ScoringSetting getScoringSetting(
        Map<Integer,Map<String,Integer>> weightings
    ) {
        // See if scoring setting already exists
        List<Long> scoringSettingIDs = scoringSettingRepository.findByScoringSettingWeightings(
            weightings.get(1).get("numerator"),
            weightings.get(1).get("denominator"),
            weightings.get(2).get("numerator"),
            weightings.get(2).get("denominator"),
            weightings.get(3).get("numerator"),
            weightings.get(3).get("denominator"),
            weightings.get(4).get("numerator"),
            weightings.get(4).get("denominator")
        );
        ScoringSetting scoringSetting;
        if (scoringSettingIDs.size() == 0) {
            // Scoring setting doesn't exist, create a new one
            scoringSetting = new ScoringSetting(
                new Date()
            );
            scoringSettingRepository.saveAndFlush(scoringSetting);
            Long scoringSettingID = scoringSetting.getScoringSettingID();
            IntStream.range(1,4).forEachOrdered(scoringPeriodID -> {
                ScoringSettingValueCompositeKey scoringSettingValueCompositeKey = new ScoringSettingValueCompositeKey(
                    scoringSettingID,
                    scoringPeriodID
                );
                Integer numerator = weightings.get(scoringPeriodID).get("numerator");
                Integer denominator = weightings.get(scoringPeriodID).get("denominator");
                ScoringSettingValue scoringSettingValue = new ScoringSettingValue(
                    scoringSettingValueCompositeKey,
                    numerator, 
                    denominator,
                    (float) numerator / (float) denominator
                );
                scoringSettingValueRepository.save(scoringSettingValue);
            });
        } else if (scoringSettingIDs.size() == 1) {
            Long scoringSettingID = scoringSettingIDs.get(0);
            scoringSetting = scoringSettingRepository.findByScoringSettingID(scoringSettingID);
        } else {
            throw new RuntimeException("Multiple ScoringSettings have the same weightings...");
        }
        return scoringSetting;
    }
}
