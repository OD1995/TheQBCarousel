package mygroup.tqbcbackend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import mygroup.tqbcbackend.model.PrivateLeaderboard;

public interface PrivateLeaderboardRepository extends JpaRepository<PrivateLeaderboard,String> {
    
    public PrivateLeaderboard findByPrivateLeaderboardUUID(UUID privateLeaderboardUUID);
}
