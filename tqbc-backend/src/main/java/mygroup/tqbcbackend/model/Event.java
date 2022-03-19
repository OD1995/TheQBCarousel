package mygroup.tqbcbackend.model;

import java.time.ZonedDateTime;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Events")
public class Event {
	@Id
	@Column(name = "EventID")
	private String eventID;
	
	@Column(name = "EventName")
	private String eventName;
	
	@Column(name = "EventDateTimeUTC")
//	private Date eventDateTimeUTC;
	private ZonedDateTime eventDateTimeUTC;
	
	@Column(name = "DateConfirmed")
	private boolean dateConfirmed;
	
	public Event() {
		
	}

	public Event(String eventID, String eventName, ZonedDateTime eventDateTimeUTC, boolean dateConfirmed) {
		super();
		this.eventID = eventID;
		this.eventName = eventName;
		this.eventDateTimeUTC = eventDateTimeUTC;
		this.dateConfirmed = dateConfirmed;
	}

	public String getEventID() {
		return eventID;
	}

	public void setEventID(String eventID) {
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
