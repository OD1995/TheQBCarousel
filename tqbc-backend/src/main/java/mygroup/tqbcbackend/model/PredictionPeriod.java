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
	private long season;
	
	@Column(name = "SeasonPeriodID", nullable = true)
	private long seasonPeriodID;
	
	@OneToOne(targetEntity = Event.class, fetch = FetchType.EAGER)
	@JoinColumn(nullable = true, name = "FromEventID")
	private Event fromEvent;
	
	@OneToOne(targetEntity = Event.class, fetch = FetchType.EAGER)
	@JoinColumn(nullable = true, name = "ToEventID")
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
	
	@OneToMany(
			targetEntity = UserScore.class,
			fetch = FetchType.LAZY,
			mappedBy = "predictionPeriod"
	)
	private List<UserScore> userScores;

	@Column(name = "IsSeasonTotal")
	private boolean isSeasonTotal;


	
	public PredictionPeriod() {
		
	}

	public PredictionPeriod(
			long predictionPeriodID,
			int season,
			long seasonPeriodID,
			Event fromEvent,
			Event toEvent,
			boolean howItWorks, 
			boolean isActive,
			boolean isSeasonTotal
	) {
		super();
		this.predictionPeriodID = predictionPeriodID;
		this.season = season;
		this.seasonPeriodID = seasonPeriodID;
		this.fromEvent = fromEvent;
		this.toEvent = toEvent;
		this.howItWorks = howItWorks;
		this.isActive = isActive;
		this.isSeasonTotal = isSeasonTotal;
	}

	public boolean getHowItWorks() {
		return this.howItWorks;
	}

	public boolean isIsActive() {
		return this.isActive;
	}

	public boolean getIsActive() {
		return this.isActive;
	}

	public void setIsActive(boolean isActive) {
		this.isActive = isActive;
	}

	public List<PeriodPrediction> getPeriodPredictions() {
		return this.periodPredictions;
	}

	public void setPeriodPredictions(List<PeriodPrediction> periodPredictions) {
		this.periodPredictions = periodPredictions;
	}

	public List<UserScore> getUserScores() {
		return this.userScores;
	}

	public void setUserScores(List<UserScore> userScores) {
		this.userScores = userScores;
	}

	public boolean isIsSeasonTotal() {
		return this.isSeasonTotal;
	}

	public boolean getIsSeasonTotal() {
		return this.isSeasonTotal;
	}

	public void setIsSeasonTotal(boolean isSeasonTotal) {
		this.isSeasonTotal = isSeasonTotal;
	}
	
}
