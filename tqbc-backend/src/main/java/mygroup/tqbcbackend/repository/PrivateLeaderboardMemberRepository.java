package mygroup.tqbcbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import mygroup.tqbcbackend.model.PrivateLeaderboardMember;

public interface PrivateLeaderboardMemberRepository extends JpaRepository<PrivateLeaderboardMember,String> {
    
}
