package mygroup.tqbcbackend.model;

import java.util.Date;

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
	
	@Column(name = "DeadlineEvent")
	private String deadlineEvent;
	
	@Column(name = "FromDateTime")
	private Date fromDateTime;
	
	@Column(name = "ToDateTime")
	private Date toDateTime;
	
	@Column(name = "Days")
	private int days;
	
	@Column(name = "Weeks")
	private int weeks;
	
	public PredictionPeriod() {
		
	}

	public PredictionPeriod(String predictionPeriodID, int season, String seasonPeriodID, String deadlineEvent,
			Date fromDateTime, Date toDateTime, int days, int weeks) {
		super();
		this.predictionPeriodID = predictionPeriodID;
		this.season = season;
		this.seasonPeriodID = seasonPeriodID;
		this.deadlineEvent = deadlineEvent;
		this.fromDateTime = fromDateTime;
		this.toDateTime = toDateTime;
		this.days = days;
		this.weeks = weeks;
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

	public String getDeadlineEvent() {
		return deadlineEvent;
	}

	public void setDeadlineEvent(String deadlineEvent) {
		this.deadlineEvent = deadlineEvent;
	}

	public Date getFromDateTime() {
		return fromDateTime;
	}

	public void setFromDateTime(Date fromDateTime) {
		this.fromDateTime = fromDateTime;
	}

	public Date getToDateTime() {
		return toDateTime;
	}

	public void setToDateTime(Date toDateTime) {
		this.toDateTime = toDateTime;
	}

	public int getDays() {
		return days;
	}

	public void setDays(int days) {
		this.days = days;
	}

	public int getWeeks() {
		return weeks;
	}

	public void setWeeks(int weeks) {
		this.weeks = weeks;
	}
	
}
