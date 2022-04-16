package mygroup.tqbcbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mygroup.tqbcbackend.model.PredictionPeriod;

@Repository
public interface PredictionPeriodRepository extends JpaRepository<PredictionPeriod,Long> {

	public List<PredictionPeriod> findByHowItWorksTrueOrderByPredictionPeriodIDAsc(); 
}
