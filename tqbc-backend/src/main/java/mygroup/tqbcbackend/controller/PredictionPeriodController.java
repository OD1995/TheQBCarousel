package mygroup.tqbcbackend.controller;

import java.time.Clock;
import java.time.ZonedDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mygroup.tqbcbackend.model.PredictionPeriod;
import mygroup.tqbcbackend.repository.PredictionPeriodRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/prediction-periods")
public class PredictionPeriodController {
	
	// All requests are permitted to this controller (in WebSecurityConfig.java)
	//    to allow the How It Works page to load for non-users, so all other
	//    endpoints should be pre-authorised

	@Autowired
	private PredictionPeriodRepository predictionPeriodRepository;
	
	// Get all active Prediction Periods
	@GetMapping("/active")
	@PreAuthorize("hasRole('USER')")
	public List<PredictionPeriod> getAllActivePredictionPeriods() {
		return predictionPeriodRepository.findByIsActiveTrue();
	}
	
	// Get all Prediction Periods for the How It Works page
	@GetMapping("/get-how-it-works-prediction-periods")
	public List<PredictionPeriod> getHowItWorksPredictionPeriods() {
		return predictionPeriodRepository.findByHowItWorksTrueOrderByPredictionPeriodIDAsc();
	}
	
	// Get the current predictionPeriodID
	@GetMapping("/get-current")
	@PreAuthorize("hasRole('USER')")
	public Long getCurrentPredictionPeriodID() {
		ZonedDateTime now = ZonedDateTime.now(Clock.systemUTC());
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
