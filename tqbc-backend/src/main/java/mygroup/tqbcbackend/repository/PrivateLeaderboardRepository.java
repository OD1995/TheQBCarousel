package mygroup.tqbcbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import mygroup.tqbcbackend.model.PrivateLeaderboard;

public interface PrivateLeaderboardRepository extends JpaRepository<PrivateLeaderboard,String> {
    
}
