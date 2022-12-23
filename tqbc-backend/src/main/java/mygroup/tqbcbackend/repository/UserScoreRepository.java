package mygroup.tqbcbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import mygroup.tqbcbackend.model.UserScore;

public interface UserScoreRepository extends JpaRepository<UserScore,String> {
    
public List<UserScore> findByUser_UserIDAndPredictionPeriod_Season(Long userID, Long season);

    public List<UserScore> findByPredictionPeriod_Season(Long season);

    @Query(
		value = "SELECT count(distinct(us.user)) FROM UserScore us WHERE us.predictionPeriod.season = ?1"
	)
	public long findUniqueUsersForSeason(long season);

	@Query(
		value = "" +
		"SELECT				COUNT(DISTINCT(us.UserID)) \n" +
		"FROM				userscores us \n" +
		"INNER JOIN			privateleaderboardmembers plm \n" +
		"	ON				us.UserID = plm.UserID \n" +
		"		AND			plm.PrivateLeaderboardID = :privateLeaderboardID \n" +
		"INNER JOIN			predictionperiods pp \n" +
		"	ON				pp.PredictionPeriodID = us.PredictionPeriodID \n" +
		"		AND			pp.Season = :season \n",
		nativeQuery = true
	)
	public long findUniqueUsersForPrivateLeaderboardSeason(
		@Param("privateLeaderboardID") long privateLeaderboardID,
		@Param("season") long season
	);

	@Query(
		value = "" +
		"SELECT				us.* \n" +
		"FROM				userscores us \n" +
		"INNER JOIN			privateleaderboardmembers plm \n" +
		"	ON				us.UserID = plm.UserID \n" +
		"		AND			plm.PrivateLeaderboardID = :privateLeaderboardID \n" +
		"INNER JOIN			predictionperiods pp \n" +
		"	ON				pp.PredictionPeriodID = us.PredictionPeriodID \n" +
		"		AND			pp.Season = :season \n",
		nativeQuery = true
	)
	public List<UserScore> findByPrivateLeaderboardIDAndSeason(
		@Param("privateLeaderboardID") long privateLeaderboardID,
		@Param("season") long season
	);
}
