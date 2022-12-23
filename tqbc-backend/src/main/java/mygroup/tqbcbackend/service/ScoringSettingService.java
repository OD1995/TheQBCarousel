package mygroup.tqbcbackend.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.IntStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mygroup.tqbcbackend.model.ScoringSetting;
import mygroup.tqbcbackend.model.ScoringSettingValue;
import mygroup.tqbcbackend.model.ScoringSettingValueCompositeKey;
import mygroup.tqbcbackend.repository.ScoringSettingRepository;
import mygroup.tqbcbackend.repository.ScoringSettingValueRepository;

@Service
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
            IntStream.range(1,5).forEachOrdered(seasonPeriodID -> {
                ScoringSettingValueCompositeKey scoringSettingValueCompositeKey = new ScoringSettingValueCompositeKey(
                    scoringSettingID,
                    seasonPeriodID
                );
                Integer numerator = weightings.get(seasonPeriodID).get("numerator");
                Integer denominator = weightings.get(seasonPeriodID).get("denominator");
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

    public HashMap<Long,HashMap<String,Integer>> getScoringSettingValuesHashMap(
        ScoringSetting scoringSetting
    ) {
        List<ScoringSettingValue> scoringSettingValues = scoringSetting.getScoringSettingValues();
        HashMap<Long,HashMap<String,Integer>> returnMe = new HashMap<Long,HashMap<String,Integer>>();

        for (ScoringSettingValue scoringSettingValue : scoringSettingValues) {
            HashMap<String,Integer> hm = new HashMap<String,Integer>();
            hm.put("numerator",scoringSettingValue.getNumerator());
            hm.put("denominator",scoringSettingValue.getDenominator());
            returnMe.put(
                scoringSettingValue.getScoringSettingValueCompositeKey().getSeasonPeriodID(),
                hm
            );
        }

        return returnMe;
    }
}
