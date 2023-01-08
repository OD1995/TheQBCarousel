package mygroup.tqbcbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import mygroup.tqbcbackend.dto.UsersByPredictionPeriod;
import mygroup.tqbcbackend.model.PeriodPrediction;
import mygroup.tqbcbackend.model.PredictionPeriod;
import mygroup.tqbcbackend.model.User;

public interface PeriodPredictionRepository extends JpaRepository<PeriodPrediction, Long> {

	@EntityGraph(attributePaths = {"player","team"})
	public List<PeriodPrediction> findByUserAndPredictionPeriod(User user, PredictionPeriod predictionPeriod);
	
	@EntityGraph(attributePaths = {"player", "team"})
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
	
	@EntityGraph(attributePaths = {"player", "team"})
	public List<PeriodPrediction> findByPredictionPeriod_SeasonAndUser(long season, User user);

	@Query(
		value = "SELECT DISTINCT pp.predictionPeriod.season FROM PeriodPrediction pp WHERE pp.user.userID = ?1"
	)
	public List<Long> findDistinctSeasons(long userID);

	@Query(
		value = "SELECT 	predictionPeriodID, \n" +
				"			COUNT(DISTINCT userID) AS distinctUsers \n" +
				"FROM 		periodpredictions pp \n" +
				"GROUP BY 	pp.predictionPeriodID \n" +
				"ORDER BY 	pp.predictionPeriodID ASC",
		nativeQuery = true
	)
	public List<UsersByPredictionPeriod> getUsersByPredictionPeriod();
}
