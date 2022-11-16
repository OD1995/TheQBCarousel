package mygroup.tqbcbackend.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mygroup.tqbcbackend.model.Answer;
import mygroup.tqbcbackend.model.PeriodPrediction;
import mygroup.tqbcbackend.model.Player;
import mygroup.tqbcbackend.repository.AnswerRepository;
import mygroup.tqbcbackend.repository.PeriodPredictionRepository;
import mygroup.tqbcbackend.repository.UserRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/user-scores")
public class UserScoreController {
	
	@Autowired
	private PeriodPredictionRepository periodPredictionRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private AnswerRepository answerRepository;

	@GetMapping("/test")
	public Map<Long, List<Player>> getUserScore() {
		// Get predictions for given season and user
		List<PeriodPrediction> periodPredictions = periodPredictionRepository.findByPredictionPeriod_SeasonAndUser(
				2022,
				userRepository.findByUserID(1)
		);
		// Get answers for given season
		List<Answer> answers = answerRepository.findByTeam_Season(2022);
		// Convert to map with key: teamID, value: array of players
		Map<Long, List<Player>> teamIDPlayerArrayMap = new HashMap<Long, List<Player>>();
		for (Answer answer : answers) {
			long teamID = answer.getTeam().getTeamID();
			Player player = answer.getPlayer();
			if (teamIDPlayerArrayMap.containsKey(teamID)) {
				teamIDPlayerArrayMap.get(teamID).add(player);
			} else {
				List<Player> playerList = new ArrayList<>();
				playerList.add(player);
				teamIDPlayerArrayMap.put(
						teamID,
						playerList
				);
			}
		}
		
		for (PeriodPrediction periodPrediction : periodPredictions) {
			long teamID = periodPrediction.getTeam().getTeamID();
			Player player = periodPrediction.getPlayer();
			periodPrediction.setCorrect(
					teamIDPlayerArrayMap.get(teamID).contains(player)
			);
		}
		
		periodPredictionRepository.saveAll(periodPredictions);
		
		return teamIDPlayerArrayMap;
	}
}
