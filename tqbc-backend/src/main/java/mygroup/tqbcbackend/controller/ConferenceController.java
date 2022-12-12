package mygroup.tqbcbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mygroup.tqbcbackend.model.Conference;
import mygroup.tqbcbackend.payload.request.ConferenceRequest;
import mygroup.tqbcbackend.repository.ConferenceRepository;


//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/conferences")
public class ConferenceController {
	
	@Autowired
	private ConferenceRepository conferenceRepository;
	
	// Get all conferences
	@GetMapping("/all")
	public List<Conference> getAllConferences() {
		return conferenceRepository.findAll();
	}

	// Get all active conferences
	@GetMapping("/get-active-conferences")
	public List<Conference> getActiveConferences() {
		return conferenceRepository.findByIsActiveTrueOrderByNameAsc();
	}

	// Get conferences for season
	@GetMapping("/get-season-conferences")
	public List<Conference> getSeasonConferences(
		ConferenceRequest conferenceRequest
	) {
		long season = conferenceRequest.getSeason();
		return conferenceRepository.findBySeasonOrderByNameAsc(season);
	}
	
}
