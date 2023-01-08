package mygroup.tqbcbackend.repository;

import java.time.ZonedDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mygroup.tqbcbackend.model.PredictionPeriod;

@Repository
public interface PredictionPeriodRepository extends JpaRepository<PredictionPeriod,Long> {

	@EntityGraph(attributePaths = {"fromEvent", "toEvent"})
	public List<PredictionPeriod> findByHowItWorksTrueOrderByPredictionPeriodIDAsc();
	
		@EntityGraph(attributePaths = {"fromEvent", "toEvent"})
		public List<PredictionPeriod> findByIsActiveTrue();
		
	public PredictionPeriod findByPredictionPeriodID(long predictionPeriodID);
	public PredictionPeriod findByFromEvent_EventDateTimeUTCLessThanEqualAndToEvent_EventDateTimeUTCGreaterThanEqual(
			ZonedDateTime date1,
			ZonedDateTime date2
	);
}
