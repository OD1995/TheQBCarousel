package mygroup.tqbcbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mygroup.tqbcbackend.model.Player;
import mygroup.tqbcbackend.repository.PlayerRepository;

//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/players")
public class PlayerController {
	
	@Autowired
	private PlayerRepository playerRepository;
	
	// Get all players
	@GetMapping("/all")
	public List<Player> getAllPlayers() {
		return playerRepository.findAll();
	}

	// Get all active players
	@GetMapping("/active")
	public List<Player> getAllActivePlayers() {
		return playerRepository.findByIsActiveTrueOrderByNameAsc();
	}
}
