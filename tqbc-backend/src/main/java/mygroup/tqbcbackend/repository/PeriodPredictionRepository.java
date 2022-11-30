package mygroup.tqbcbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import mygroup.tqbcbackend.model.PeriodPrediction;
import mygroup.tqbcbackend.model.PredictionPeriod;
import mygroup.tqbcbackend.model.User;

public interface PeriodPredictionRepository extends JpaRepository<PeriodPrediction, Long> {

	public List<PeriodPrediction> findByUserAndPredictionPeriod(User user, PredictionPeriod predictionPeriod);
		
	@Query(
		value = "SELECT MAX(PredictionPeriodID) FROM PeriodPredictions WHERE UserID = ?1",
		nativeQuery = true
	)
	public long findMaxPredictionPeriodID(long userID);
	
	@Query(
		value = "SELECT max(pp.predictionPeriod.season) FROM PeriodPrediction pp WHERE pp.user.userID = ?1"
	)
	public long findMaxSeason(long userID);
	
	public List<PeriodPrediction> findByPredictionPeriod_SeasonAndUser(long season, User user);

	@Query(
		value = "SELECT DISTINCT pp.predictionPeriod.season FROM PeriodPrediction pp WHERE pp.user.userID = ?1"
	)
	public List<Long> findDistinctSeasons(long userID);
}
