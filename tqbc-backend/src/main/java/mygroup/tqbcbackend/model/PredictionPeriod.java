package mygroup.tqbcbackend.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;


@Entity
@Table(name = "PredictionPeriods")
public class PredictionPeriod {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PredictionPeriodID")
	private long predictionPeriodID;
	
	@Column(name = "Season")
	private int season;
	
	@Column(name = "SeasonPeriodID")
	private long seasonPeriodID;
	
	@OneToOne(targetEntity = Event.class, fetch = FetchType.EAGER)
	@JoinColumn(nullable = false, name = "FromEventID")
	private Event fromEvent;
	
	@OneToOne(targetEntity = Event.class, fetch = FetchType.EAGER)
	@JoinColumn(nullable = false, name = "ToEventID")
	private Event toEvent;
	
	@Column(name = "HowItWorks")
	private boolean howItWorks;
	
	@Column(name = "IsActive")
	private boolean isActive;
	
	@OneToMany(
		targetEntity = PeriodPrediction.class, 
		fetch = FetchType.LAZY,
		mappedBy = "predictionPeriod"
	)
	private List<PeriodPrediction> periodPredictions;
	
	public PredictionPeriod() {
		
	}

	public PredictionPeriod(
			long predictionPeriodID,
			int season,
			long seasonPeriodID,
			Event fromEvent,
			Event toEvent,
			boolean howItWorks, 
			boolean isActive
	) {
		super();
		this.predictionPeriodID = predictionPeriodID;
		this.season = season;
		this.seasonPeriodID = seasonPeriodID;
		this.fromEvent = fromEvent;
		this.toEvent = toEvent;
		this.howItWorks = howItWorks;
		this.isActive = isActive;
	}

	public long getPredictionPeriodID() {
		return predictionPeriodID;
	}

	public void setPredictionPeriodID(long predictionPeriodID) {
		this.predictionPeriodID = predictionPeriodID;
	}

	public int getSeason() {
		return season;
	}

	public void setSeason(int season) {
		this.season = season;
	}

	public long getSeasonPeriodID() {
		return seasonPeriodID;
	}

	public void setSeasonPeriodID(long seasonPeriodID) {
		this.seasonPeriodID = seasonPeriodID;
	}

	public Event getFromEvent() {
		return fromEvent;
	}

	public void setFromEvent(Event fromEvent) {
		this.fromEvent = fromEvent;
	}

	public Event getToEvent() {
		return toEvent;
	}

	public void setToEvent(Event toEvent) {
		this.toEvent = toEvent;
	}

	public boolean isHowItWorks() {
		return howItWorks;
	}

	public void setHowItWorks(boolean howItWorks) {
		this.howItWorks = howItWorks;
	}

	public boolean isActive() {
		return isActive; 
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}
	
}
