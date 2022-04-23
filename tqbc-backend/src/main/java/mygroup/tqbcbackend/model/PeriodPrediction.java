package mygroup.tqbcbackend.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "PeriodPredictions")
public class PeriodPrediction {
	
	@EmbeddedId
	private PeriodPredictionCompositeKey periodPredictionCompositeKey;
	
	@ManyToOne(targetEntity = PredictionPeriod.class, fetch = FetchType.LAZY)
	@JoinColumn(name = "PredictionPeriodID", nullable = false, insertable = false, updatable = false)
	private PredictionPeriod predictionPeriod;

	@ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
	@JoinColumn(name = "UserID", nullable = false, insertable = false, updatable = false)
	private User user;

	@ManyToOne(targetEntity = Team.class, fetch = FetchType.LAZY)
	@JoinColumn(name = "TeamID", nullable = false, insertable = false, updatable = false)
	private Team team;

	@ManyToOne(targetEntity = Player.class, fetch = FetchType.EAGER)
	@JoinColumn(name = "PlayerID", nullable = false)
	private Player player;
	
	@Column(name = "PredictionDateTimeUTC")
	@Temporal(TemporalType.TIMESTAMP)
	private Date predictionDateTimeUTC;

	public PeriodPrediction() {

	}

//	public PeriodPrediction(PeriodPredictionCompositeKey periodPredictionCompositeKey, Player player, Date predictionDateTimeUTC) {
	public PeriodPrediction(long predictionPeriodID, long userID, long teamID, Player player, Date predictionDateTimeUTC) {
		super();
//		this.periodPredictionCompositeKey = periodPredictionCompositeKey;
		this.periodPredictionCompositeKey = new PeriodPredictionCompositeKey(predictionPeriodID, userID, teamID);
		this.player = player;
		this.predictionDateTimeUTC = predictionDateTimeUTC;
	}

	public PeriodPredictionCompositeKey getPeriodPredictionCompositeKey() {
		return periodPredictionCompositeKey;
	}

	public void setPeriodPredictionCompositeKey(PeriodPredictionCompositeKey periodPredictionCompositeKey) {
		this.periodPredictionCompositeKey = periodPredictionCompositeKey;
	}

	public Player getPlayer() {
		return player;
	}

	public void setPlayer(Player player) {
		this.player = player;
	}

	public Date getPredictionDateTimeUTC() {
		return predictionDateTimeUTC;
	}

}
