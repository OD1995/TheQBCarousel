package mygroup.tqbcbackend.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import mygroup.tqbcbackend.dto.UsersByPredictionPeriod;
import mygroup.tqbcbackend.dto.TeamOrPlayerAndCount;
import mygroup.tqbcbackend.model.PeriodPrediction;
import mygroup.tqbcbackend.model.PredictionPeriod;
import mygroup.tqbcbackend.model.User;

public interface PeriodPredictionRepository extends JpaRepository<PeriodPrediction, Long> {

	@EntityGraph(attributePaths = {"player","team","team.defaultPlayer"})
	public List<PeriodPrediction> findByUserAndPredictionPeriod(User user, PredictionPeriod predictionPeriod);
	
	@EntityGraph(attributePaths = {"player", "team","team.defaultPlayer"})
	public List<PeriodPrediction> findByPredictionPeriod_Season(long season);
		
	@Query(
		value = "SELECT MAX(PredictionPeriodID) FROM periodpredictions WHERE UserID = ?1",
		nativeQuery = true
	)
	public long findMaxPredictionPeriodID(long userID);
	
	@Query(
		value = "SELECT max(pp.predictionPeriod.season) FROM PeriodPrediction pp WHERE pp.user.userID = ?1"
	)
	public long findMaxSeason(long userID);
	
	@EntityGraph(attributePaths = {"player", "team", "team.defaultPlayer"})
	public List<PeriodPrediction> findByPredictionPeriod_SeasonAndUser(long season, User user);

	@Query(
		value = "SELECT DISTINCT pp.predictionPeriod.season FROM PeriodPrediction pp WHERE pp.user.userID = ?1"
	)
	public List<Long> findDistinctSeasons(long userID);

	@Query(
		value = "SELECT DISTINCT pp.predictionPeriod.season FROM PeriodPrediction pp WHERE pp.user.userID IN (:userIDs)"
	)
	public List<Long> findDistinctSeasonsForUsers(List<Long> userIDs);

	@Query(
		value = "SELECT		predictionPeriodID, \n" +
				"           COUNT(DISTINCT userID) AS distinctUsers \n" +
				"FROM       periodpredictions pp \n" +
				"GROUP BY   pp.predictionPeriodID \n" +
				"ORDER BY   pp.predictionPeriodID ASC",
		nativeQuery = true
	)
	public List<UsersByPredictionPeriod> getUsersByPredictionPeriod();

	@Query(
		value = "SELECT 		COUNT(DISTINCT userID) AS userCount \n" +
				"FROM 			periodpredictions pp \n" +
				"LEFT JOIN      predictionperiods prpe \n" +
				"	ON			pp.PredictionPeriodID = prpe.PredictionPeriodID \n" +
				"WHERE			prpe.season = ?1 \n" +
				"	AND			prpe.seasonPeriodID = ?2 \n" +
				"GROUP BY 		pp.predictionPeriodID \n" +
				"ORDER BY 		pp.predictionPeriodID ASC",
		nativeQuery = true
	)
	public Integer getUserCountForPredictionPeriod(long season, long seasonPeriodID);

	@Query(
		value = "SELECT       COUNT(DISTINCT pp.userID) AS userCount \n" +
		"        FROM           periodpredictions pp \n" +
		"        LEFT JOIN      predictionperiods prpe \n" +
		"           ON          pp.PredictionPeriodID = prpe.PredictionPeriodID \n" +
		"        LEFT JOIN      privateleaderboardmembers plm \n" +
		"           ON          plm.UserID = pp.UserID \n" +
		"        LEFT JOIN      privateleaderboards pl \n" +
		"           ON          plm.PrivateLeaderboardID = pl.PrivateLeaderboardID \n" +
		"        WHERE          prpe.season = ?1 \n" +
		"           AND         prpe.seasonPeriodID = ?2 \n" +
		"           AND         pl.PrivateLeaderboardUUID = ?3 \n" +
		"        GROUP BY       pp.predictionPeriodID \n" +
		"        ORDER BY       pp.predictionPeriodID ASC",				
		nativeQuery = true
	)
	public Integer getUserCountForPredictionPeriodWithinPrivateLeaderboard(
		long season,
		long seasonPeriodID,
		String privateLeaderboardUUID	
	);

	@Query(
		value = "SELECT			p.Name, \n" +
				"				COUNT(*) as PredictionCount \n" +
				"FROM 			periodpredictions pepr \n" +
				"LEFT JOIN 		predictionperiods prpe \n" +
				"	ON			prpe.PredictionPeriodID = pepr.PredictionPeriodID \n" +
				"LEFT JOIN 		players p \n" +
				"	ON			p.PlayerID = pepr.PlayerID \n" +
				"LEFT JOIN 		teams t \n" +
				"	ON			t.TeamID = pepr.TeamID \n" +
				"LEFT JOIN		franchises f \n" +
				"	ON			f.FranchiseID = t.FranchiseID \n" +
				"WHERE			prpe.Season = ?1 \n" +
				"	AND			prpe.SeasonPeriodID = ?2 \n" +
				"	AND			f.FranchiseID = ?3 \n" +
				"GROUP BY		p.Name \n" +
				"ORDER BY		PredictionCount DESC",
		nativeQuery = true
	)
	public List<TeamOrPlayerAndCount> getPlayersAndCounts(
		long season,
		long seasonPeriodID,
		long franchiseID
	);

	@Query(
		value = "SELECT           p.Name, \n" +
		"                       COUNT(*) as PredictionCount \n" +
		"        FROM           periodpredictions pepr \n" +
		"        LEFT JOIN      predictionperiods prpe \n" +
		"           ON          prpe.PredictionPeriodID = pepr.PredictionPeriodID \n" +
		"        LEFT JOIN      players p \n" +
		"           ON          p.PlayerID = pepr.PlayerID \n" +
		"        LEFT JOIN      teams t \n" +
		"           ON          t.TeamID = pepr.TeamID \n" +
		"        LEFT JOIN      franchises f \n" +
		"           ON          f.FranchiseID = t.FranchiseID \n" +
		"        LEFT JOIN      privateleaderboardmembers plm \n" +
		"           ON          plm.UserID = pepr.UserID \n" +
		"        LEFT JOIN      privateleaderboards pl \n" +
		"           ON          plm.PrivateLeaderboardID = pl.PrivateLeaderboardID \n" +
		"        WHERE          prpe.Season = ?1 \n" +
		"           AND         prpe.SeasonPeriodID = ?2 \n" +
		"           AND         f.FranchiseID = ?3 \n" +
		"           AND         pl.PrivateLeaderboardUUID = ?4 \n" +
		"        GROUP BY       p.Name \n" +
		"        ORDER BY       PredictionCount DESC",
		nativeQuery = true		
	)
	public List<TeamOrPlayerAndCount> getPlayersAndCountsWithinPrivateLeaderboard(
		long season,
		long seasonPeriodID,
		long franchiseID,
		String privateLeaderboardUUID
	);

	@Query(
		value = "SELECT			t.Nickname as Name, \n" +
				"				COUNT(*) as PredictionCount \n" +
				"FROM 			periodpredictions pepr \n" +
				"LEFT JOIN 		predictionperiods prpe \n" +
				"	ON			prpe.PredictionPeriodID = pepr.PredictionPeriodID \n" +
				"LEFT JOIN 		players p \n" +
				"	ON			p.PlayerID = pepr.PlayerID \n" +
				"LEFT JOIN 		teams t \n" +
				"	ON			t.TeamID = pepr.TeamID \n" +
				"WHERE			prpe.Season = ?1 \n" +
				"	AND			prpe.SeasonPeriodID = ?2 \n" +
				"	AND			p.PlayerID = ?3 \n" +
				"GROUP BY		t.Nickname \n" +
				"ORDER BY		PredictionCount DESC \n",
		nativeQuery = true
	)
	public List<TeamOrPlayerAndCount> getTeamsAndCounts(
		long season,
		long seasonPeriodID,
		long playerID
	);

	@Query(
		value = "SELECT			t.Nickname as Name, \n" +
				"				COUNT(*) as PredictionCount \n" +
				"FROM 			periodpredictions pepr \n" +
				"LEFT JOIN 		predictionperiods prpe \n" +
				"	ON			prpe.PredictionPeriodID = pepr.PredictionPeriodID \n" +
				"LEFT JOIN 		players p \n" +
				"	ON			p.PlayerID = pepr.PlayerID \n" +
				"LEFT JOIN 		teams t \n" +
				"	ON			t.TeamID = pepr.TeamID \n" +
				"LEFT JOIN 		privateleaderboardmembers plm \n" +
				"	ON			plm.UserID = pepr.UserID \n" +
				"LEFT JOIN 		privateleaderboards pl \n" +
				"	ON			plm.PrivateLeaderboardID = pl.PrivateLeaderboardID \n" +
				"WHERE			prpe.Season = ?1 \n" +
				"	AND			prpe.SeasonPeriodID = ?2 \n" +
				"	AND			p.PlayerID = ?3 \n" +
				"	AND			pl.PrivateLeaderboardUUID = ?4 \n" +
				"GROUP BY		t.Nickname \n" +
				"ORDER BY		PredictionCount DESC",
		nativeQuery = true
	)
	public List<TeamOrPlayerAndCount> getTeamsAndCountsWithinPrivateLeaderboard(
		long season,
		long seasonPeriodID,
		long playerID,
		String privateLeaderboardID
	);

	@Transactional
	@Modifying
	@Query(
		value = ":updateString",
		nativeQuery = true
	)
	public int hackyUpdate(String updateString);

}
