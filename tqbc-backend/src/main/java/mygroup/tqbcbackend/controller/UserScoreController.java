package mygroup.tqbcbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mygroup.tqbcbackend.model.Answer;
import mygroup.tqbcbackend.model.PeriodPrediction;
import mygroup.tqbcbackend.repository.AnswerRepository;
import mygroup.tqbcbackend.repository.PeriodPredictionRepository;
import mygroup.tqbcbackend.repository.UserRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/userscores")
public class UserScoreController {
	
	@Autowired
	private PeriodPredictionRepository periodPredictionRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private AnswerRepository answerRepository;

	@GetMapping("/test")
	public List<Answer> getUserScore() {
		// Get predictions for given season and user
		List<PeriodPrediction> periodPredictions = periodPredictionRepository.findByPredictionPeriod_SeasonAndUser(
				2022,
				userRepository.findByUserID(1)
		);
		// Get answers for given season
		List<Answer> answers = answerRepository.findByTeam_Season(2022);
		
		return answers;
	}
}
