package mygroup.tqbcbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import mygroup.tqbcbackend.model.Team;

@Repository
public interface TeamRepository extends JpaRepository<Team,String>{
	
	public List<Team> findByIsActiveTrue();
	public Team findByTeamID(long teamID);

}
