package mygroup.tqbcbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import mygroup.tqbcbackend.model.UserScore;

public interface UserScoreRepository extends JpaRepository<UserScore,String> {
    
}
