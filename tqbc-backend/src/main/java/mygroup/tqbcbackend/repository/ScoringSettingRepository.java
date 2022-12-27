package mygroup.tqbcbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import mygroup.tqbcbackend.model.ScoringSetting;

public interface ScoringSettingRepository extends JpaRepository<ScoringSetting,String> {
    
    @Query(
        value = "" +
        "SELECT			ss.ScoringSettingID \n" +
        "FROM			scoringsettings ss \n" +
        "INNER JOIN		scoringsettingvalues ssv1 \n" +
        "    ON			ss.ScoringSettingID = ssv1.ScoringSettingID \n" +
        "        AND		ssv1.SeasonPeriodID = 1 \n" +
        "        AND		ssv1.Numerator = :num1 \n" +
        "        AND		ssv1.Denominator = :den1 \n" +
        "INNER JOIN		scoringsettingvalues ssv2 \n" +
        "    ON			ss.ScoringSettingID = ssv2.ScoringSettingID \n" +
        "        AND		ssv2.SeasonPeriodID = 2 \n" +
        "        AND		ssv2.Numerator = :num2 \n" +
        "        AND		ssv2.Denominator = :den2 \n" +
        "INNER JOIN		scoringsettingvalues ssv3 \n" +
        "    ON			ss.ScoringSettingID = ssv3.ScoringSettingID \n" +
        "        AND		ssv3.SeasonPeriodID = 3 \n" +
        "        AND		ssv3.Numerator = :num3 \n" +
        "        AND		ssv3.Denominator = :den3 \n" +
        "INNER JOIN		scoringsettingvalues ssv4 \n" +
        "    ON			ss.ScoringSettingID = ssv4.ScoringSettingID \n" +
        "        AND		ssv4.SeasonPeriodID = 4 \n" +
        "        AND		ssv4.Numerator = :num4 \n" +
        "        AND		ssv4.Denominator = :den4 \n",
        nativeQuery = true
    )
    public List<Long> findByScoringSettingWeightings(
        @Param("num1") Integer num1,
        @Param("den1") Integer den1,
        @Param("num2") Integer num2,
        @Param("den2") Integer den2,
        @Param("num3") Integer num3,
        @Param("den3") Integer den3,
        @Param("num4") Integer num4,
        @Param("den4") Integer den4
    );

    public ScoringSetting findByScoringSettingID(long scoringSettingID);
}
