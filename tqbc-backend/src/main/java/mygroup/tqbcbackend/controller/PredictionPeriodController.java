package mygroup.tqbcbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mygroup.tqbcbackend.model.PredictionPeriod;
import mygroup.tqbcbackend.repository.PredictionPeriodRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/predictionperiods")
public class PredictionPeriodController {
	
	@Autowired
	private PredictionPeriodRepository predictionPeriodRepository;
	
	// Get all Prediction Periods for the How It Works page
	@GetMapping("/howitworks")
	public List<PredictionPeriod> getHowItWorksPredictionPeriods() {
		return predictionPeriodRepository.findByHowItWorksTrueOrderByPredictionPeriodIDAsc();
	}
	
//	// Get the current predictionPeriodID
//	@GetMapping("/getcurrent")
//	public int getCurrentPredictionPeriodID() {
//		
//	}
}
