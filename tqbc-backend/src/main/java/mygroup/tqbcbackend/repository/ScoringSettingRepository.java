package mygroup.tqbcbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.method.P;

import mygroup.tqbcbackend.model.ScoringSetting;

public interface ScoringSettingRepository extends JpaRepository<ScoringSetting,String> {
    
    @Query(
        value = "" +
        "SELECT			ss.ScoringSettingID" +
        "FROM			scoringsettings ss" +
        "INNER JOIN		scoringsettingvalues ssv1" +
        "    ON			ss.ScoringSettingID = ssv1.ScoringSettingID" +
        "        AND		ssv1.ScoringPeriodID = 1" +
        "        AND		ssv1.Numerator = :num1" +
        "        AND		ssv1.Denominator = :den1" +
        "INNER JOIN		scoringsettingvalues ssv2" +
        "    ON			ss.ScoringSettingID = ssv2.ScoringSettingID" +
        "        AND		ssv2.ScoringPeriodID = 2" +
        "        AND		ssv2.Numerator = :num2" +
        "        AND		ssv2.Denominator = :den2" +
        "INNER JOIN		scoringsettingvalues ssv3" +
        "    ON			ss.ScoringSettingID = ssv3.ScoringSettingID" +
        "        AND		ssv3.ScoringPeriodID = 3" +
        "        AND		ssv3.Numerator = :num3" +
        "        AND		ssv3.Denominator = :den3" +
        "INNER JOIN		scoringsettingvalues ssv4" +
        "    ON			ss.ScoringSettingID = ssv4.ScoringSettingID" +
        "        AND		ssv4.ScoringPeriodID = 4" +
        "        AND		ssv4.Numerator = :num4" +
        "        AND		ssv4.Denominator = :den4",
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
