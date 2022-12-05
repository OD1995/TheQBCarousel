package mygroup.tqbcbackend.controller;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mygroup.tqbcbackend.model.Event;
import mygroup.tqbcbackend.repository.EventRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/events")
public class EventController {

	@Autowired
	private EventRepository eventRepository;
	
	// Get events by eventID
	@PostMapping("/eventIDIn")
	public List<Event> getEventsByEventIDArray(
			@Valid @RequestBody List<Long> eventIDs
	) {
		return eventRepository.findByEventIDInOrderByEventIDAsc(eventIDs);
	}

	@GetMapping("/get-outside-prediction-period-data")
	public Map<String,Event> getOutsidePredictionPeriodData() {
		ZonedDateTime utcNow = ZonedDateTime.now(Clock.systemUTC());
		// ZonedDateTime utcNow = ZonedDateTime.of(
		// 	2023,
		// 	7,
		// 	1,
		// 	0,
		// 	0,
		// 	0,
		// 	0, 
		// 	ZoneId.of("UTC")
		// );
		Event lastEvent = eventRepository.findFirstByEventDateTimeUTCLessThanOrderByEventIDDesc(utcNow);
		Event nextEvent = eventRepository.findFirstByEventDateTimeUTCGreaterThanOrderByEventIDAsc(utcNow);
		Map<String,Event> events = new HashMap<String,Event>();
		events.put("lastEvent",lastEvent);
		events.put("nextEvent",nextEvent);
		return events;
	}
	
}
