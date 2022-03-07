package mygroup.tqbcbackend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "PredictionPeriods")
public class PredictionPeriod {
	@Id
	@Column(name = "PredictionPeriodID")
	private String predictionPeriodID;
	
	@Column(name = "Season")
	private int season;
	
	@Column(name = "SeasonPeriodID")
	private String seasonPeriodID;
	
	@Column(name = "FromEventID")
	private String fromEventID;
	
	@Column(name = "ToEventID")
	private String toEventID;
	
	@Column(name = "HowItWorks")
	private boolean howItWorks;
	
	@Column(name = "IsActive")
	private boolean isActive;
	
	public PredictionPeriod() {
		
	}

	public PredictionPeriod(String predictionPeriodID, int season, String seasonPeriodID, String fromEventID,
			String toEventID, boolean howItWorks, boolean isActive) {
		super();
		this.predictionPeriodID = predictionPeriodID;
		this.season = season;
		this.seasonPeriodID = seasonPeriodID;
		this.fromEventID = fromEventID;
		this.toEventID = toEventID;
		this.howItWorks = howItWorks;
		this.isActive = isActive;
	}

	public String getPredictionPeriodID() {
		return predictionPeriodID;
	}

	public void setPredictionPeriodID(String predictionPeriodID) {
		this.predictionPeriodID = predictionPeriodID;
	}

	public int getSeason() {
		return season;
	}

	public void setSeason(int season) {
		this.season = season;
	}

	public String getSeasonPeriodID() {
		return seasonPeriodID;
	}

	public void setSeasonPeriodID(String seasonPeriodID) {
		this.seasonPeriodID = seasonPeriodID;
	}

	public String getFromEventID() {
		return fromEventID;
	}

	public void setFromEventID(String fromEventID) {
		this.fromEventID = fromEventID;
	}

	public String getToEventID() {
		return toEventID;
	}

	public void setToEventID(String toEventID) {
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
