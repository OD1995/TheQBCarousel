package mygroup.tqbcbackend.model;

import java.time.ZonedDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Events")
public class Event {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "EventID")
	private long eventID;
	
	@Column(name = "EventName")
	private String eventName;
	
	@Column(name = "EventDateTimeUTC")
	private ZonedDateTime eventDateTimeUTC;
	
	@Column(name = "DateConfirmed")
	private boolean dateConfirmed;
	
	public Event() {
		
	}

	public Event(long eventID, String eventName, ZonedDateTime eventDateTimeUTC, boolean dateConfirmed) {
		super();
		this.eventID = eventID;
		this.eventName = eventName;
		this.eventDateTimeUTC = eventDateTimeUTC;
		this.dateConfirmed = dateConfirmed;
	}

	public long getEventID() {
		return eventID;
	}

	public void setEventID(long eventID) {
		this.eventID = eventID;
	}

	public String getEventName() {
		return eventName;
	}

	public void setEventName(String eventName) {
		this.eventName = eventName;
	}

	public ZonedDateTime getEventDateTimeUTC() {
		return eventDateTimeUTC;
	}

	public void setEventDateTimeUTC(ZonedDateTime eventDateTimeUTC) {
		this.eventDateTimeUTC = eventDateTimeUTC;
	}

	public boolean isDateConfirmed() {
		return dateConfirmed;
	}

	public void setDateConfirmed(boolean dateConfirmed) {
		this.dateConfirmed = dateConfirmed;
	}
	
}
