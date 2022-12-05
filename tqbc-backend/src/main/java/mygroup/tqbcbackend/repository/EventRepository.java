package mygroup.tqbcbackend.repository;

import java.time.ZonedDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mygroup.tqbcbackend.model.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long>{

	public List<Event> findByEventIDInOrderByEventIDAsc(List<Long> eventIDs);
	// Last event that happened
	public Event findFirstByEventDateTimeUTCLessThanOrderByEventIDDesc(ZonedDateTime zonedDateTime);
	// Next event to happen
	public Event findFirstByEventDateTimeUTCGreaterThanOrderByEventIDAsc(ZonedDateTime zonedDateTime);

}
