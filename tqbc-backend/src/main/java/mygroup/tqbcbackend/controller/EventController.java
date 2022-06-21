package mygroup.tqbcbackend.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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

	// @Autowired
	private EventRepository eventRepository;
	
	// Get events by eventID
	@PostMapping("/eventIDIn")
	public List<Event> getEventsByEventIDArray(
			@Valid @RequestBody List<Long> eventIDs
	) {
		return eventRepository.findByEventIDInOrderByEventIDAsc(eventIDs);
	}
	
}
