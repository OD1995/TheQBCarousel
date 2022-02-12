package mygroup.tqbcbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mygroup.tqbcbackend.model.Conference;
import mygroup.tqbcbackend.repository.ConferenceRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class ConferenceController {
	
	@Autowired
	private ConferenceRepository conferenceRepository;
	
	// Get all conferences
	@GetMapping("/conferences")
	public List<Conference> getAllConferences() {
		return conferenceRepository.findAll();
	}

	// Get all active conferences
	@GetMapping("/activeconferences")
	public List<Conference> getAllActiveConferences() {
		return conferenceRepository.findByIsActiveTrueOrderByNameAsc();
	}

}
