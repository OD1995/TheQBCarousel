package mygroup.tqbcbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import mygroup.tqbcbackend.model.Team;

@Repository
public interface TeamRepository extends JpaRepository<Team,String>{
	
	@EntityGraph(attributePaths = {"defaultPlayer"})
	public List<Team> findByIsActiveTrue();
	

	public Team findByTeamID(Long teamID);
	
	@EntityGraph(attributePaths = {"defaultPlayer"})
	public List<Team> findByIsActiveTrueAndConference(String conference);
	
	@EntityGraph(attributePaths = {"defaultPlayer"})
	public List<Team> findBySeason(long season);
	
	@EntityGraph(attributePaths = {"defaultPlayer"})
	public List<Team> findBySeasonAndConference(long season, String conference);
}
