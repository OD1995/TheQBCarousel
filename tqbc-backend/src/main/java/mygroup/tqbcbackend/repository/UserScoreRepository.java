package mygroup.tqbcbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import mygroup.tqbcbackend.model.UserScore;

public interface UserScoreRepository extends JpaRepository<UserScore,String> {
    
    public List<UserScore> findByUser_UserIDAndPredictionPeriod_Season(Long userID, Long season);

    public List<UserScore> findByPredictionPeriod_Season(Long season);
}
