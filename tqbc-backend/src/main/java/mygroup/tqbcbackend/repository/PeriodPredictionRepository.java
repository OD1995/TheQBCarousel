package mygroup.tqbcbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mygroup.tqbcbackend.model.PeriodPrediction;

@Repository
public interface PeriodPredictionRepository extends JpaRepository<PeriodPrediction, Long> {

}
