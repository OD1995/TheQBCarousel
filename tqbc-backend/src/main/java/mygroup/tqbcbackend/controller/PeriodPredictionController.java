package mygroup.tqbcbackend.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collector;
import java.util.stream.Collectors;
//import java.io.Console;
import java.util.ArrayList;
import java.util.Date;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mygroup.tqbcbackend.model.FrontEndPrediction;
import mygroup.tqbcbackend.model.PeriodPrediction;
import mygroup.tqbcbackend.model.Player;
//import mygroup.tqbcbackend.model.PeriodPredictionCompositeKey;
import mygroup.tqbcbackend.payload.request.PeriodPredictionRequest;
import mygroup.tqbcbackend.payload.response.MessageResponse;
import mygroup.tqbcbackend.repository.PeriodPredictionRepository;
import mygroup.tqbcbackend.repository.PlayerRepository;
//import mygroup.tqbcbackend.repository.PredictionPeriodRepository;
//import mygroup.tqbcbackend.repository.TeamRepository;
//import mygroup.tqbcbackend.repository.UserRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/periodpredictions")
public class PeriodPredictionController {

	@Autowired
	private PeriodPredictionRepository periodPredictionRepository;
	
//	@Autowired
//	private PredictionPeriodRepository predictionPeriodRepository;
//	
//	@Autowired
//	private UserRepository userRepository;
//	
//	@Autowired
//	private TeamRepository teamRepository;
	
	@Autowired
	private PlayerRepository playerRepository;
	
	
	// Insert user's predictions
	@PostMapping("/postpredictions")
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
//			PeriodPredictionCompositeKey periodPredictionCompositeKey = new PeriodPredictionCompositeKey(
//					predictionPeriodID,
//					userID,
//					prediction.getTeamID()
//			);
//			PeriodPrediction periodPrediction = new PeriodPrediction(
//					periodPredictionCompositeKey,
//					playerRepository.findByPlayerID(prediction.getPlayerID()),
//					new Date()
//			);
			
			PeriodPrediction periodPrediction = new PeriodPrediction(
					predictionPeriodID,
					userID,
					prediction.getTeamID(),
//					playerRepository.findByPlayerID(prediction.getPlayerID()),
					playerMap.get(prediction.getPlayerID()),
					new Date()
			);
			
			periodPredictions.add(periodPrediction);
		}
		periodPredictionRepository.saveAll(periodPredictions);
		
		return ResponseEntity.ok(
				new MessageResponse("Success!")
		);
	}
}
