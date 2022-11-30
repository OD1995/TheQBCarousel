package mygroup.tqbcbackend.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mygroup.tqbcbackend.model.FrontEndPrediction;
import mygroup.tqbcbackend.model.PeriodPrediction;
import mygroup.tqbcbackend.model.Player;
import mygroup.tqbcbackend.model.PredictionPeriod;
import mygroup.tqbcbackend.model.User;
//import mygroup.tqbcbackend.model.PeriodPredictionCompositeKey;
import mygroup.tqbcbackend.payload.request.PeriodPredictionRequest;
import mygroup.tqbcbackend.payload.request.PredictionHistoryRequest;
import mygroup.tqbcbackend.payload.response.MessageResponse;
import mygroup.tqbcbackend.repository.PeriodPredictionRepository;
import mygroup.tqbcbackend.repository.PlayerRepository;
import mygroup.tqbcbackend.repository.UserRepository;
import mygroup.tqbcbackend.repository.PredictionPeriodRepository;
//import mygroup.tqbcbackend.repository.TeamRepository;
//import mygroup.tqbcbackend.repository.UserRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/period-predictions")
public class PeriodPredictionController {

	@Autowired
	private PeriodPredictionRepository periodPredictionRepository;
	
	@Autowired
	private PredictionPeriodRepository predictionPeriodRepository;
//	
	@Autowired
	private UserRepository userRepository;
//	
//	@Autowired
//	private TeamRepository teamRepository;
	
	@Autowired
	private PlayerRepository playerRepository;
	
	
	// Insert user's predictions
	@PostMapping("/post-predictions")
	public ResponseEntity<?> postPredictions(
			@Valid @RequestBody PeriodPredictionRequest periodPredictionRequest
	) {
		long predictionPeriodID = periodPredictionRequest.getPredictionPeriodID();
		long userID = periodPredictionRequest.getUserID();
		List<Long> playerIDs = new ArrayList<Long>();
		for (FrontEndPrediction prediction : periodPredictionRequest.getPredictions()) {
			playerIDs.add(prediction.getPlayerID());
		}
		List<Player> players = playerRepository.findByPlayerIDIn(playerIDs);
		Map<Long, Player> playerMap = players.stream().collect(Collectors.toMap(Player::getPlayerID, v -> v));
		List<PeriodPrediction> periodPredictions = new ArrayList<PeriodPrediction>();
		for (FrontEndPrediction prediction : periodPredictionRequest.getPredictions()) {			
			PeriodPrediction periodPrediction = new PeriodPrediction(
					predictionPeriodID,
					userID,
					prediction.getTeamID(),
					playerMap.get(prediction.getPlayerID()),
					new Date(),
					null
			);
			
			periodPredictions.add(periodPrediction);
		}
		periodPredictionRepository.saveAll(periodPredictions);
		
		return ResponseEntity.ok(
				new MessageResponse("Success!")
		);
	}
	
	@GetMapping("/getmaxpredictionperiodid")
	public long getMaxPredictionPeriodID(PredictionHistoryRequest predictionHistoryRequest) {
		String username = predictionHistoryRequest.getUsername();	
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
		return periodPredictionRepository.findMaxPredictionPeriodID(user.getUserID());
	}
	
	@GetMapping("/get-max-season")
	// Get max/latest season a user has predictions for
	public long getMaxSeason(PredictionHistoryRequest predictionHistoryRequest) {
		String username = predictionHistoryRequest.getUsername();	
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
		long userID = user.getUserID();
		return periodPredictionRepository.findMaxSeason(userID);
	}

	@GetMapping("/get-unique-seasons-for-user")
	public List<Long> getUniqueSeasonsForUser(
		PredictionHistoryRequest predictionHistoryRequest
	) {
		String username = predictionHistoryRequest.getUsername();
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
		return periodPredictionRepository.findDistinctSeasons(user.getUserID());
	}
	
	@GetMapping("/get-predictions")
	public Map<Long, List<PeriodPrediction>> getTest(PredictionHistoryRequest predictionHistoryRequest) {
		String username = predictionHistoryRequest.getUsername();
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
		List<PeriodPrediction> periodPredictions = periodPredictionRepository.findByPredictionPeriod_SeasonAndUser(
				predictionHistoryRequest.getSeason(),
				user
		);
		Map<Long, List<PeriodPrediction>> teamIDMap = new HashMap<>();
		for (PeriodPrediction periodPrediction : periodPredictions) {
			long teamID = periodPrediction.getTeam().getTeamID();
			if (teamIDMap.containsKey(teamID)) {
				teamIDMap.get(teamID).add(periodPrediction);
			} else {
				List<PeriodPrediction> periodPredictionList = new ArrayList<>();
				periodPredictionList.add(periodPrediction);
				teamIDMap.put(
						teamID,
						periodPredictionList
				);
			}
		}
		return teamIDMap;
	}
}
