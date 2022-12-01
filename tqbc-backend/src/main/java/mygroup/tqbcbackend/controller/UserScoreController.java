package mygroup.tqbcbackend.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mygroup.tqbcbackend.model.UserScore;
import mygroup.tqbcbackend.payload.request.UserScoreRequest;
import mygroup.tqbcbackend.payload.response.MessageResponse;
import mygroup.tqbcbackend.repository.UserScoreRepository;
import mygroup.tqbcbackend.service.UserScoreService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/user-scores")
public class UserScoreController {
	
	@Autowired
	private UserScoreService userScoreService;

	@Autowired
	private UserScoreRepository userScoreRepository;

	@PostMapping("/calculate-user-season-scores")
	public Map<Long, Float> calculateUserSeasonScores(
		@Valid @RequestBody UserScoreRequest userScoreRequest
	) {
		return userScoreService.calculateUserScoreForPredictionPeriodsInSeason(
			userScoreRequest.getUserID(),
			userScoreRequest.getSeason()
		);

		// return ResponseEntity.ok(
		// 	new MessageResponse("Success!")
		// );
	}

	@GetMapping("/get-season-scores-for-user")
	public Map<Long, Float> getSeasonScoresForUser(
		UserScoreRequest userScoreRequest
	) {
		List<UserScore> userScores = userScoreRepository.findByUser_UserIDAndPredictionPeriod_Season(
			userScoreRequest.getUserID(),
			userScoreRequest.getSeason()
		);
		Map<Long, Float> scoresByPredictionPeriod = new HashMap<Long,Float>();
		for (UserScore userScore : userScores) {
			scoresByPredictionPeriod.put(
				userScore.getPredictionPeriod().getSeasonPeriodID(),
				userScore.getScore()
			);
		}
		return scoresByPredictionPeriod;
	}
}
