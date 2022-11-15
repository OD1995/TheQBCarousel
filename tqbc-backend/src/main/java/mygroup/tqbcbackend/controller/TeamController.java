package mygroup.tqbcbackend.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mygroup.tqbcbackend.model.Team;
import mygroup.tqbcbackend.payload.request.ActiveConferenceTeamsRequest;
import mygroup.tqbcbackend.repository.TeamRepository;

//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/teams")
public class TeamController {


	// private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);
	private static final Logger logger = LoggerFactory.getLogger(TeamController.class);

	@Autowired
	private TeamRepository teamRepository;
	
	// Get all teams
	@GetMapping("/all")
	public List<Team> getAllTeams() {
		return teamRepository.findAll();
	}
	
	// Get all active teams
	@GetMapping("/active")
	public List<Team> getAllActiveTeams() {
		return teamRepository.findByIsActiveTrue();
	} 

	// Get all active teams in a conference
	@GetMapping("/conference-active")
	public List<Team> getAllActiveConferenceTeams(ActiveConferenceTeamsRequest activeConferenceTeamsRequest) {
		String conference = activeConferenceTeamsRequest.getConference();
		return teamRepository.findByIsActiveTrueAndConference(conference);
	}
}
