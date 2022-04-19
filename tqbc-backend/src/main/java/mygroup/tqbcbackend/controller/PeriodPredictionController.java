package mygroup.tqbcbackend.controller;

import java.util.List;
import java.util.ArrayList;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mygroup.tqbcbackend.model.FrontEndPrediction;
import mygroup.tqbcbackend.model.PeriodPrediction;
import mygroup.tqbcbackend.model.PeriodPredictionCompositeKey;
import mygroup.tqbcbackend.payload.request.PeriodPredictionRequest;
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
	public void postPredictions(
			@Valid @RequestBody PeriodPredictionRequest periodPredictionRequest
	) {
		long predictionPeriodID = periodPredictionRequest.getPredictionPeriodID();
		long userID = periodPredictionRequest.getUserID();
		List<PeriodPrediction> periodPredictions = new ArrayList<PeriodPrediction>();
		for (FrontEndPrediction prediction : periodPredictionRequest.getPredictions()) {
			PeriodPredictionCompositeKey periodPredictionCompositeKey = new PeriodPredictionCompositeKey(
					predictionPeriodID,
					userID,
					prediction.getTeamID()
			);
			PeriodPrediction periodPrediction = new PeriodPrediction(
					periodPredictionCompositeKey,
					playerRepository.findByPlayerID(prediction.getPlayerID())
			);
			periodPredictions.add(periodPrediction);
		}
		periodPredictionRepository.saveAll(periodPredictions);
	}
}
