package mygroup.tqbcbackend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
	
	@Column(name = "FromEventID")
	private long fromEventID;
	
	@Column(name = "ToEventID")
	private long toEventID;
	
	@Column(name = "HowItWorks")
	private boolean howItWorks;
	
	@Column(name = "IsActive")
	private boolean isActive;
	
	public PredictionPeriod() {
		
	}

	public PredictionPeriod(
			long predictionPeriodID,
			int season,
			long seasonPeriodID,
			long fromEventID,
			long toEventID,
			boolean howItWorks, 
			boolean isActive
	) {
		super();
		this.predictionPeriodID = predictionPeriodID;
		this.season = season;
		this.seasonPeriodID = seasonPeriodID;
		this.fromEventID = fromEventID;
		this.toEventID = toEventID;
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

	public long getFromEventID() {
		return fromEventID;
	}

	public void setFromEventID(long fromEventID) {
		this.fromEventID = fromEventID;
	}

	public long getToEventID() {
		return toEventID;
	}

	public void setToEventID(long toEventID) {
		this.toEventID = toEventID;
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
