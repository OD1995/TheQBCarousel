package mygroup.tqbcbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import mygroup.tqbcbackend.model.PrivateLeaderboard;
import mygroup.tqbcbackend.model.PrivateLeaderboardMember;

public interface PrivateLeaderboardMemberRepository extends JpaRepository<PrivateLeaderboardMember,String> {
    
    @Query(
        value = "SELECT plm.user.userID FROM PrivateLeaderboardMember plm WHERE plm.privateLeaderboard = ?1"
    )
    List<Long> getPrivateLeaderboardMemberUserIDs(PrivateLeaderboard privateLeaderboard);

    Long countByPrivateLeaderboard(PrivateLeaderboard privateLeaderboard);

    List<PrivateLeaderboardMember> findByPrivateLeaderboard(PrivateLeaderboard privateLeaderboard);
}
