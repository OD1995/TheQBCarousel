package mygroup.tqbcbackend.controller;

import java.time.ZonedDateTime;
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
	
	// Get all active Prediction Periods
	@GetMapping("/active")
	public List<PredictionPeriod> getAllActivePredictionPeriods() {
		return predictionPeriodRepository.findByIsActiveTrue();
	}
	
	// Get all Prediction Periods for the How It Works page
	@GetMapping("/howitworks")
	public List<PredictionPeriod> getHowItWorksPredictionPeriods() {
		return predictionPeriodRepository.findByHowItWorksTrueOrderByPredictionPeriodIDAsc();
	}
	
	// Get the current predictionPeriodID
	@GetMapping("/getcurrent")
	public Long getCurrentPredictionPeriodID() {
		ZonedDateTime now = ZonedDateTime.now();
		PredictionPeriod predictionPeriod = predictionPeriodRepository.findByFromEvent_EventDateTimeUTCLessThanEqualAndToEvent_EventDateTimeUTCGreaterThanEqual(
				now,
				now
		);
		// Return null if we're not inside a PredictionPeriod (i.e. between draft and season)
		if (predictionPeriod == null) {
			return null;
		} else {
			return predictionPeriod.getPredictionPeriodID();			
		}
	}
}
