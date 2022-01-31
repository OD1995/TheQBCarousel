package mygroup.tqbcbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mygroup.tqbcbackend.model.Team;
import mygroup.tqbcbackend.repository.TeamRepository;

@RestController
@RequestMapping("/api/v1/")
public class TeamController {

	@Autowired
	private TeamRepository teamRepository;
	
	// Get all teams
	@GetMapping("/teams")
	public List<Team> getAllTeams() {
		return teamRepository.findAll();
	}
	
//	// Get all active teams
//	@GetMapping("/activeteams")
//	public List<Team> getAllActiveTeams() {
//		return teamRepository.fin
//	} 
}
