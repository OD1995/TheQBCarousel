package mygroup.tqbcbackend.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mygroup.tqbcbackend.model.Player;
import mygroup.tqbcbackend.model.Team;
import mygroup.tqbcbackend.payload.request.ActiveConferenceTeamsRequest;
import mygroup.tqbcbackend.payload.request.TeamRequest;
import mygroup.tqbcbackend.payload.response.TestReponse;
import mygroup.tqbcbackend.repository.PlayerRepository;
import mygroup.tqbcbackend.repository.TeamRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/teams")
public class TeamController {

	private static final Logger logger = LoggerFactory.getLogger(TeamController.class);

	@Autowired
	private TeamRepository teamRepository;

	@Autowired
	private PlayerRepository playerRepository;
	
	// Get all teams
	@GetMapping("/all")
	@PreAuthorize("hasRole('USER')")
	public List<Team> getAllTeams() {
		return teamRepository.findAll();
	}
	
	// Get all active teams
	@GetMapping("/active")
	public List<Team> getAllActiveTeams() {
		return teamRepository.findByIsActiveTrue();
	} 

	// Get all teams for a season
	@GetMapping("/get-season-teams")
	// @PreAuthorize("hasRole('USER')")
	public List<Team> getSeasonTeams(
		TeamRequest teamRequest
	) {
		return teamRepository.findBySeason(teamRequest.getSeason());
	}

	// Get all active teams in a conference
	@GetMapping("/get-conference-active-teams")
	@PreAuthorize("hasRole('USER')")
	public List<Team> getConferenceActiveTeams(
		ActiveConferenceTeamsRequest activeConferenceTeamsRequest
	) {
		return teamRepository.findByIsActiveTrueAndConference(activeConferenceTeamsRequest.getConference());
	}

	@GetMapping("/get-season-conference-teams")
	@PreAuthorize("hasRole('USER')")
	public List<Team> getSeasonConferenceTeams(
		ActiveConferenceTeamsRequest activeConferenceTeamsRequest
	) {
		return teamRepository.findBySeasonAndConference(
			activeConferenceTeamsRequest.getSeason(),
			activeConferenceTeamsRequest.getConference()
		);
	}

	@GetMapping("/test1")
	public List<Team> test1() {
		return teamRepository.findByIsActiveTrue();
	}

	@GetMapping("/test2")
	public List<Player> test2() {
		return playerRepository.findByIsActiveTrueOrderByNameAsc();
	}
	
	@GetMapping("/test3")
	public TestReponse test3() {
		List<Team> T = teamRepository.findByIsActiveTrue();
		List<Player> P = playerRepository.findByIsActiveTrueOrderByNameAsc();
		return new TestReponse(T, P);
	}
		
}
